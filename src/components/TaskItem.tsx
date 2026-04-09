'use client';

import { useState, useRef, useEffect } from 'react';
import { Task } from '@/lib/tasks-store';
import { Check, Trash2, Edit2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, editTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleUpdate();
    if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`task-item ${task.completed ? 'task-complete' : ''}`}
    >
      <div className="flex items-center gap-4 flex-1">
        <div 
          onClick={() => onToggle(task.id, !task.completed)}
          className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
        >
          <AnimatePresence>
            {task.completed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Check className="w-4 h-4 text-emerald-950" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-2 py-1 outline-none text-emerald-100"
          />
        ) : (
          <span 
            onDoubleClick={() => setIsEditing(true)}
            className={`text-lg transition-all duration-300 cursor-text select-none ${
              task.completed ? 'line-through text-emerald-900/40' : 'text-emerald-50'
            }`}
          >
            {task.title}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        {!task.completed && (
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-emerald-700 hover:text-emerald-400 transition-colors p-2 rounded-xl hover:bg-emerald-500/10"
            title="Edit task"
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          </button>
        )}
        <button 
          onClick={() => onDelete(task.id)}
          className="text-emerald-900/40 hover:text-rose-500 transition-colors p-2 rounded-xl hover:bg-rose-500/10"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
