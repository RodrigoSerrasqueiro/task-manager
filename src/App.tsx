import { useTasksContext } from './contexts/tasksContext';

export function App() {
  const { data } = useTasksContext();

  if (!data) {
    return;
  }

  console.log(data);

  return <div className='text-white'>task manager</div>;
}
