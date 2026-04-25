create table if not exists prompt_stats (
  slug text primary key,
  views integer not null default 0,
  copies integer not null default 0,
  downloads integer not null default 0,
  score integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists idx_prompt_stats_score on prompt_stats (score desc);
create index if not exists idx_prompt_stats_updated_at on prompt_stats (updated_at desc);
