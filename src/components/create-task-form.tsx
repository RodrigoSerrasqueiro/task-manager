import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useTasksContext } from '@/contexts/tasksContext';
import { createTask } from '@/routes/createTask';
import type { NewTask } from '@/@types/interfaces';

export function CreateTaskForm() {
  const { data, refetchTaskData } = useTasksContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formSchema = z.object({
    title: z.string().min(3, {
      message: 'O título da tarefa deve conter pelo menos 3 caracteres.'
    }),
    description: z.string().min(10, {
      message: 'A descrição da tarefa deve ter pelo menos 10 caracteres.'
    }),
    images: z.array(z.string().url())
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      images: []
    }
  });

  const createTaskRequest = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success('Nova tarefa criada com sucesso!');
      resetForm();
      refetchTaskData?.();
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        setErrorMessage('Erro ao criar nova tarefa');
        console.error(error.response.data);
      }
    }
  });

  const handleSubmit = (formData: NewTask) => {
    createTaskRequest.mutate({ task: formData });
  };

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const resetForm = () => {
    form.reset();
  };

  if (!data) {
    return null;
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form className='space-y-4' onKeyDown={e => checkKeyDown(e)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='task-title'>Título</FormLabel>
                <FormControl>
                  <Input
                    id='task-title'
                    type='text'
                    placeholder='Título da tarefa...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='task-description'>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    id='task-description'
                    placeholder='Escreva uma descrição dessa tarefa...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* implementar imagens associadas aqui */}

          <div className='w-full flex justify-end gap-3'>
            <Button
              type='button'
              className='uppercase'
              variant='secondary'
              onClick={resetForm}
            >
              limpar
            </Button>
            <Button
              type='submit'
              className='uppercase font-semibold w-[170px]'
              onClick={form.handleSubmit(handleSubmit)}
            >
              {createTaskRequest.isPending ? (
                <LoaderIcon className='animate-spin' />
              ) : (
                'salvar mensagem'
              )}
            </Button>
          </div>
          {errorMessage && (
            <p className='text-[0.8rem] font-medium text-red-500'>
              {errorMessage}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}
