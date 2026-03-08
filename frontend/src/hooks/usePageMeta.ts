import { useEffect } from "react";

const DEFAULT_TITLE = "Bhagwat Heritage Service Foundation Trust";

export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;

    if (!description) {
      return;
    }

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);
}
