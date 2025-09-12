export default function LoadingDots() {
  return (
    <div className="flex h-6 items-center justify-center gap-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-dot-wave h-3 w-3 rounded-full bg-current"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}
