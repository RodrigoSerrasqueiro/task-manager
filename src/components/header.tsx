import logo from '../assets/logo-task-manager.png';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { CreateTaskForm } from './create-task-form';

export function Header() {
  const [createTaskDialogIsOpen, setCreateDialogIsOpen] = useState(false);

  return (
    <div className='w-full h-16 flex items-center justify-around'>
      <img src={logo} alt='Logotipo do Task Manager' className='w-16 h-16' />

      <h1 className='font-semibold text-2xl'>Task Manager</h1>

      <TooltipProvider>
        <Tooltip>
          <Dialog
            open={createTaskDialogIsOpen}
            onOpenChange={setCreateDialogIsOpen}
          >
            <DialogTrigger asChild>
              <TooltipTrigger asChild>
                <Button size='icon' className='rounded-full'>
                  <Plus />
                </Button>
              </TooltipTrigger>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Criar</DialogTitle>
                <DialogDescription>Crie uma nova tarefa</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='flex flex-col gap-2'>
                  <CreateTaskForm />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <TooltipContent>
            <p>Criar nova tarefa</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
