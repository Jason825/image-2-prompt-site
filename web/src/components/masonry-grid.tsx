"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const ROW_HEIGHT = 8;
const ROW_GAP = 20;

function resizeMasonryItems(container: HTMLDivElement) {
  const items = Array.from(container.children) as HTMLElement[];

  items.forEach((item) => {
    const itemHeight = item.getBoundingClientRect().height;
    const rowSpan = Math.ceil((itemHeight + ROW_GAP) / (ROW_HEIGHT + ROW_GAP));

    item.style.gridRowEnd = `span ${rowSpan}`;
  });
}

export function MasonryGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const runLayout = () => {
      resizeMasonryItems(container);
    };

    const frameId = window.requestAnimationFrame(runLayout);
    const resizeObserver = new ResizeObserver(runLayout);

    resizeObserver.observe(container);

    Array.from(container.children).forEach((item) => {
      resizeObserver.observe(item);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div ref={containerRef} className={["masonry-grid-true", className].join(" ").trim()}>
      {children}
    </div>
  );
}
