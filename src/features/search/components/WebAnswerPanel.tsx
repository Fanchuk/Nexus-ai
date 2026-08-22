"use client";

import { Globe } from "lucide-react";
import PanelHeader from "@/components/ui/PanelHeader";
import Skeleton from "@/components/ui/Skeleton";
import { useWebAnswer } from "../hooks/useWebAnswer";
import { WebCard } from "../types";
import AnswerText from "./AnswerText";
import SourceList from "./SourceList";
import AnswerActions from "./AnswerActions";

type WebAnswerPanelProps = {
  card: WebCard;
  updatedLabel: string;
};

export default function WebAnswerPanel({ card: initial, updatedLabel }: WebAnswerPanelProps) {
  const { card, loading, run, save, turnIntoChart } = useWebAnswer(initial);
  const sources = card.data.sources ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-10">
      <PanelHeader
        icon={<Globe className="size-5" />}
        title={card.prompt || "Web answer"}
        gradient="from-cobalt to-azure"
        meta={updatedLabel}
      />

      <article className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
        {card.data.answer ? (
          <AnswerText text={card.data.answer} sources={sources} />
        ) : (
          <div className="space-y-3">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-11/12" />
            <Skeleton className="h-2 w-8/12" />
          </div>
        )}
      </article>

      {card.data.thread?.map((item, index) => (
        <article key={index} className="mt-4 rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <p className="mb-4 text-sm text-muted">{item.question}</p>
          {item.answer ? (
            <AnswerText text={item.answer} sources={sources} />
          ) : (
            <Skeleton className="h-2 w-9/12" />
          )}
        </article>
      ))}

      <SourceList sources={sources} />

      <AnswerActions
        isSaved={Boolean(card.data.isSaved)}
        loading={loading}
        onContinue={() => run("continue")}
        onChart={turnIntoChart}
        onSave={save}
        onAsk={(question) => run("follow", question)}
      />
    </div>
  );
}