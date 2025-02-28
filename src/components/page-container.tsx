import type { PageContainerProps } from '@/@types/interfaces';

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className='w-full min-h-screen flex justify-center px-2 lg:px-0 py-4'>
      {children}
    </div>
  );
}
