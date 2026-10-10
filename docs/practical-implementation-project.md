# Task 3 — Practical Implementation Project

## Project
Developer Task Tracker, a full-stack task management application.

## Implementation
The application lets users create tasks with a title and optional description, view a task list, filter by status, cycle tasks through To do, In progress, and Completed, and delete tasks. A summary panel displays task counts. The React/Vite frontend communicates with an Express REST API. The API validates user input and exposes Hello World, health, list, create, update, and delete endpoints. MongoDB/Mongoose persistence is used when configured; an in-memory mode supports local demonstration and tests.

## Run locally
Start the backend from backend/ using npm install, cp .env.example .env, and npm run dev. Start the frontend from frontend/ using npm install and npm run dev.

## Architecture and quality
The frontend API client isolates HTTP calls from UI components. Backend routes isolate task operations from server setup. Environment variables hold local configuration. README.md documents setup, API, and manual acceptance checks.

## Deployment status
The repository includes deployment guidance but does not claim a live deployment. Configure hosting, VITE_API_URL, and MONGODB_URI as appropriate, then verify the public URL before describing the project as deployed.
