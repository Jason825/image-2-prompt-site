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
            本站用于整理和展示 Image 2.0 提示词与案例图片，当前阶段以产品验证和内容展示为主。
          </p>
        </div>

        <div className="text-left md:text-right">
          <p>联系邮箱：763484227@qq.com</p>
          <p className="mt-1">站点仍在持续整理与迭代中。</p>
        </div>
      </div>
    </footer>
  );
}
