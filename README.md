# Developer Task Tracker

A beginner-friendly full-stack project for internship Phase 1.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- API testing: Postman
- Version control: Git + GitHub

## Structure

```text
developer-task-tracker/
├── frontend/
└── backend/
```

## Run Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on the Vite URL shown in the terminal.

## API

- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

## MongoDB

Set `MONGODB_URI` in `backend/.env`.
# developer-task-tracker
