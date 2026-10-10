# Developer Task Tracker

Full-stack project for the Yuva Intern Practical Implementation Project and Testing & Quality Assurance phases.

## Features
- React task dashboard, status counts, and status filters
- Create tasks with title and optional description; update status; delete tasks
- Express REST API with validation, health check, and JSON 404 handling
- MongoDB/Mongoose persistence when MONGODB_URI is configured
- In-memory fallback for local demos and automated tests
- Node built-in test runner with HTTP integration tests
- GitHub Actions CI runs backend tests and frontend production build

## Run locally
Requires Node.js 20+ and npm. MongoDB is optional for memory-mode development.

Terminal 1: cd backend; npm install; cp .env.example .env; npm run dev
Terminal 2: cd frontend; npm install; npm run dev
Open the Vite URL shown in the frontend terminal. API defaults to http://localhost:5000.

## Environment
backend/.env.example lists PORT and MONGODB_URI. For a hosted frontend, set VITE_API_URL to the deployed backend API base URL. Never commit real .env files or credentials.

## API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/hello | Hello World milestone |
| GET | /api/health | API and database mode |
| GET | /api/tasks | List tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update task fields |
| DELETE | /api/tasks/:id | Delete a task |

Valid statuses: todo, in-progress, done. Titles require at least two characters.

## Quality assurance
Run backend tests with cd backend && npm test. Tests cover Hello World, health, invalid input, CRUD, invalid status, and unknown routes. Build frontend with cd frontend && npm install && npm run build. GitHub Actions repeats tests and build on pushes and pull requests to main. See the Actions tab for actual run status.

## Manual acceptance checklist
1. Create a valid task and verify it appears.
2. Try a one-character title and confirm validation.
3. Filter by each status.
4. Cycle task status between todo, in-progress, and done.
5. Delete a task and verify it disappears.
6. Stop backend and verify the connection message.
7. Check GitHub Actions after pushing.

## Deployment
Deployment is not claimed complete until a hosting provider is configured and the live URL is tested. Set VITE_API_URL for the frontend and MONGODB_URI for persistent backend storage.
