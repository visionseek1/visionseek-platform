# VisionSeek AI Engineering Agent — MVP

## Goal
Turn a short request such as "add feature X" into an isolated implementation branch and a pull request that has passed the project's lint/test checks.

## Flow

1. A request is sent to the n8n webhook.
2. n8n normalizes the task and sends a `repository_dispatch` event to GitHub.
3. GitHub Actions creates a fresh branch from `main`.
4. Aider runs against the repository using DeepSeek.
5. Protected files are checked.
6. `npm run lint` and `npm test` run.
7. Only if verification passes, changes are committed and pushed.
8. A pull request is opened for human approval.
9. Nothing is deployed automatically.

## Required credentials

### GitHub repository secret
Create one Actions secret in `visionseek1/visionseek-platform`:

- `DEEPSEEK_API_KEY`

The workflow never writes this value to files or logs intentionally.

### n8n credential
After importing `automation/n8n/visionseek-ai-feature-agent.json`, open the **Dispatch GitHub Agent** node and select a GitHub credential that can trigger repository dispatch events for `visionseek1/visionseek-platform`.

## Request format

Send JSON to the n8n webhook:

```json
{
  "task": "Add a clear empty state to the client projects page",
  "request_id": "optional-id"
}
```

Only `task` is required.

## Safety boundary in this MVP

The agent may change application code, but the run fails if it changes protected paths such as GitHub workflows, `.env`, deployment config, or `package-lock.json`. Production deployment and merge remain human-controlled.

## Model routing

The first MVP deliberately uses one worker model: DeepSeek. Gemini should be added after we collect real tasks and identify where a second model improves outcomes (large-context inspection, visual review, or second-pass validation). This avoids premature complexity and lets us measure cost per completed task.

## Next iteration

After 5–10 real tasks, add:

- Gemini reviewer for complex or UI-heavy changes.
- automatic task classification and model routing.
- screenshot/browser verification for UI work.
- callbacks from GitHub to n8n so the original request receives final PR status.
- Notion/ClickUp logging for task, run, result, cost, and human decision.
