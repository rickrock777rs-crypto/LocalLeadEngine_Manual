# LocalLeadEngine — Claude Code Configuration

## Beginner Skill Starter Pack

This project includes a curated set of skills designed to accelerate learning for new Claude Code users. Use them via slash commands:

| Command | What It Does |
|---|---|
| `/create-skill` | Build a new custom skill — describe what you want and it generates the file |
| `/explain` | Explain any code or concept in plain English with a real-world analogy |
| `/fix-error` | Diagnose any error, fix it, and teach you how to avoid it next time |
| `/code-mentor` | Get mentor-style code review: strengths first, then ranked improvements |
| `/quick-start` | Bootstrap a new project with best practices from the first line |
| `/learn-next` | Get a personalized 3-step learning path based on what you're building |

## How to Use Skills

Type the slash command in your Claude Code chat. For example:
- `/explain` then paste code you don't understand
- `/fix-error` then paste the error message + relevant code
- `/code-mentor` to get feedback on the current file
- `/quick-start python web app that tracks habits` to scaffold a new project

## Creating Your Own Skills

Run `/create-skill` and describe what you want. The skill creator will generate a new `.claude/skills/<name>.md` file that becomes a new slash command immediately.

## Project Structure

```
.claude/
  skills/
    create-skill.md   # Meta-skill: generates new skills
    explain.md        # Plain-English code explainer
    fix-error.md      # Error diagnosis + fix + teach
    code-mentor.md    # Mentorship-style code review
    quick-start.md    # Project bootstrapper
    learn-next.md     # Personalized learning path
CLAUDE.md             # This file
```
