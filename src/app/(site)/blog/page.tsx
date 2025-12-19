import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import BlogGrid from "@/components/BlogGrid";

export const metadata = {
  title: "Blog",
  description: "Finans, girişimcilik ve yatırım dünyasından güncel yazılar ve analizler.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <main className="min-h-screen pt-20">
      <BlogGrid posts={posts} />
    </main>
  );
}
