import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import BlogPostDetail from "@/components/BlogPostDetail";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} />;
}


