"use client";

import type { PromptEventType } from "@/lib/prompt-stats";

type TrackPromptEventInput = {
  slug: string;
  eventType: PromptEventType;
};

const EVENT_TRACK_KEY = "imagepromptive-event-track-times";

const EVENT_COOLDOWN_MS: Record<PromptEventType, number> = {
  view: 60 * 1000,
  copy: 10 * 60 * 1000,
  download: 10 * 60 * 1000,
};

function shouldTrackEvent(slug: string, eventType: PromptEventType) {
  try {
    const raw = window.localStorage.getItem(EVENT_TRACK_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    const now = Date.now();
    const key = `${eventType}:${slug}`;
    const lastTrackedAt = parsed[key] ?? 0;
    const cooldown = EVENT_COOLDOWN_MS[eventType];

    if (now - lastTrackedAt < cooldown) {
      return false;
    }

    window.localStorage.setItem(
      EVENT_TRACK_KEY,
      JSON.stringify({
        ...parsed,
        [key]: now,
      }),
    );

    return true;
  } catch {
    return true;
  }
}

export async function trackPromptEvent({
  slug,
  eventType,
}: TrackPromptEventInput) {
  if (!shouldTrackEvent(slug, eventType)) {
    return;
  }

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
