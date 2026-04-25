import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const updates = [
  {
    date: "2026-04-24 18:55",
    title: "修复分类页、标签页乱码并校正专题数据",
    body: "重写分类总览、分类详情、标签总览、标签详情页中文文案，并补齐海报专题缺失的案例索引。",
  },
  {
    date: "2026-04-24 18:25",
    title: "修复专题页与浏览页中文乱码",
    body: "重写专题总览、专题详情、浏览页与相关组件文案，修复筛选、专题入口和搜索区的乱码显示问题。",
  },
  {
    date: "2026-04-24 16:05",
    title: "补上最近浏览与更新日志入口",
    body: "详情页会记录最近浏览内容，首页可继续查看最近访问过的案例，同时补齐更新日志页与站内入口。",
  },
  {
    date: "2026-04-24 15:15",
    title: "补齐标签页、来源页与分类承接",
    body: "新增分类总览、分类详情、标签总览、标签详情和来源说明页，让内容组织更像正式站点。",
  },
  {
    date: "2026-04-24 14:40",
    title: "新增专题详情与收藏功能",
    body: "专题页可以进入专题详情，Prompt 卡片与详情页支持本地收藏。",
  },
  {
    date: "2026-04-24 13:55",
    title: "接入真实案例数据",
    body: "从 Image 2.0 提示词整理版中挑选摄影、UI、海报、信息图等案例接入站内。",
  },
];

export default function UpdatesPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
              更新
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight">
              更新日志
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              记录项目最近新增的页面、功能和内容整理进度，方便后续持续迭代。
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {updates.map((item) => (
              <section key={item.date} className="soft-panel rounded-[28px] p-6">
                <p className="text-sm text-[var(--color-brand-deep)]">{item.date}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">{item.body}</p>
              </section>
            ))}
          </div>
        </section>

        <PageCta title="继续浏览当前站内内容" href="/explore" label="去浏览" />
      </main>
      <SiteFooter />
    </>
  );
}



