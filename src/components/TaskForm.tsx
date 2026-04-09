'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAdd: (title: string) => Promise<void>;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd(title);
      setTitle('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 animate-slide-up" style={{ animationDelay: '0.15s' }}>
      <div className="flex gap-3">
        <div className="relative flex-1 group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new goal..."
            className="w-full bg-emerald-500/5 border border-emerald-500/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/40 focus:bg-emerald-500/10 transition-all font-medium text-emerald-50 placeholder:text-emerald-900"
            disabled={isSubmitting}
          />
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none blur-xl" />
        </div>
        <button
          type="submit"
          className="btn-primary disabled:opacity-50 min-w-[100px]"
          disabled={isSubmitting || !title.trim()}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-emerald-950/30 border-t-emerald-950 rounded-full animate-spin" />
          ) : (
            <>
              <Plus className="w-5 h-5" strokeWidth={3} />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
