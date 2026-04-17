export const LANGUAGE_STORAGE_KEY: string;
export const DEFAULT_LANGUAGE: string;
export const languageMap: Record<string, string>;

export function normalizeLanguage(language?: string | null): string;
export function getLanguageShortLabel(language?: string | null): string;
export function getStoredLanguage(): string;
export function setStoredLanguage(language?: string | null): void;
