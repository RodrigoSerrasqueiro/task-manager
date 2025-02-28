import type { CardTaskProps } from '@/@types/interfaces';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Toggle } from '@/components/ui/toggle';
import { useTasksContext } from '@/contexts/tasksContext';
import { changeTaskCompletion } from '@/routes/changeTaskCompletion';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { CheckCircle, Circle, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { deleteTask } from '@/routes/deleteTask';
import { useState } from 'react';
import { UpdateTaskForm } from './update-task-form';

export function TaskCard({ task }: CardTaskProps) {
  const { refetchTaskData } = useTasksContext();
  const [updateTaskDialogIsOpen, setUpdateDialogIsOpen] =
    useState<boolean>(false);

  const changeTaskCompletionRequest = useMutation({
    mutationFn: changeTaskCompletion,
    onSuccess: data => {
      refetchTaskData?.();
      if (data.taskCompleted.completed) {
        toast.success('Parabéns!!! 🎉🥳 Você completou mais uma tarefa.');
      }
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const errorData = error.response.data as { message: string };
        toast.error('Erro ao marcar tarefa como concluída.');
        console.error(errorData.message);
      }
    }
  });

  const handleChangeTaskCompletion = () => {
    changeTaskCompletionRequest.mutate({ taskId: task.id });
  };

  const deleteTaskRequest = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      refetchTaskData?.();
      toast.success('Tarefa deletada com sucesso!');
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const errorData = error.response.data as { message: string };
        toast.error('Erro ao deletar tarefa.');
        console.error(errorData.message);
      }
    }
  });

  const handleDeleteTask = () => {
    deleteTaskRequest.mutate({ taskId: task.id });
  };

  return (
    <div>
      <Card
        className={`w-full max-w-[400px] ${task.completed ? 'border-primary' : 'border'}`}
      >
        <div className='absolute right-2 top-2 flex items-center gap-3'>
          <Dialog
            open={updateTaskDialogIsOpen}
            onOpenChange={setUpdateDialogIsOpen}
          >
            <DialogTrigger asChild>
              <Button size='icon' variant='ghost'>
                <Edit />
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Editar</DialogTitle>
                <DialogDescription>
                  Edite as informações da sua tarefa
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='flex flex-col gap-2'>
                  <UpdateTaskForm
                    task={task}
                    onClose={() => setUpdateDialogIsOpen(false)}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size='icon' variant='ghost'>
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja deletar essa tarefa?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não poderá ser desfeita futuramente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className='bg-destructive hover:bg-destructive/90'
                  onClick={handleDeleteTask}
                >
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CardHeader className='mt-2'>
          <CardTitle>
            <p className='max-w-[80%] leading-tight'>{task.title}</p>
          </CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <Carousel className='w-full'>
            <CarouselContent>
              {task.images.map(image => (
                <CarouselItem key={image}>
                  <div className='relative'>
                    <img
                      src={image}
                      alt={`Imagem associada à tarefa ${task.title}`}
                      className='w-full h-[150px]'
                    />
                    <CarouselPrevious className='absolute left-0 top-1/2' />
                    <CarouselNext className='absolute right-0 top-1/2' />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Toggle
            pressed={task.completed}
            onPressedChange={handleChangeTaskCompletion}
          >
            {task.completed ? <CheckCircle /> : <Circle />}
            {task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
          </Toggle>
        </CardFooter>
      </Card>
    </div>
  );
}
