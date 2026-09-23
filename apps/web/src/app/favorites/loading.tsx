export default function Loading() {
  return (
    <main className="flex-1 animate-pulse">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="h-4 w-16 rounded bg-white/5" />
        <div className="mt-3 h-10 w-72 rounded bg-white/5" />
        <div className="mt-3 h-4 w-96 max-w-full rounded bg-white/5" />
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>
    </main>
  );
}
