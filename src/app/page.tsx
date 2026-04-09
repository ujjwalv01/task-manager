'use client';

import { useState, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';
import { Task } from '@/lib/tasks-store';
import { motion, AnimatePresence } from 'framer-motion';
import { ListChecks, Trash2, CheckCircle2, Circle } from 'lucide-react';
import ToastContainer, { Toast } from '@/components/Toast';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch {
      setError('Could not connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (title: string) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      addToast('Task created successfully', 'success');
    } catch {
      addToast('Failed to create task', 'error');
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed } : t));
      await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      addToast(`Task marked as ${completed ? 'completed' : 'pending'}`, 'success');
    } catch {
      addToast('Failed to update task', 'error');
      fetchTasks(); // Rollback
    }
  };

  const handleUpdateTask = async (id: string, title: string) => {
    try {
      setTasks(tasks.map(t => t.id === id ? { ...t, title } : t));
      await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      addToast('Task renamed successfully', 'success');
    } catch {
      addToast('Failed to rename task', 'error');
      fetchTasks();
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setTasks(tasks.filter(t => t.id !== id));
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      addToast('Task deleted successfully', 'success');
    } catch {
      addToast('Failed to delete task', 'error');
      fetchTasks();
    }
  };

  const clearCompleted = async () => {
    const completedTasks = tasks.filter(t => t.completed);
    setTasks(tasks.filter(t => !t.completed));
    for (const task of completedTasks) {
      await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
    }
    addToast(`Cleared ${completedTasks.length} completed tasks`, 'success');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-16 text-emerald-50">
      <header className="mb-12 flex flex-col items-center text-center animate-slide-up">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
          <ListChecks className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-6xl font-black mb-4 header-title tracking-tight">
          Task Manager
        </h1>
      </header>

      {/* Progress Analytics */}
      <section className="mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="glass-card p-6 flex items-center justify-between gap-8 relative overflow-hidden group">
          <div className="z-10">
            <h3 className="text-emerald-200 font-semibold mb-1">Your Progress</h3>
            <p className="text-sm text-emerald-700">{completedCount} of {tasks.length} tasks completed</p>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center z-10">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-emerald-950" />
              <motion.circle 
                cx="40" cy="40" r="32" 
                stroke="currentColor" strokeWidth="8" fill="transparent"
                strokeDasharray={201}
                strokeDashoffset={201 - (201 * progress) / 100}
                strokeLinecap="round"
                className="text-emerald-500 transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-sm font-bold text-emerald-400">{progress}%</span>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/10 transition-all duration-700" />
        </div>
      </section>

      <TaskForm onAdd={handleAddTask} />

      <div className="mb-8 flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex gap-2">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f 
                  ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/20' 
                  : 'text-emerald-700 hover:text-emerald-400 hover:bg-emerald-500/5'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        
        {completedCount > 0 && (
          <button 
            onClick={clearCompleted}
            className="flex items-center gap-2 text-xs font-semibold text-rose-800 hover:text-rose-500 transition-colors uppercase tracking-wider"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Completed
          </button>
        )}
      </div>

      <div className="space-y-1">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center gap-4 text-emerald-800">
             <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
             <p className="text-sm font-medium animate-pulse">Syncing tasks...</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center text-rose-400 bg-rose-500/5 rounded-2xl border border-rose-500/10">
            {error}
          </div>
        ) : (
          <motion.div layout>
            <AnimatePresence mode="popLayout">
              {filteredTasks.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-24 text-center glass-card border-dashed flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-emerald-500/5 rounded-full flex items-center justify-center mb-4 text-emerald-900">
                    {filter === 'completed' ? <Circle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                  </div>
                  <p className="text-emerald-800 font-medium">No {filter !== 'all' ? filter : ''} tasks found</p>
                  <p className="text-xs text-emerald-900 mt-1">Peace of mind attained.</p>
                </motion.div>
              ) : (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <footer className="mt-20 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
      </footer>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </main>
  );
}
