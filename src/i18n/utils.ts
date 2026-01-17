/**
 * Internationalization utilities
 * 国际化工具函数
 */

export type Locale = 'zh' | 'en' | 'ja';

export const locales: Locale[] = ['zh', 'en', 'ja'];

export const defaultLocale: Locale = 'zh';

/**
 * Get locale from URL path
 * 从 URL 路径获取语言代码
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return defaultLocale;
}

/**
 * Get path with locale prefix
 * 获取带语言前缀的路径
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // All locales use prefix for consistency
  // Default locale (zh) also uses /zh prefix
  return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
}

/**
 * Get path without locale prefix
 * 获取不带语言前缀的路径
 */
export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}

/**
 * Get locale display name
 * 获取语言显示名称
 */
export function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    zh: '中文',
    en: 'English',
    ja: '日本語',
  };
  return names[locale];
}
