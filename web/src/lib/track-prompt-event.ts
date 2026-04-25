"use client";

import type { PromptEventType } from "@/lib/prompt-stats";

type TrackPromptEventInput = {
  slug: string;
  eventType: PromptEventType;
};

export async function trackPromptEvent({
  slug,
  eventType,
}: TrackPromptEventInput) {
  try {
    await fetch("/api/prompt-stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, eventType }),
      keepalive: true,
    });
  } catch {
    // Ignore analytics failures so the UI stays responsive.
  }
}
