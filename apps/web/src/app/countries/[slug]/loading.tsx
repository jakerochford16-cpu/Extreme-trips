export default function Loading() {
  return (
    <main className="flex-1 animate-pulse">
      <div className="h-[300px] w-full bg-white/5 sm:h-[360px]" />
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-10 h-6 w-2/3 max-w-lg rounded bg-white/5" />
        <div className="mb-8 flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-white/5" />
          ))}
        </div>
        <div className="mb-10 h-64 rounded-2xl bg-white/5" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>
    </main>
  );
}
