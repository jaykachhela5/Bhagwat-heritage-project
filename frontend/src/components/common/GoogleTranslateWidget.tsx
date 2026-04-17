import { memo, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              autoDisplay?: boolean;
              layout?: unknown;
            },
            elementId: string,
          ): unknown;
          InlineLayout?: {
            SIMPLE?: unknown;
          };
        };
      };
    };
    googleTranslateElementInit?: () => void;
    __googleTranslateScriptPromise?: Promise<void>;
  }
}

interface GoogleTranslateWidgetProps {
  className?: string;
  compact?: boolean;
}

const INCLUDED_LANGUAGES = "en,hi,mr,gu,bn,ta,te,kn,pa,sa";

function ensureGoogleTranslateScript() {
  if (window.google?.translate?.TranslateElement) {
    return Promise.resolve();
  }

  if (!window.__googleTranslateScriptPromise) {
    window.__googleTranslateScriptPromise = new Promise<void>((resolve, reject) => {
      const existingScript = document.getElementById("google-translate-script") as HTMLScriptElement | null;

      window.googleTranslateElementInit = () => {
        resolve();
      };

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener("error", () => reject(new Error("Google Translate failed to load.")), {
          once: true,
        });
        return;
      }

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => reject(new Error("Google Translate failed to load."));
      document.body.appendChild(script);
    });
  }

  return window.__googleTranslateScriptPromise;
}

export const GoogleTranslateWidget = memo(function GoogleTranslateWidget({
  className = "",
  compact = false,
}: GoogleTranslateWidgetProps) {
  const [failed, setFailed] = useState(false);
  const elementIdRef = useRef(`google_translate_${Math.random().toString(36).slice(2, 10)}`);
  const initializedRef = useRef(false);

  useEffect(() => {
    let disposed = false;

    void ensureGoogleTranslateScript()
      .then(() => {
        if (disposed || initializedRef.current || !window.google?.translate?.TranslateElement) {
          return;
        }

        const container = document.getElementById(elementIdRef.current);
        if (!container) {
          return;
        }

        container.innerHTML = "";

        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: INCLUDED_LANGUAGES,
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE,
          },
          elementIdRef.current,
        );

        initializedRef.current = true;
      })
      .catch(() => {
        if (!disposed) {
          setFailed(true);
        }
      });

    return () => {
      disposed = true;
    };
  }, []);

  return (
    <div
      className={`google-translate-widget ${compact ? "google-translate-widget--compact" : "inline-flex items-center gap-2 rounded-xl border border-[var(--color-surface-utility-border)] bg-[var(--color-surface-utility)] px-3 py-2 text-sm text-[var(--color-secondary)] shadow-[0_8px_18px_rgba(15,103,140,0.08)]"} ${className}`}
    >
      {compact ? null : <i className="fas fa-language text-[var(--campaign-accent)]" aria-hidden="true" />}
      {compact ? null : <span className="font-semibold">Translate</span>}
      {failed ? (
        compact ? (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#fff1ec] text-xs font-bold text-[#c94c33]">
            !
          </span>
        ) : (
          <span className="text-xs text-[#c94c33]">Unavailable</span>
        )
      ) : (
        <div id={elementIdRef.current} className={`google-translate-widget__slot ${compact ? "" : "min-w-[120px]"}`} />
      )}
    </div>
  );
});
