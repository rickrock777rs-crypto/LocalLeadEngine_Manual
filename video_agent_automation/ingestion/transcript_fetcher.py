"""Layer 1, stage 1: get a plain-text transcript from a source.

Priority order per the blueprint:
  1. Raw transcript text supplied directly -> use as-is, no network calls.
  2. YouTube URL -> pull existing captions (fast, free, no audio processing).
  3. YouTube URL with no captions, or a non-YouTube video file -> Whisper
     transcription (only reached if step 2 fails or wasn't applicable).

Whisper is intentionally not called unless captions are unavailable, per the
blueprint's explicit cost/latency requirement.
"""

from __future__ import annotations

import re
from dataclasses import dataclass


class TranscriptUnavailableError(Exception):
    """Raised when no transcript could be obtained through any path."""


class NeedsWhisperFallbackError(Exception):
    """Raised when captions are unavailable and local audio transcription is required.

    This is a distinct exception (not silently handled) because Whisper
    transcription is a heavier, slower, non-free-by-default operation. The
    caller decides whether to pay that cost rather than it happening
    invisibly inside caption lookup.
    """


@dataclass
class TranscriptResult:
    text: str
    source: str  # "raw_text" | "youtube_captions" | "whisper"
    video_id: str | None = None
    language: str | None = None


_YOUTUBE_ID_PATTERNS = [
    r"(?:youtube\.com/watch\?v=|youtube\.com/shorts/|youtu\.be/|youtube\.com/embed/)([A-Za-z0-9_-]{11})",
]


def extract_youtube_id(url: str) -> str | None:
    for pattern in _YOUTUBE_ID_PATTERNS:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


def is_youtube_url(source: str) -> bool:
    return extract_youtube_id(source) is not None


def fetch_youtube_captions(video_id: str, languages: list[str] | None = None) -> TranscriptResult:
    """Pull existing YouTube captions. Raises TranscriptUnavailableError if none exist.

    Requires network access to youtube.com — flagged here because it is the
    one call in this module that talks to a live external site (read-only,
    no account/session involved).
    """
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        from youtube_transcript_api._errors import (
            NoTranscriptFound,
            TranscriptsDisabled,
            VideoUnavailable,
        )
    except ImportError as exc:
        raise RuntimeError(
            "youtube-transcript-api is not installed. Run: pip install -r requirements.txt"
        ) from exc

    languages = languages or ["en"]
    try:
        api = YouTubeTranscriptApi()
        fetched = api.fetch(video_id, languages=languages)
        text = " ".join(snippet.text for snippet in fetched)
        return TranscriptResult(
            text=text,
            source="youtube_captions",
            video_id=video_id,
            language=getattr(fetched, "language_code", languages[0]),
        )
    except (NoTranscriptFound, TranscriptsDisabled) as exc:
        raise TranscriptUnavailableError(
            f"No YouTube captions available for video {video_id}: {exc}"
        ) from exc
    except VideoUnavailable as exc:
        raise TranscriptUnavailableError(f"Video {video_id} is unavailable: {exc}") from exc
    except Exception as exc:
        # Network/connectivity failures (proxy denial, DNS, timeout, etc.)
        # surface here as generic requests/urllib3 errors rather than the
        # library's typed exceptions above. Wrap them so callers get a
        # single, catchable failure mode instead of a raw traceback.
        raise TranscriptUnavailableError(
            f"Could not reach YouTube to fetch captions for {video_id}: {exc}"
        ) from exc


def transcribe_with_whisper(audio_or_video_path: str, model_size: str = "base") -> TranscriptResult:
    """Local Whisper transcription of a downloaded/uploaded media file.

    Only reached when captions are missing (YouTube) or the source is a
    non-YouTube video file. Requires the optional `openai-whisper` package
    and ffmpeg on PATH — both are heavy dependencies, so the import is lazy
    and this path is never hit implicitly.
    """
    try:
        import whisper  # type: ignore
    except ImportError as exc:
        raise RuntimeError(
            "openai-whisper is not installed. This path is only needed when "
            "captions are unavailable. Run: pip install openai-whisper "
            "(and ensure ffmpeg is on PATH)."
        ) from exc

    model = whisper.load_model(model_size)
    result = model.transcribe(audio_or_video_path)
    return TranscriptResult(text=result["text"].strip(), source="whisper", language=result.get("language"))


def get_transcript(source: str, *, is_raw_text: bool = False, whisper_media_path: str | None = None) -> TranscriptResult:
    """Resolve a transcript from a URL or raw text.

    - is_raw_text=True: `source` is treated as the transcript itself.
    - Otherwise: `source` is treated as a URL. If it's a YouTube URL, captions
      are pulled. If captions are unavailable and `whisper_media_path` was
      provided (a locally downloaded copy of the audio/video), Whisper runs
      on that file. Otherwise a NeedsWhisperFallbackError is raised so the
      caller can decide how to obtain the media before transcribing it —
      this app does not silently download video from arbitrary sites.
    """
    if is_raw_text:
        text = source.strip()
        if not text:
            raise TranscriptUnavailableError("Provided transcript text is empty.")
        return TranscriptResult(text=text, source="raw_text")

    video_id = extract_youtube_id(source)
    if video_id:
        try:
            return fetch_youtube_captions(video_id)
        except TranscriptUnavailableError:
            if whisper_media_path:
                return transcribe_with_whisper(whisper_media_path)
            raise NeedsWhisperFallbackError(
                f"No captions found for YouTube video {video_id}. Provide "
                "whisper_media_path (a local download of the audio/video) "
                "to fall back to Whisper transcription."
            )

    # Non-YouTube source: treat as a path to a local media file for Whisper.
    if whisper_media_path:
        return transcribe_with_whisper(whisper_media_path)

    raise NeedsWhisperFallbackError(
        f"'{source}' is not a YouTube URL and no local media file was "
        "provided. Supply whisper_media_path to transcribe a video file, "
        "or pass raw transcript text with is_raw_text=True."
    )
