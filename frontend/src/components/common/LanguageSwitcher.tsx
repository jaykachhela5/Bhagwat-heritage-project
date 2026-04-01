import { memo } from "react";
import { useTranslation } from "react-i18next";

const SUPPORTED_LANGUAGES = ["en", "hi", "gu", "mr"] as const;

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export const LanguageSwitcher = memo(function LanguageSwitcher({
  className = "",
  compact = false,
}: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language ?? "hi").split("-")[0];

  return (
    <label
      className={`relative inline-flex items-center gap-2 rounded-xl border border-[#dce9ee] bg-[#fffdf7] px-3 py-2 text-sm text-[#0a5375] shadow-[0_8px_18px_rgba(15,103,140,0.08)] ${className}`}
    >
      <i className="fas fa-language text-[#ef9a1e]" aria-hidden="true" />
      {compact ? null : <span className="font-semibold">{t("switcher.label")}</span>}
      <span className="font-semibold tracking-wide">EN हिं ગુજ म</span>
      <i className="fas fa-chevron-down text-xs text-[#0a5375]/85" aria-hidden="true" />
      <select
        aria-label={t("switcher.ariaLabel")}
        value={currentLanguage}
        onChange={(event) => {
          void i18n.changeLanguage(event.target.value);
        }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {SUPPORTED_LANGUAGES.map((languageCode) => (
          <option key={languageCode} value={languageCode}>
            {t(`languages.${languageCode}`)}
          </option>
        ))}
      </select>
    </label>
  );
});

