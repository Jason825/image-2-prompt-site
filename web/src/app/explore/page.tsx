import { PromptBrowser } from "@/components/prompt-browser";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categoryTags, prompts } from "@/data/site-data";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <>
      <SiteHeader key={q} keyword={q} />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <PromptBrowser
            key={q}
            prompts={prompts}
            filters={categoryTags}
            mode="explore"
            showSearch={false}
            initialKeyword={q}
          />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
