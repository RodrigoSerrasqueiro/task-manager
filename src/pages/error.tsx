export function ErrorPage() {
  return (
    <div
      className={
        'w-full min-h-screen box-border bg-background text-muted-foreground flex flex-col items-center justify-center gap-3 p-4'
      }
    >
      <h2 className='text-3xl text-white/80'>Ops...😓</h2>
      <p className='max-w-[400px]'>
        Desculpe, tivemos um problema. Por favor tente recarregar a página.
      </p>
    </div>
  );
}
