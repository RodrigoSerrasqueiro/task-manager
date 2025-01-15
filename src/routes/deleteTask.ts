import type { DeleteTaskProps } from '@/@types/interfaces';
import { api } from '@/api/api';

export async function deleteTask({ taskId }: DeleteTaskProps) {
  const response = await api.delete(`/tasks/${taskId}`);

  return response.data;
}
