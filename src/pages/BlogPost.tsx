
import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, User, Share2, Bookmark, BookmarkCheck, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ReadingProgress';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import BlogCard from '@/components/BlogCard';
import { getPostBySlug, blogPosts } from '@/data/blogPosts';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useLanguage();
  const [views, setViews] = useState(0);

  const post = slug ? getPostBySlug(slug) : null;

  useEffect(() => {
    if (post) {
      // Simulate view increment
      const viewKey = `post-views-${post.id}`;
      const currentViews = localStorage.getItem(viewKey);
      const newViews = currentViews ? parseInt(currentViews) + 1 : post.views + 1;
      localStorage.setItem(viewKey, newViews.toString());
      setViews(newViews);
    }
  }, [post]);

  if (!slug || !post) {
    return <Navigate to="/404" replace />;
  }

  const bookmarked = isBookmarked(post.id);
  
  const handleBookmark = () => {
    toggleBookmark(post.id);
    toast({
      title: bookmarked ? "Bookmark Removed" : "Bookmark Added",
      description: bookmarked ? "Post removed from bookmarks" : "Post added to bookmarks",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Post link copied to clipboard",
      });
    }
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ReadingProgress />
      
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              {t('home')}
            </Link>
            <span>/</span>
            <Link to="/categories" className="hover:text-foreground transition-colors">
              {t('categories')}
            </Link>
            <span>/</span>
            <span className="text-foreground">{post.category}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Button variant="ghost" size="sm" className="mb-6" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('backToHome')}
                </Link>
              </Button>

              {/* Post Header */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Post Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime} {t('minRead')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>{views.toLocaleString()} views</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="w-4 h-4 mr-2" />
                      {t('share')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBookmark}
                      className={bookmarked ? 'text-primary border-primary' : ''}
                    >
                      {bookmarked ? (
                        <BookmarkCheck className="w-4 h-4 mr-2" />
                      ) : (
                        <Bookmark className="w-4 h-4 mr-2" />
                      )}
                      {t('bookmark')}
                    </Button>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="relative rounded-lg overflow-hidden mb-8">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <article className="lg:col-span-3">
                  <MarkdownRenderer content={post.content} />
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    {/* Author Card */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{post.author.name}</h3>
                            <p className="text-sm text-muted-foreground">{t('author')}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {post.author.bio}
                        </p>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to={`/author/${post.author.id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Share Card */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4">{t('share')}</h3>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share on Twitter
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share on LinkedIn
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start"
                            onClick={handleShare}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Copy Link
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">{t('relatedPosts')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
