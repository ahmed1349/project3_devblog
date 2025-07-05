
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getCategories, getPostsByCategory, blogPosts } from '@/data/blogPosts';
import { useLanguage } from '@/contexts/LanguageContext';

const Categories = () => {
  const { category } = useParams<{ category: string }>();
  const { t } = useLanguage();
  
  const categories = getCategories();
  const posts = category ? getPostsByCategory(category) : blogPosts;
  
  const pageTitle = category ? 
    `${category} Posts` : 
    t('categories');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1>
            {!category && (
              <p className="text-muted-foreground">
                Browse posts by category to find exactly what you're looking for.
              </p>
            )}
          </div>

          {!category && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="p-4 rounded-lg border hover:border-primary transition-colors text-center"
                >
                  <h3 className="font-semibold">{cat}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getPostsByCategory(cat).length} posts
                  </p>
                </a>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {t('noPostsFound')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
