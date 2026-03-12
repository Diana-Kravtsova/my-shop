export const LoadingSpinner = () => {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <div className="relative">
        <div className="border-primary/20 h-16 w-16 rounded-full border-4" />
        <div className="border-primary absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    </div>
  );
}
