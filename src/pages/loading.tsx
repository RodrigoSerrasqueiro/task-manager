import { Loader } from 'lucide-react';

export function LoadingPage() {
  return (
    <div className='bg-background w-full min-h-screen flex flex-col items-center justify-center gap-3 text-center text-muted-foreground'>
      <Loader size={30} className='animate-spin' />
      <span>Estamos preparando tudo...</span>
    </div>
  );
}
