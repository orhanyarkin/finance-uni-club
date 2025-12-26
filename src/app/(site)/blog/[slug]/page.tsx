import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/BlogPostDetail";
import { client } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
    const posts = await client.fetch(POSTS_QUERY);
    return posts.map((post: any) => ({
        slug: post.slug.current,
    }));
}

// Dynamic metadata for social media previews (WhatsApp, Twitter, LinkedIn, Facebook, etc.)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    return {
      title: "Blog Yazısı Bulunamadı",
    };
  }

  const description = post.excerpt 
    ? `${post.excerpt.substring(0, 150)}${post.excerpt.length > 150 ? '...' : ''}`
    : "Startup ve Finans Topluluğu blog yazısı";

  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : "https://startupvefinanstoplulugu.com/assets/images/club_logo.png";

  const pageUrl = `https://startupvefinanstoplulugu.com/blog/${slug}`;

  return {
    title: post.title,
    description: description,
    
    // Open Graph - Facebook, LinkedIn, WhatsApp, Telegram, Discord, etc.
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: pageUrl,
      title: post.title,
      description: description,
      siteName: "Startup & Finans Topluluğu",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    
    // Twitter/X
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [imageUrl],
      creator: "@startupvefinans",
    },

    // Additional metadata
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}
