"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { useState, useEffect } from "react";
import ShareButton from "./ShareButton";

export default function BlogPostDetail({ post }: { post: any }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: readingProgress / 100 }}
      />

      {/* Hero Section - Full Width */}
      <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-background to-background" />
          )}
          {/* Multi-layer gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Tüm Yazılar</span>
              </Link>
            </motion.div>

            {/* Category Badge */}
            {post.categories && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-block bg-primary/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold text-white uppercase tracking-wider mb-4">
                  {post.categories}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/70"
            >
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{post.author}</span>
                </div>
              )}
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              )}
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.readTime}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="relative z-20 -mt-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-background-secondary/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/10 overflow-hidden"
          >
            {/* Article Body */}
            <div className="px-6 sm:px-10 py-8 sm:py-10">
              <div className="prose prose-lg prose-invert max-w-none
                prose-headings:text-text-primary prose-headings:font-bold
                prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:mb-6 prose-h1:mt-10 prose-h1:first:mt-0
                prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-primary prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4
                prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mb-3 prose-h3:mt-8
                prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-text-primary prose-strong:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-text-secondary
                prose-ul:text-text-secondary prose-ul:space-y-2
                prose-ol:text-text-secondary prose-ol:space-y-2
                prose-li:marker:text-primary
                prose-code:text-primary prose-code:bg-background-tertiary prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-background-tertiary prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                prose-img:rounded-2xl prose-img:shadow-lg
              ">
                <PortableText
                  value={post.body}
                  components={{
                    block: {
                      h1: ({ children }) => (
                        <h1 className="text-3xl sm:text-4xl font-bold mb-6 mt-10 first:mt-0 text-text-primary">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-10 text-primary border-l-4 border-primary pl-4">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 mt-8 text-text-primary">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-lg font-bold mb-2 mt-6 text-text-primary">
                          {children}
                        </h4>
                      ),
                      normal: ({ children }) => (
                        <p className="text-text-secondary leading-relaxed mb-6 text-base sm:text-lg">
                          {children}
                        </p>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary/50 bg-primary/5 rounded-r-xl py-4 px-6 my-6 text-text-secondary italic">
                          {children}
                        </blockquote>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-outside ml-6 mb-6 space-y-3 text-text-secondary">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal list-outside ml-6 mb-6 space-y-3 text-text-secondary">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({ children }) => (
                        <li className="text-base sm:text-lg leading-relaxed pl-2">
                          {children}
                        </li>
                      ),
                      number: ({ children }) => (
                        <li className="text-base sm:text-lg leading-relaxed pl-2">
                          {children}
                        </li>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-semibold text-text-primary">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
                      ),
                      code: ({ children }) => (
                        <code className="bg-background-tertiary px-2 py-0.5 rounded text-primary font-mono text-sm">
                          {children}
                        </code>
                      ),
                      link: ({ children, value }) => (
                        <a 
                          href={value?.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 sm:px-10 py-8 border-t border-white/10 bg-background-tertiary/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-text-secondary text-sm">
                  Bu yazı faydalı olduysa paylaşmayı unutmayın!
                </div>
                <div className="flex items-center gap-3">
                  {/* Share Button Entegrasyonu */}
                  <div className="w-40">
                    <ShareButton 
                      title={post.title} 
                      text={`${post.title} | Blog –`}
                    />
                  </div>
                  
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Diğer Yazılar
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related Posts Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 mb-20"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-8">Benzer Yazılar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Placeholder cards - can be populated with actual related posts */}
              <Link href="/blog" className="group">
                <div className="bg-background-secondary/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">Finans</div>
                  <h4 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                    Daha fazla yazı keşfet →
                  </h4>
                  <p className="text-text-secondary text-sm mt-2">Blog sayfamızda tüm içeriklerimize göz atın.</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 z-50"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </main>
  );
}
