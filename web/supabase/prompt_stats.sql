create table if not exists public.prompt_stats (
  slug text primary key,
  views integer not null default 0,
  copies integer not null default 0,
  downloads integer not null default 0,
  score integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_prompt_stats_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  new.score = new.views + (new.downloads * 2) + (new.copies * 3);
  return new;
end;
$$;

drop trigger if exists set_prompt_stats_updated_at on public.prompt_stats;

create trigger set_prompt_stats_updated_at
before update on public.prompt_stats
for each row
execute function public.set_prompt_stats_updated_at();
