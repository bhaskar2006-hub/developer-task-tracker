# Developer Task Tracker

Yuva Intern — Fundamentals and Setup practical project.

## Stack
React + Vite, Node.js, Express, MongoDB/Mongoose, Git/GitHub.

## Features
- Hello World API
- Health check
- Create/read/update/delete tasks
- Input validation
- MongoDB configuration
- In-memory fallback for local demonstration
- Basic automated tests
- GitHub Actions CI

## Run backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend: http://localhost:5000

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

## API
- GET /api/hello
- GET /api/health
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

## Git workflow
```bash
git init
git add .
git commit -m "feat: initialize developer task tracker"
git branch -M main
git remote add origin <your-github-repository-url>
git push -u origin main
```
