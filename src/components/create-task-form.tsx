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
import { images } from '@/utils/imagesData';
import { cn } from '@/lib/utils';

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
    images: z
      .array(z.string().url())
      .min(1, { message: 'Associe no mínimo uma imagem a essa tarefa.' })
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

          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagens Associadas</FormLabel>
                <FormControl>
                  <div className='grid grid-cols-3 gap-4'>
                    {images[0].map((image, index) => {
                      const isSelected = (field.value as string[])?.includes(
                        image
                      );
                      return (
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                        <div
                          key={image}
                          className={cn(
                            'relative cursor-pointer rounded-md overflow-hidden border-2 transition-colors',
                            isSelected
                              ? 'border-primary border-4'
                              : 'border-gray-300 hover:border-gray-400'
                          )}
                          onClick={() => {
                            if (isSelected) {
                              field.onChange(
                                field.value.filter(img => img !== image)
                              );
                            } else {
                              field.onChange([...(field.value || []), image]);
                            }
                          }}
                        >
                          <img
                            src={image}
                            alt={`Imagem ${index + 1}`}
                            className='w-full h-24 object-cover'
                          />
                        </div>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                'criar tarefa'
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
