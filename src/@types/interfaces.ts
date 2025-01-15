import type { ReactNode } from 'react';

export interface PageContainerProps {
  children: ReactNode;
}

export interface TasksData {
  tasks: Array<Task>;
}

export interface Task {
  _id: string;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  images: [string];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface CardTaskProps {
  task: Task;
}

export interface ChangeTaskCompletionProps {
  taskId: string;
}

export interface DeleteTaskProps {
  taskId: string;
}

export interface NewTask {
  title: string;
  description: string;
  images: Array<string>;
}

export interface CreateTaskProps {
  task: NewTask;
}
