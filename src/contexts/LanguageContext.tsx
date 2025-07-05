
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    categories: 'Categories',
    about: 'About',
    contact: 'Contact',
    search: 'Search posts...',
    readMore: 'Read More',
    minRead: 'min read',
    share: 'Share',
    bookmark: 'Bookmark',
    author: 'Author',
    publishedOn: 'Published on',
    relatedPosts: 'Related Posts',
    subscribeNewsletter: 'Subscribe to our newsletter',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    followUs: 'Follow Us',
    copyright: '© 2024 DevScribe. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    heroTitle: 'Welcome to DevScribe',
    heroSubtitle: 'Discover insights, tutorials, and stories from the world of development',
    explore: 'Explore Posts',
    latestPosts: 'Latest Posts',
    allCategories: 'All Categories',
    noPostsFound: 'No posts found',
    backToHome: 'Back to Home'
  },
  ar: {
    home: 'الرئيسية',
    categories: 'التصنيفات',
    about: 'حول',
    contact: 'اتصل بنا',
    search: 'البحث في المقالات...',
    readMore: 'اقرأ المزيد',
    minRead: 'دقيقة قراءة',
    share: 'شارك',
    bookmark: 'إشارة مرجعية',
    author: 'الكاتب',
    publishedOn: 'نُشر في',
    relatedPosts: 'مقالات ذات صلة',
    subscribeNewsletter: 'اشترك في نشرتنا الإخبارية',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    subscribe: 'اشترك',
    followUs: 'تابعنا',
    copyright: '© 2024 DevScribe. جميع الحقوق محفوظة.',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    heroTitle: 'مرحباً بك في DevScribe',
    heroSubtitle: 'اكتشف الأفكار والدروس والقصص من عالم التطوير',
    explore: 'استكشف المقالات',
    latestPosts: 'أحدث المقالات',
    allCategories: 'جميع التصنيفات',
    noPostsFound: 'لم يتم العثور على مقالات',
    backToHome: 'العودة للرئيسية'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('devscribe-language');
    return (stored as Language) || 'en';
  });

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('devscribe-language', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
