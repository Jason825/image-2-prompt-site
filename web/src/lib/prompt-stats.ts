export const PROMPT_SCORE_WEIGHTS = {
  view: 1,
  download: 2,
  copy: 3,
} as const;

export type PromptEventType = keyof typeof PROMPT_SCORE_WEIGHTS;

export type PromptStatRow = {
  slug: string;
  views: number;
  copies: number;
  downloads: number;
  score: number;
  updated_at: string;
};

export function isPromptEventType(value: string): value is PromptEventType {
  return value === "view" || value === "copy" || value === "download";
}

export function calculatePromptScore({
  views,
  copies,
  downloads,
}: {
  views: number;
  copies: number;
  downloads: number;
}) {
  return (
    views * PROMPT_SCORE_WEIGHTS.view +
    downloads * PROMPT_SCORE_WEIGHTS.download +
    copies * PROMPT_SCORE_WEIGHTS.copy
  );
}
