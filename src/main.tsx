import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider.tsx';
import { TasksDataContextProvider } from './contexts/tasksContext.tsx';
import { Toaster } from './components/ui/sonner.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Toaster richColors position='top-right' />
      <QueryClientProvider client={queryClient}>
        <TasksDataContextProvider>
          <App />
        </TasksDataContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
