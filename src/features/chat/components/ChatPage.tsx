"use client";

import {
  MessageSquare,
  Copy,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { ModeHeader } from "../../search/components/ModeHeader";
import { ModelPill } from "../../search/components/ModelPill";
import { MessageBubble } from "../../search/components/MessageBubble";
import { InputBar } from "../../search/components/InputBar";

const actions = [
  { icon: Copy, label: "Copy" },
  { icon: RotateCw, label: "Regenerate" },
  { icon: ThumbsUp, label: "Good response" },
  { icon: ThumbsDown, label: "Bad response" },
];

export function ChatPage() {
  return (
    <>
      <ModeHeader icon={MessageSquare} title="Chat">
        <ModelPill label="GPT-4o" active />
      </ModeHeader>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 overflow-y-auto py-4">
        <MessageBubble role="user">
          Explain the difference between server and client components in Next.js
        </MessageBubble>

        <div className="flex flex-col gap-2">
          <MessageBubble role="ai">
            <div className="flex flex-col gap-3">
              <p>
                Server Components render on the server and never ship JavaScript
                to the browser. They can access data sources directly and keep
                bundles small.
              </p>
              <p>
                Client Components run in the browser and are needed for
                interactivity — state, effects, and event handlers:
              </p>
              <pre className="overflow-x-auto rounded-lg border border-white/[0.08] bg-[#0A0A0B] p-3 text-[13px] text-[#A1A1A6]">
                <code>{`"use client";
import { useState } from "react";

export function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`}</code>
              </pre>
              <p>
                A good rule: default to Server Components, opt into{" "}
                <code className="rounded bg-[#1A1A1F] px-1 py-0.5 text-[13px] text-[#60A5FA]">
                  "use client"
                </code>{" "}
                only where you need the browser.
              </p>
            </div>
          </MessageBubble>

          <div className="flex items-center gap-1">
            {actions.map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="rounded-md p-1.5 text-[#6B6B70] transition-colors hover:bg-[#1A1A1F] hover:text-[#EDEDED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl pt-4">
        <InputBar placeholder="Message Nexus…" />
      </div>
    </>
  );
}