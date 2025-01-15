import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, Column, TaskStatus } from '../types/kanban';

interface KanbanState {
  columns: Column[];
  addTask: (title: string) => void;
  moveTask: (taskId: string, sourceStatus: TaskStatus, destinationStatus: TaskStatus) => void;
  updateTaskTitle: (taskId: string, title: string) => void;
  deleteTask: (taskId: string) => void;
}

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'in-progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      columns: initialColumns,
      addTask: (title) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === 'todo'
              ? {
                  ...col,
                  tasks: [
                    ...col.tasks,
                    {
                      id: crypto.randomUUID(),
                      title,
                      status: 'todo',
                    },
                  ],
                }
              : col
          ),
        })),
      moveTask: (taskId, sourceStatus, destinationStatus) =>
        set((state) => {
          const sourceColumn = state.columns.find((col) => col.id === sourceStatus);
          const task = sourceColumn?.tasks.find((t) => t.id === taskId);
          
          if (!task) return state;

          return {
            columns: state.columns.map((col) => {
              if (col.id === sourceStatus) {
                return {
                  ...col,
                  tasks: col.tasks.filter((t) => t.id !== taskId),
                };
              }
              if (col.id === destinationStatus) {
                return {
                  ...col,
                  tasks: [...col.tasks, { ...task, status: destinationStatus }],
                };
              }
              return col;
            }),
          };
        }),
      updateTaskTitle: (taskId, title) =>
        set((state) => ({
          columns: state.columns.map((col) => ({
            ...col,
            tasks: col.tasks.map((task) =>
              task.id === taskId ? { ...task, title } : task
            ),
          })),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          columns: state.columns.map((col) => ({
            ...col,
            tasks: col.tasks.filter((task) => task.id !== taskId),
          })),
        })),
    }),
    {
      name: 'kanban-storage',
    }
  )
);