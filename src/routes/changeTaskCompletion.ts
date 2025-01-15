import type { ChangeTaskCompletionProps } from '@/@types/interfaces';
import { api } from '@/api/api';

export async function changeTaskCompletion({
  taskId
}: ChangeTaskCompletionProps) {
  const response = await api.put(`/tasks/change-task-completion/${taskId}`);

  return response.data;
}
