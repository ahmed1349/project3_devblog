
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/data/blogPosts';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useLanguage();
  const bookmarked = isBookmarked(post.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(post.id);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link to={`/post/${post.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Button
              variant="secondary"
              size="icon"
              className="bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={handleBookmarkClick}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Link>

      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="secondary">{post.category}</Badge>
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime} {t('minRead')}</span>
            </div>
          </div>
          
          <Link 
            to={`/post/${post.slug}`}
            className="text-primary hover:text-primary/80 font-medium"
          >
            {t('readMore')} →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
