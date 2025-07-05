
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toggleLanguage, t, language } = useLanguage();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-muted/50 border-t mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DS</span>
              </div>
              <span className="text-xl font-bold">DevScribe</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {language === 'en' 
                ? 'Discover insights, tutorials, and stories from the world of development.'
                : 'اكتشف الأفكار والدروس والقصص من عالم التطوير.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                {t('home')}
              </Link>
              <Link to="/categories" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                {t('categories')}
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                {t('about')}
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                {t('contact')}
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('subscribeNewsletter')}</h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                {t('subscribe')}
              </Button>
            </form>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('followUs')}</h3>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            {/* Language Toggle */}
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="mt-4">
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-muted-foreground text-sm">
            {t('copyright')}
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t('privacy')}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
