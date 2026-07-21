"""Standalone CLI for Layer 1 (ingestion + task-list generation).

Zero live account connections. The only external calls this can make are:
  - read-only YouTube caption lookup (if --youtube-url is given and captions exist)
  - a single Anthropic API request (requires ANTHROPIC_API_KEY)

Usage:
    python -m ingestion.cli --youtube-url "https://youtube.com/watch?v=..."
    python -m ingestion.cli --transcript-file transcript.txt
    python -m ingestion.cli --transcript-text "..."

Options:
    --out FILE       write the generated markdown to FILE instead of stdout
    --dry-run-parse  skip the Claude API call; just resolve and print the
                      transcript, to sanity-check ingestion without spending
                      API credits
"""

from __future__ import annotations

import argparse
import sys

from ingestion.task_generator import generate_task_markdown
from ingestion.transcript_fetcher import (
    NeedsWhisperFallbackError,
    TranscriptUnavailableError,
    get_transcript,
)


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Video-to-Agent Task Automation — Layer 1 ingestion")
    source_group = parser.add_mutually_exclusive_group(required=True)
    source_group.add_argument("--youtube-url", help="YouTube video URL")
    source_group.add_argument("--transcript-file", help="Path to a text file containing a transcript")
    source_group.add_argument("--transcript-text", help="Raw transcript text")

    parser.add_argument(
        "--whisper-media-path",
        help="Local audio/video file to fall back to Whisper transcription if captions are unavailable",
    )
    parser.add_argument("--out", help="Write generated markdown to this file instead of stdout")
    parser.add_argument(
        "--dry-run-parse",
        action="store_true",
        help="Only resolve and print the transcript; skip the Claude API call",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_arg_parser().parse_args(argv)

    try:
        if args.transcript_text is not None:
            transcript = get_transcript(args.transcript_text, is_raw_text=True)
        elif args.transcript_file is not None:
            with open(args.transcript_file, "r", encoding="utf-8") as f:
                transcript = get_transcript(f.read(), is_raw_text=True)
        else:
            transcript = get_transcript(args.youtube_url, whisper_media_path=args.whisper_media_path)
    except (TranscriptUnavailableError, NeedsWhisperFallbackError) as exc:
        print(f"Could not obtain a transcript: {exc}", file=sys.stderr)
        return 1

    print(
        f"[transcript resolved via {transcript.source}, "
        f"{len(transcript.text)} chars]",
        file=sys.stderr,
    )

    if args.dry_run_parse:
        print(transcript.text)
        return 0

    try:
        result = generate_task_markdown(transcript.text)
    except RuntimeError as exc:
        print(f"Task generation failed: {exc}", file=sys.stderr)
        return 1

    print(
        f"[model={result.model} input_tokens={result.input_tokens} "
        f"output_tokens={result.output_tokens} "
        f"needs_clarification={result.needs_clarification_count}]",
        file=sys.stderr,
    )

    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(result.markdown)
        print(f"Wrote markdown task list to {args.out}", file=sys.stderr)
    else:
        print(result.markdown)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
