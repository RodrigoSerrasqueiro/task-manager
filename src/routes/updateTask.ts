import type { UpdateTaskProps } from '@/@types/interfaces';
import { api } from '@/api/api';

export async function updateTask({ updatedTask }: UpdateTaskProps) {
  const response = await api.put(`/tasks/${updatedTask.id}`, {
    ...updatedTask
  });

  return response.data;
}
