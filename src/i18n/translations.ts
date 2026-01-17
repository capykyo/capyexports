/**
 * Translation strings
 * 翻译字符串
 */

export type TranslationKey = 
  | 'nav.works'
  | 'nav.resume'
  | 'nav.about'
  | 'footer.copyright'
  | 'footer.social.twitter'
  | 'footer.social.github'
  | 'footer.social.email'
  | 'works.title'
  | 'works.back'
  | 'works.visit'
  | 'meta.title'
  | 'meta.description';

export type Translations = Record<TranslationKey, string>;

export const translations: Record<'zh' | 'en' | 'ja', Translations> = {
  zh: {
    'nav.works': '作品',
    'nav.resume': '简历',
    'nav.about': '关于',
    'footer.copyright': '© 2026 Capyexports Studio. Capy 从不恐慌，因为内核在它的心中。',
    'footer.social.twitter': 'Twitter',
    'footer.social.github': 'GitHub',
    'footer.social.email': '邮箱',
    'works.title': '作品',
    'works.back': '返回作品',
    'works.visit': '访问网站',
    'meta.title': '卡皮智出工作室',
    'meta.description': '卡皮智出 - 作品集网站',
  },
  en: {
    'nav.works': 'Works',
    'nav.resume': 'Resume',
    'nav.about': 'About',
    'footer.copyright': '© 2026 Capyexports Studio. Capy never panics, because the kernel is in its heart.',
    'footer.social.twitter': 'Twitter',
    'footer.social.github': 'GitHub',
    'footer.social.email': 'Email',
    'works.title': 'Works',
    'works.back': 'Back to Works',
    'works.visit': 'Visit Website',
    'meta.title': 'Capyexports Studio',
    'meta.description': 'Capyexports Studio - Portfolio Website',
  },
  ja: {
    'nav.works': '作品',
    'nav.resume': '履歴書',
    'nav.about': 'について',
    'footer.copyright': '© 2026 Capyexports Studio. Capyは決してパニックにならない、カーネルがその心にあるから。',
    'footer.social.twitter': 'Twitter',
    'footer.social.github': 'GitHub',
    'footer.social.email': 'メール',
    'works.title': '作品',
    'works.back': '作品に戻る',
    'works.visit': 'ウェブサイトを訪問',
    'meta.title': 'Capyexports Studio',
    'meta.description': 'Capyexports Studio - ポートフォリオサイト',
  },
};

/**
 * Get translation for a key in a specific locale
 * 获取特定语言的翻译
 */
export function t(key: TranslationKey, locale: 'zh' | 'en' | 'ja'): string {
  return translations[locale][key] || key;
}
