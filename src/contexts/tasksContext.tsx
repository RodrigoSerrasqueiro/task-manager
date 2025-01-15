import type { TasksData } from '@/@types/interfaces';
import { getAllTasks } from '@/routes/getAllTasks';
import { useQuery } from '@tanstack/react-query';
import { createContext, type ReactNode, useContext } from 'react';

interface ContextProviderProps {
  children: ReactNode;
}

interface ContextProps {
  isLoading?: boolean;
  isError?: boolean;
  data?: TasksData;
  refetchTaskData?: () => void;
}

const StateContext = createContext<ContextProps>({});

export const TasksDataContextProvider = ({
  children
}: ContextProviderProps) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tasksData'],
    queryFn: getAllTasks,
    staleTime: 60 * 1000
  });

  if (isError) {
    console.log('Erro ao buscar dados', error);
  }

  if (!data) {
    return;
  }

  return (
    <StateContext.Provider
      value={{
        data,
        isLoading,
        isError,
        refetchTaskData: refetch
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useTasksContext = () => useContext(StateContext);
