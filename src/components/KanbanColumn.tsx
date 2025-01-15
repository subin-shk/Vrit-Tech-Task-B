import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import type { Column } from '../types/kanban';
import { cn } from '../lib/utils';

interface KanbanColumnProps {
  column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      className={cn(
        'flex h-full w-80 flex-col rounded-lg bg-gray-50 p-4',
        isOver && 'ring-2 ring-primary-500'
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{column.title}</h2>
        <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-sm text-gray-700">
          {column.tasks.length}
        </span>
      </div>
      <div ref={setNodeRef} className="flex-1 space-y-4 overflow-y-auto">
        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}