
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/blogPosts';

const Author = () => {
  const { authorId } = useParams<{ authorId: string }>();
  
  const authorPosts = blogPosts.filter(post => post.author.id === authorId);
  const author = authorPosts.length > 0 ? authorPosts[0].author : null;

  if (!author) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Author Not Found</h1>
            <p className="text-muted-foreground">The author you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Author Header */}
          <div className="text-center mb-12">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {author.bio}
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              {authorPosts.length} {authorPosts.length === 1 ? 'post' : 'posts'} published
            </div>
          </div>

          {/* Author's Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Posts by {author.name}</h2>
            {authorPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found by this author.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {authorPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Author;
