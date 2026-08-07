#!/bin/bash
set -euo pipefail

# Only run in Claude Code remote (web) sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install Python dependencies
pip install -r "$CLAUDE_PROJECT_DIR/requirements.txt" --quiet

# Restore user profile so Claude remembers how Rick works
mkdir -p ~/.claude
cp "$CLAUDE_PROJECT_DIR/docs/claude-profile.md" ~/.claude/CLAUDE.md
