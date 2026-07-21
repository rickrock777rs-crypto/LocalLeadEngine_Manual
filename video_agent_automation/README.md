# Video-to-Agent Task Automation — v1 (Layer 1 only)

This session's scope, per the blueprint's Claude Code Handoff Prompt:

1. Supabase schema (sandbox only, not applied to any live project)
2. Layer 1 ingestion: transcript → structured markdown task list
3. Layer 2/3 (browser execution, pause/resume) — **not built yet**, out of scope for this session

## Layout

```
video_agent_automation/
  supabase/schema.sql        tasks / task_steps / user_queue tables (sandbox only)
  ingestion/
    transcript_fetcher.py    YouTube captions -> raw text -> Whisper fallback (lazy import)
    task_generator.py        sends transcript to Claude, returns markdown task list
    cli.py                   standalone entry point, zero live account connections
  tests/fixtures/            sample transcript used for dry-run testing
```

## What talks to the network, and when

- `transcript_fetcher.fetch_youtube_captions` — read-only GET to YouTube to pull existing
  captions. No login, no account, no cookies. Only called when a YouTube URL is passed
  and `is_raw_text` is not set.
- `transcript_fetcher.transcribe_with_whisper` — fully local (no network) once the
  `openai-whisper` model is downloaded; only reached if captions are unavailable and a
  local media file path is explicitly supplied. Import is lazy so the module works
  without the dependency installed until this path is actually used.
- `task_generator.generate_task_markdown` — the one call to the **Anthropic API**.
  Requires `ANTHROPIC_API_KEY` in the environment; raises immediately if it's missing
  rather than silently no-op-ing.

Nothing else in this module makes a network call. No browser automation, no credential
entry, no third-party site login — that's Layer 2/3, not built in this session.

## Usage

```bash
pip install -r requirements.txt

# Raw transcript, no network calls except the Claude API:
python -m ingestion.cli --transcript-file tests/fixtures/sample_transcript.txt

# Sanity-check ingestion only, skip the Claude API call:
python -m ingestion.cli --transcript-file tests/fixtures/sample_transcript.txt --dry-run-parse

# YouTube URL (pulls captions, falls back to NeedsWhisperFallbackError if none exist):
python -m ingestion.cli --youtube-url "https://www.youtube.com/watch?v=VIDEO_ID"

# Write output to a file instead of stdout:
python -m ingestion.cli --transcript-file transcript.txt --out task_list.md
```

## Known limitations (v1, Layer 1 only)

- `youtube-transcript-api` scrapes YouTube's caption endpoint; it can break if YouTube
  changes that endpoint, and some videos disable captions entirely or auto-caption in
  a language not requested. Both surface as a clean `TranscriptUnavailableError` /
  `NeedsWhisperFallbackError`, never a silent empty result.
- Whisper fallback requires the caller to already have a local copy of the audio/video
  file — this module does not download video from arbitrary sites itself.
- The extraction prompt is a single Claude call with no retry/validation loop yet. If
  the model's output doesn't match the markdown schema, nothing currently re-prompts or
  repairs it — that's a reasonable v1.1 addition once Layer 2/3 needs to parse this
  markdown programmatically (right now a human reads it).
- No Supabase writes happen anywhere in this code path yet — `schema.sql` is schema
  only, and `tasks.markdown_content` would be populated by wiring this CLI's output into
  an insert, which is Layer 2/3 territory (persistence ties to the execution engine).
