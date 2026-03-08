import { memo } from "react";
import { useTranslation } from "react-i18next";

const SUPPORTED_LANGUAGES = ["en", "hi", "mr", "gu", "bn", "ta", "te", "kn", "pa", "sa"] as const;

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export const LanguageSwitcher = memo(function LanguageSwitcher({
  className = "",
  compact = false,
}: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0];

  return (
    <label
      className={`inline-flex items-center gap-2 rounded-xl border border-[#d8e4f2] bg-white/95 px-3 py-2 text-sm text-[#0d3b66] shadow-sm ${className}`}
    >
      <i className="fas fa-language text-[#f4a261]" aria-hidden="true" />
      {compact ? null : <span className="font-semibold">{t("switcher.label")}</span>}
      <select
        aria-label={t("switcher.ariaLabel")}
        value={currentLanguage}
        onChange={(event) => {
          void i18n.changeLanguage(event.target.value);
        }}
        className="min-w-[110px] bg-transparent font-semibold outline-none"
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
