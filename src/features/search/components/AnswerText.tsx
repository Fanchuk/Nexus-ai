type AnswerTextProps = {
  text: string;
  sources: { link: string; domain: string }[];
};

export default function AnswerText({ text, sources }: AnswerTextProps) {
  return (
    <>
      {text.split(/\n{2,}/).map((paragraph, index) => (
        <p key={index} className="mt-4 text-[15px] leading-7 text-fg/90 first:mt-0 transition-all duration-300">
          {paragraph.split(/(\[\d+\])/g).map((part, partIndex) => {
            const match = part.match(/^\[(\d+)\]$/);
            if (!match) return part;

            const source = sources[Number(match[1]) - 1];
            if (!source) return null;

            return (
              <a
                key={partIndex}
                href={source.link}
                target="_blank"
                rel="noreferrer"
                className="mx-1.5 inline-flex rounded-md border border-azure/40 bg-azure/10 px-1.5 py-0.5 text-xs text-azure transition-colors hover:bg-azure/20"
              >
                {source.domain}
              </a>
            );
          })}
        </p>
      ))}
    </>
  );
}