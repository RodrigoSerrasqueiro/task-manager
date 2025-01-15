import type { Tasks } from '@/@types/tasksTypes';
import { api } from '@/api/api';

export async function getAllTasks(): Promise<Tasks> {
  const response = await api.get('/tasks');

  return response.data;
}
