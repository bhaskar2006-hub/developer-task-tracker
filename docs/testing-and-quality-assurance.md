# Task 4 — Testing and Quality Assurance

## Strategy
The project uses API integration tests, a frontend production build, a manual acceptance checklist, and GitHub Actions for repeatable checks.

## Automated tests
Run npm test from backend/. Tests start an ephemeral HTTP server and cover:
1. Hello World endpoint returns HTTP 200 and the expected message.
2. Health endpoint reports API status and memory mode.
3. Invalid short task titles are rejected with HTTP 400.
4. The CRUD lifecycle creates, lists, updates, and deletes a task.
5. Invalid task status is rejected with HTTP 400.
6. Unknown routes return a JSON 404.

## Frontend verification
Run npm install and npm run build from frontend/. This verifies JSX compilation and production bundling; browser automation is not configured in this phase.

## Manual acceptance checks
Create a task, test blank/short-title validation, filter by each status, cycle status, delete a task, check the empty state, and verify the API-offline message when the backend is stopped.

## CI
GitHub Actions runs on pushes and pull requests to main. It installs backend dependencies, runs npm test, installs frontend dependencies, and runs npm run build. Check the repository Actions tab for actual run results.

## Known limitations
Memory-mode data resets on server restart. Authentication, multi-user permissions, browser automation, load testing, production monitoring, and verified deployment remain future improvements.
