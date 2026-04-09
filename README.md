# Task Manager - Full Stack Assignment

A small, efficient, and visually stunning Task Manager application built with Next.js (App Router) and Vanilla CSS.

## Features

- **Full CRUD**: Create, View, Update status, and Delete tasks.
- **REST API**: Clean backend routes handling validation and JSON responses.
- **Persistence**: File-based storage ensures tasks are saved across restarts.
- **Filtering**: Easily filter tasks by "All", "Pending", or "Completed".
- **Premium UI**: 
  - Glassmorphic design system.
  - Smooth micro-animations and transitions.
  - Responsive layout for mobile and desktop.
  - Loading and error states for better UX.

## Tech Stack

- **Frontend**: React 19, Next.js 15 (App Router), Tailwind CSS (for layout utilities) + Vanilla CSS (for design system).
- **Backend**: Next.js API Routes (Node.js runtime).
- **Storage**: JSON file persistence in `data/tasks.json`.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open the App**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /api/tasks`: Returns all tasks.
- `POST /api/tasks`: Creates a new task (requires `{ "title": "string" }`).
- `PATCH /api/tasks/:id`: Updates task status (requires `{ "completed": boolean }`).
- `DELETE /api/tasks/:id`: Deletes a task by ID.

## Assumptions & Trade-offs

- **Persistence**: Used a JSON file instead of a full database to keep the project lightweight and "intentionally small" as requested, while still offering persistence across sessions.
- **Styling**: Focused on a "wow" aesthetic using Vanilla CSS variables and glassmorphism to demonstrate design sensibility.
- **Framework**: Chose Next.js for its unified full-stack capabilities, making it the most efficient choice for a 1-2 hour technical task.
