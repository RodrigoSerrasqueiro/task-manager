import { useState } from 'react';
import { Header } from './components/header';
import { PageContainer } from './components/page-container';
import { TaskCard } from './components/task-card';
import { Separator } from './components/ui/separator';
import { useTasksContext } from './contexts/tasksContext';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export function App() {
  const { data } = useTasksContext();
  const [search, setSearch] = useState<string>('');

  if (!data) {
    return;
  }

  const filteredtasks = search
    ? data.tasks.filter(task =>
        task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : data.tasks;
  const tasksCompleteds = filteredtasks.filter(task => task.completed);
  const tasksPending = filteredtasks.filter(task => !task.completed);

  return (
    <PageContainer>
      <div className='w-full max-w-screen-lg flex flex-col gap-3'>
        <Header />

        {data.tasks.length > 0 && (
          <div className='w-full flex items-center gap-3 my-5'>
            <Label htmlFor='search-input'>Pesquisar</Label>
            <Input
              id='search-input'
              className='max-w-[400px]'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <X
                      className='cursor-pointer opacity-[0.5]'
                      onClick={() => setSearch('')}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Limpar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}

        {data.tasks.length < 1 && (
          <h2 className='text-lg font-semibold text-center mt-20'>
            Você ainda não criou nenhuma tarefa. Aproveite para criar a primeira
            agora mesmo!!! 😀
          </h2>
        )}

        {data.tasks.length > 0 && filteredtasks.length < 1 && (
          <h2 className='text-md font-semibold text-left'>
            Nenhuma tarefa encontrada para essa pesquisa
          </h2>
        )}

        {tasksPending.length > 0 && (
          <div className='flex items-center gap-3'>
            <h2>Pendentes</h2>
            <Separator />
          </div>
        )}

        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {tasksPending.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {tasksCompleteds.length > 0 && (
          <div className='flex items-center gap-3 my-3'>
            <h2>Concluídas</h2>
            <Separator />
          </div>
        )}

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {tasksCompleteds.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
