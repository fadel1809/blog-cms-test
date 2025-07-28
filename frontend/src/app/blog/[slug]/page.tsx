
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type BlogPost = {
  id: number;
  title: string;
  content: string;
  slug: string;
  publishedAt: string;
};

async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`http://localhost:3001/blog/${slug}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; 
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {new Date(post.publishedAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      <Footer />
    </main>
  );
}
