export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/50 py-8 text-sm text-[var(--color-muted)]">
      <div className="page-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-[var(--color-ink)]">
            © {year} ImagePromptive. All rights reserved.
          </p>
          <p className="mt-1">
            本站用于展示 Image 2.0 提示词与图片案例，仅用于产品验证与内容展示。
          </p>
        </div>

        <div className="text-left md:text-right">
          <p>联系邮箱：763484227@qq.com</p>
          <p className="mt-1">沪ICP备 2026000000 号-1</p>
        </div>
      </div>
    </footer>
  );
}
