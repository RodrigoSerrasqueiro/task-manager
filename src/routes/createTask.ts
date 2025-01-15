import type { CreateTaskProps } from '@/@types/interfaces';
import { api } from '@/api/api';

export async function createTask({ task }: CreateTaskProps) {
  const response = await api.post('/tasks', { ...task });

  return response.data;
}
