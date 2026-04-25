import { NextResponse } from "next/server";
import { getSupabaseAdmin, hasSupabaseServerEnv } from "@/lib/supabase-server";
import {
  calculatePromptScore,
  isPromptEventType,
  type PromptStatRow,
} from "@/lib/prompt-stats";

export async function GET() {
  const supabase = getSupabaseAdmin();

  if (!supabase || !hasSupabaseServerEnv()) {
    return NextResponse.json({
      enabled: false,
      items: [] as PromptStatRow[],
    });
  }

  const { data, error } = await supabase
    .from("prompt_stats")
    .select("slug, views, copies, downloads, score, updated_at")
    .order("score", { ascending: false });

  if (error) {
    return NextResponse.json(
      {
        enabled: true,
        error: "读取统计数据失败",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    enabled: true,
    items: (data ?? []) as PromptStatRow[],
  });
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();

  if (!supabase || !hasSupabaseServerEnv()) {
    return NextResponse.json({ enabled: false }, { status: 202 });
  }

  const body = (await request.json().catch(() => null)) as
    | { slug?: string; eventType?: string }
    | null;

  const slug = body?.slug?.trim();
  const eventType = body?.eventType?.trim();

  if (!slug || !eventType || !isPromptEventType(eventType)) {
    return NextResponse.json({ error: "参数不合法" }, { status: 400 });
  }

  const { data: existing, error: fetchError } = await supabase
    .from("prompt_stats")
    .select("slug, views, copies, downloads")
    .eq("slug", slug)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: "读取旧统计失败" }, { status: 500 });
  }

  const views = (existing?.views ?? 0) + (eventType === "view" ? 1 : 0);
  const copies = (existing?.copies ?? 0) + (eventType === "copy" ? 1 : 0);
  const downloads =
    (existing?.downloads ?? 0) + (eventType === "download" ? 1 : 0);

  const { data, error } = await supabase
    .from("prompt_stats")
    .upsert(
      {
        slug,
        views,
        copies,
        downloads,
        score: calculatePromptScore({ views, copies, downloads }),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    )
    .select("slug, views, copies, downloads, score, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: "写入统计失败" }, { status: 500 });
  }

  return NextResponse.json({
    enabled: true,
    item: data as PromptStatRow,
  });
}
