export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}