"use client";

type DocTextProps = {
  text: string;
  onPage: (page: number) => void;
};

export default function DocText({ text, onPage }: DocTextProps) {
  return (
    <>
      {text.split(/\n+/).map((line, index) => (
        <p key={index} className="mt-3 text-[15px] leading-7 text-fg/90 first:mt-0">
          {line.split(/(\[p\.\d+\])/g).map((part, partIndex) => {
            const match = part.match(/^\[p\.(\d+)\]$/);
            if (!match) return part;

            return (
              <button
                key={partIndex}
                onClick={() => onPage(Number(match[1]))}
                className="mx-1.5 rounded-md border border-gold/40 bg-gold/15 px-1.5 py-0.5 text-xs text-gold transition-colors hover:bg-gold/25"
              >
                p.{match[1]}
              </button>
            );
          })}
        </p>
      ))}
    </>
  );
}