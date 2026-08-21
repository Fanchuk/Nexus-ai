export function AnimatedBackground() {
  return (
    <div className="mk-bg" aria-hidden>
      <div className="mk-blob mk-blob-a left-[-10%] top-[-10%] h-[38rem] w-[38rem]" />
      <div className="mk-blob mk-blob-b right-[-12%] top-[10%] h-[34rem] w-[34rem]" />
      <div className="mk-blob mk-blob-c bottom-[-15%] left-[25%] hidden h-[36rem] w-[36rem] md:block" />
      <div className="mk-dots" />
      <div className="mk-fade" />
    </div>
  );
}