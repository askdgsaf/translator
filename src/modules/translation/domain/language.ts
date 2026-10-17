export const LANGUAGES = ['zh', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

export function isLanguage(value: string): value is Language {
    return (LANGUAGES as readonly string[]).includes(value);
}