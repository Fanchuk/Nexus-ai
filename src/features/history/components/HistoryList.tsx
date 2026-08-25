"use client";

import { useQueryState } from "nuqs";
import { HistoryGroupData } from "../types";
import HistoryItem from "./HistoryItem";

type HistoryListProps = {
  groups: HistoryGroupData[];
  hasMore: boolean;
  limit: number;
};

export default function HistoryList({ groups, hasMore, limit }: HistoryListProps) {
  const [, setLimit] = useQueryState("limit", { shallow: false });

  if (!groups.length) {
    return <p className="mt-10 text-center text-sm text-muted">No prompts yet.</p>;
  }

  return (
    <>
      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.label}>
            <h2 className="mb-4 text-sm text-muted">{group.label}</h2>
            <ol className="relative space-y-3 border-l border-line pl-6">
              {group.items.map((entry) => (
                <HistoryItem key={entry.id} entry={entry} />
              ))}
            </ol>
          </section>
        ))}
      </div>

      {hasMore ? (
        <button
          onClick={() => setLimit(String(limit + 20))}
          className="mt-8 w-full rounded-xl border border-line bg-surface py-3 text-sm text-muted transition-colors hover:bg-raised hover:text-fg"
        >
          Load more
        </button>
      ) : null}
    </>
  );
}