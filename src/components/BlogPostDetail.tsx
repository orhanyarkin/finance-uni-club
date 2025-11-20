"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { BlogPost } from "@/data/blogPosts";
import ReactMarkdown from "react-markdown";

export default function BlogPostDetail({ post }: { post: BlogPost }) {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Dön
        </Link>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-96 rounded-2xl overflow-hidden mb-8"
        >
          <Image
            src={post.coverImage}
            alt={post.title[language]}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white inline-block mb-4">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title[language]}
            </h1>
          </div>
        </motion.div>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-6 text-text-secondary mb-8 pb-8 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(post.date).toLocaleDateString(language)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{post.readTime} okuma</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold mb-4 mt-8 text-primary">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-bold mb-3 mt-6">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-text-secondary leading-relaxed mb-6">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-6 space-y-2 text-text-secondary">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-6 space-y-2 text-text-secondary">{children}</ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-6 italic my-6 text-text-secondary">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-background-tertiary px-2 py-1 rounded text-primary font-mono text-sm">
                  {children}
                </code>
              ),
            }}
          >
            {post.content[language]}
          </ReactMarkdown>
        </motion.div>

        {/* Share/Tags could go here */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-lift"
          >
            <ArrowLeft className="w-4 h-4" />
            Diğer Yazıları Gör
          </Link>
        </motion.div>
      </article>
    </main>
  );
}



