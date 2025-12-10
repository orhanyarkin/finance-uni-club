"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { urlFor } from "@/sanity/lib/image";

interface BlogGridProps {
  limit?: number;
  posts: any[];
}

export default function BlogGrid({ limit, posts }: BlogGridProps) {
  const { language, t } = useLanguage();
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section className="py-12 md:py-20 bg-background-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link href="/blog" className="group inline-block mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text group-hover:text-primary transition-colors">{t("blog.title")}</span>
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-flex align-middle ml-3"
              >
                <ArrowRight className="w-8 h-8 text-primary group-hover:translate-x-2 transition-transform duration-300" />
              </motion.span>
            </h2>
          </Link>
          <p className="text-lg text-text-secondary">
            {t("blog.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.slug.current}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cover Image */}
              <Link href={`/blog/${post.slug.current}`} className="block relative h-48 overflow-hidden bg-gradient-to-br from-primary to-accent-cyan cursor-pointer">
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                {post.categories && (
                  <div className="absolute top-4 left-4 bg-white text-gray-900 font-semibold px-3 py-1 rounded-full text-sm shadow-sm z-10">
                    {post.categories}
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString(language)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.slug.current}`} className="block group-hover:text-primary transition-colors">
                  <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 min-h-[56px]">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-text-secondary mb-4 line-clamp-3 min-h-[72px]">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-semibold"
                  >
                    {t("blog.readMore")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

