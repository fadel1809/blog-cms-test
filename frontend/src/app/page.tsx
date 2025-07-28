"use client";
import useSWR from "swr";
import { useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  publishedAt: string;
};

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function HomePage() {
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/blog?page=${page}&limit=${limit}`,
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const posts: BlogPost[] = data?.data ?? [];
  const total = data?.meta?.totalPages ?? 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= total) {
      setPage(newPage);
    }
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Blog Terbaru
        </h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load posts.</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">Belum ada postingan.</p>
        ) : (
          <>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-2">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm mt-2">
                {page} / {total}
              </span>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === total}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
