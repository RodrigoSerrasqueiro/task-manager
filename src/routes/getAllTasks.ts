import type { TasksData } from '@/@types/interfaces';
import { api } from '@/api/api';

export async function getAllTasks(): Promise<TasksData> {
  const response = await api.get('/tasks');

  return response.data;
}
