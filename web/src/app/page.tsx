import { PromptBrowser } from "@/components/prompt-browser";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categoryTags, prompts } from "@/data/site-data";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-6">
        <section className="page-shell pt-10">
          <PromptBrowser
            prompts={prompts}
            filters={categoryTags}
            mode="explore"
            showSearch={false}
          />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
