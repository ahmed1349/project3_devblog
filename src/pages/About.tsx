
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{t('about')}</h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Welcome to DevScribe, your premier destination for development insights, tutorials, and industry stories.
              </p>

              <h2>Our Mission</h2>
              <p>
                At DevScribe, we believe that knowledge sharing is the cornerstone of technological advancement. 
                Our mission is to provide developers, designers, and tech enthusiasts with high-quality, 
                actionable content that helps them grow in their careers and stay current with industry trends.
              </p>

              <h2>What We Cover</h2>
              <ul>
                <li><strong>Frontend Development:</strong> React, Vue, Angular, and modern JavaScript frameworks</li>
                <li><strong>Backend Development:</strong> Node.js, Python, Java, and database technologies</li>
                <li><strong>DevOps & Infrastructure:</strong> Cloud computing, CI/CD, containerization</li>
                <li><strong>Programming Languages:</strong> TypeScript, Go, Rust, and emerging technologies</li>
                <li><strong>Best Practices:</strong> Code quality, testing, architecture patterns</li>
              </ul>

              <h2>Our Team</h2>
              <p>
                DevScribe is powered by a diverse team of experienced developers, technical writers, 
                and industry experts who are passionate about sharing their knowledge and helping 
                others succeed in the world of software development.
              </p>

              <h2>Join Our Community</h2>
              <p>
                Whether you're a beginner just starting your coding journey or a seasoned professional 
                looking to stay updated with the latest trends, DevScribe has something for you. 
                Subscribe to our newsletter, follow us on social media, and become part of our 
                growing community of developers.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
