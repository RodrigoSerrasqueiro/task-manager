import { Header } from './components/header';
import { PageContainer } from './components/page-container';
import { TaskCard } from './components/task-card';
import { Separator } from './components/ui/separator';
import { useTasksContext } from './contexts/tasksContext';

export function App() {
  const { data } = useTasksContext();

  if (!data) {
    return;
  }

  const tasksCompleteds = data.tasks.filter(task => task.completed);
  const tasksPending = data.tasks.filter(task => !task.completed);

  return (
    <PageContainer>
      <div className='w-full max-w-screen-lg flex flex-col gap-3'>
        <Header />

        {data.tasks.length < 1 && (
          <h2 className='text-lg font-semibold text-center mt-20'>
            Você ainda não criou nenhuma tarefa. Aproveite para criar a primeira
            agora mesmo!!! 😀
          </h2>
        )}

        {tasksPending.length > 0 && (
          <div className='flex items-center gap-3'>
            <h2>Pendentes</h2>
            <Separator />
          </div>
        )}

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
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
