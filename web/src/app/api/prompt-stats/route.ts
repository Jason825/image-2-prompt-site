import { NextResponse } from "next/server";
import { calculatePromptScore, isPromptEventType } from "@/lib/prompt-stats";
import { getDb, hasDatabaseUrl } from "@/lib/db";

type PromptStatRow = {
  slug: string;
  views: number;
  copies: number;
  downloads: number;
  score: number;
  updated_at: string;
};

export async function GET() {
  const db = getDb();

  if (!db || !hasDatabaseUrl()) {
    return NextResponse.json({
      enabled: false,
      items: [] as PromptStatRow[],
    });
  }

  try {
    const result = await db.query<PromptStatRow>(
      `select slug, views, copies, downloads, score, updated_at
       from prompt_stats
       order by score desc, updated_at desc`,
    );

    return NextResponse.json({
      enabled: true,
      items: result.rows,
    });
  } catch {
    return NextResponse.json(
      {
        enabled: true,
        error: "读取统计数据失败",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const db = getDb();

  if (!db || !hasDatabaseUrl()) {
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

  try {
    const existingResult = await db.query<{
      slug: string;
      views: number;
      copies: number;
      downloads: number;
    }>(
      `select slug, views, copies, downloads
       from prompt_stats
       where slug = $1
       limit 1`,
      [slug],
    );

    const existing = existingResult.rows[0];
    const views = (existing?.views ?? 0) + (eventType === "view" ? 1 : 0);
    const copies = (existing?.copies ?? 0) + (eventType === "copy" ? 1 : 0);
    const downloads =
      (existing?.downloads ?? 0) + (eventType === "download" ? 1 : 0);

    const result = await db.query<PromptStatRow>(
      `insert into prompt_stats (slug, views, copies, downloads, score, updated_at)
       values ($1, $2, $3, $4, $5, now())
       on conflict (slug)
       do update set
         views = excluded.views,
         copies = excluded.copies,
         downloads = excluded.downloads,
         score = excluded.score,
         updated_at = now()
       returning slug, views, copies, downloads, score, updated_at`,
      [slug, views, copies, downloads, calculatePromptScore({ views, copies, downloads })],
    );

    return NextResponse.json({
      enabled: true,
      item: result.rows[0],
    });
  } catch {
    return NextResponse.json({ error: "写入统计失败" }, { status: 500 });
  }
}
