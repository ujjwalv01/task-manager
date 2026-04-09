# Task Manager - Full Stack Assignment

A high-performance, visually stunning Task Manager application built as a technical assignment to demonstrate full-stack proficiency. This project features a cutting-edge design system, robust API architecture, and a seamless user experience.

## ✨ Live Demo & Source
- **Live Deployment**: [https://task-manager-beryl-delta.vercel.app/](https://task-manager-beryl-delta.vercel.app/)
- **GitHub Repository**: [https://github.com/ujjwalv01/task-manager.git](https://github.com/ujjwalv01/task-manager.git)

## 🎯 Project Overview
This application serves as a comprehensive task management tool, allowing users to efficiently organize their goals with a professional-grade interface. It emphasizes clean code architecture, real-time feedback, and persistent data handling.

## 🚀 Key Features
- **Modern Full CRUD**: Create, read, update (rename), and delete tasks with immediate UI synchronization.
- **Progress Analytics**: Real-time visual progress tracking using a dynamic circular metrics component.
- **Smart Filtering**: Categorize tasks by "All", "Pending", or "Completed" status.
- **Persistence**: Built-in file-based storage ensures that user data remains intact across sessions and server restarts.
- **Premium UX**: 
  - Glassmorphic UI with backdrop blurs and emerald accents.
  - Fluid staggered animations using **Framer Motion**.
  - Custom in-app Toast notifications for all lifecycle actions.
  - Interactive icons from **Lucide-react**.

## 🛠️ Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS (Design System), Framer Motion.
- **Backend**: Node.js API Routes (REST Architecture).
- **Styling**: Modern CSS variables & Glassmorphism.
- **Data**: JSON-based file persistence.

## 📦 Getting Started

### Local Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/ujjwalv01/task-manager.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```

## 🏗️ Technical Decisions & Trade-offs
- **Single-Framework Choice**: Next.js was selected for its unified full-stack model, providing the most cohesive developer and user experience.
- **Styling Direction**: Chose a custom glassmorphic design system over standard libraries to demonstrate a strong sense of UI/UX aesthetics.
- **Persistence Strategy**: Implemented local file storage (`data/tasks.json`) to provide full persistence without the overhead of an external database, perfectly suited for the scope of this assignment.

---
