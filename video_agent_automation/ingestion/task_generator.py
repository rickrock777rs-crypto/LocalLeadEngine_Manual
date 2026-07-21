"""Layer 1, stage 2: turn a transcript into the structured markdown task schema.

Calls the Claude API once with a strict extraction prompt. The prompt
explicitly forbids guessing at ambiguous steps — anything the transcript
doesn't clearly specify must be flagged NEEDS_CLARIFICATION rather than
assumed, per the blueprint's verification standard.

This module makes one live external call: the Anthropic API request itself.
It requires ANTHROPIC_API_KEY to be set. No other account or credential is
touched here.
"""

from __future__ import annotations

import os
from dataclasses import dataclass

DEFAULT_MODEL = os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-5")

EXTRACTION_SYSTEM_PROMPT = """\
You turn instructional video/tutorial transcripts into a structured, ordered \
task list for an autonomous browser-automation agent to execute later.

Rules:
1. Identify the overall end goal in one sentence.
2. Break the process into discrete steps, in the order they must be executed.
3. For each step, identify:
   - Which tool/site it happens in
   - What specific action is taken
   - What inputs/values are needed, and whether the transcript actually \
specifies them
   - Whether the step structurally requires a human (login/credential entry, \
2FA, CAPTCHA, payment/purchase confirmation, or a genuine personal judgment \
call) versus something an automation agent could plausibly do alone
4. Do NOT guess at ambiguous or underspecified instructions. If the \
transcript does not clearly state what to do, what value to use, or which \
option to pick at a given step, mark that step's "Requires human" line as \
"YES — NEEDS_CLARIFICATION" and explain what specifically is unclear in a \
"Clarification needed" line. Never silently fill in a plausible-sounding \
default.
5. Output ONLY the markdown described below — no preamble, no commentary \
outside the markdown, no trailing explanation.

Output format (exact structure, repeat the Step block for each step):

# Task: [Overall goal, one sentence]

## Step N: [Short name]
- Tool/Site: [tool or website name]
- Action: [specific action taken]
- Requires human: NO | YES — [reason: credential entry | 2FA | CAPTCHA | \
payment confirmation | personal judgment call | NEEDS_CLARIFICATION]
- Inputs needed: [inputs/values, or "None"]
- Blocks on: [only if Requires human is YES — what screen/condition blocks \
progress]
- Resume condition: [only if Requires human is YES — what must be true to \
continue]
- Clarification needed: [only if Requires human is YES — NEEDS_CLARIFICATION \
— exactly what is unclear]
"""

EXTRACTION_USER_PROMPT_TEMPLATE = """\
Transcript:
\"\"\"
{transcript}
\"\"\"

Produce the markdown task list per the system instructions.\
"""


@dataclass
class TaskGenerationResult:
    markdown: str
    model: str
    input_tokens: int
    output_tokens: int
    needs_clarification_count: int


def _count_needs_clarification(markdown: str) -> int:
    return markdown.count("NEEDS_CLARIFICATION")


def generate_task_markdown(
    transcript: str,
    *,
    model: str = DEFAULT_MODEL,
    max_tokens: int = 4096,
) -> TaskGenerationResult:
    """Send the transcript to Claude and return the generated markdown task list.

    Raises RuntimeError if ANTHROPIC_API_KEY is not set — this call is a live
    external API request and should never fire silently without a key
    explicitly present in the environment.
    """
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise RuntimeError(
            "ANTHROPIC_API_KEY is not set. This step makes a live call to "
            "the Anthropic API and requires an API key in the environment."
        )

    try:
        import anthropic
    except ImportError as exc:
        raise RuntimeError(
            "anthropic package is not installed. Run: pip install -r requirements.txt"
        ) from exc

    client = anthropic.Anthropic()
    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system=EXTRACTION_SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": EXTRACTION_USER_PROMPT_TEMPLATE.format(transcript=transcript),
            }
        ],
    )

    markdown = "".join(block.text for block in response.content if block.type == "text").strip()

    return TaskGenerationResult(
        markdown=markdown,
        model=model,
        input_tokens=response.usage.input_tokens,
        output_tokens=response.usage.output_tokens,
        needs_clarification_count=_count_needs_clarification(markdown),
    )
