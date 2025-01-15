import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2, Check, X } from 'lucide-react';
import type { Task } from '../types/kanban';
import { cn } from '../lib/utils';
import { useKanbanStore } from '../store/kanbanStore';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const updateTaskTitle = useKanbanStore((state) => state.updateTaskTitle);
  const deleteTask = useKanbanStore((state) => state.deleteTask);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      updateTaskTitle(task.id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        isDragging && 'shadow-lg ring-2 ring-primary-500'
      )}
      {...attributes}
    >
      <div className="flex items-center gap-3">
        <div
          {...listeners}
          className="cursor-grab touch-none"
          aria-label="Drag handle"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-700"
              aria-label="Save"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              className="text-red-600 hover:text-red-700"
              aria-label="Cancel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <h3 className="flex-1 text-lg font-medium text-gray-900">{task.title}</h3>
            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Edit task"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-600"
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}