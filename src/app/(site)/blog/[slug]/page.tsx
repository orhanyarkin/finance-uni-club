import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/BlogPostDetail";
import { client } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60; // Revalidate every minute

export async function generateStaticParams() {
    const posts = await client.fetch(POSTS_QUERY);
    return posts.map((post: any) => ({
        slug: post.slug.current,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}



