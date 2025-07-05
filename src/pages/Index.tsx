
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { blogPosts, getCategories, getAllTags, searchPosts } from '@/data/blogPosts';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const searchQuery = searchParams.get('search') || '';
  const categories = getCategories();
  const allTags = getAllTags();

  const filteredPosts = useMemo(() => {
    let posts = searchQuery ? searchPosts(searchQuery) : blogPosts;
    
    if (selectedCategory) {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    if (selectedTags.length > 0) {
      posts = posts.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }
    
    return posts;
  }, [searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-semibold">
                {t('explore')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                {t('subscribe')}
              </Button>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Categories */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('')}
                >
                  {t('allCategories')}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tags */}
            {allTags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mt-4">
                <span className="text-sm text-muted-foreground">Tags:</span>
                {allTags.slice(0, 10).map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Search Results Info */}
        {searchQuery && (
          <section className="py-4 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-muted-foreground">
                Search results for: <span className="font-semibold text-foreground">"{searchQuery}"</span>
                {filteredPosts.length > 0 && (
                  <span className="ml-2">({filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found)</span>
                )}
              </p>
            </div>
          </section>
        )}

        {/* Blog Posts Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                {searchQuery ? 'Search Results' : t('latestPosts')}
              </h2>
              {!searchQuery && filteredPosts.length > 6 && (
                <Button variant="outline">
                  View All Posts
                </Button>
              )}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  {t('noPostsFound')}
                </p>
                <Button variant="outline" onClick={() => {
                  setSelectedCategory('');
                  setSelectedTags([]);
                  window.history.pushState({}, '', '/');
                }}>
                  {t('backToHome')}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
