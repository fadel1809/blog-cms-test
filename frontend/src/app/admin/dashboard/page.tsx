"use client";

import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import AlertDelete from "@/components/admin/AlertDelete";
import { toast } from "sonner";
import LogoutButton from "@/components/LogoutButton";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
};

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const router = useRouter();
  const limit = 6;

  const { data, error, isLoading, mutate } = useSWR<{
    data: BlogPost[];
    meta: { page: number; totalPages: number };
  }>(`http://localhost:3001/blog?page=${page}&limit=${limit}`, async (url: string | URL | Request) => {
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) {
      if (res.status === 401) router.push("/admin/login");
      throw new Error("Failed to fetch");
    }
    return res.json();
  });

  const posts = data?.data || [];
  const totalPages = data?.meta.totalPages || 1;

  const handleDelete = async (slug: string) => {
    setDeletingSlug(slug);
    const res = await fetch(`http://localhost:3001/blog/${slug}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      toast.success("Post deleted successfully");
      mutate();
    } else {
      toast.error("Failed to delete post");
    }
    setDeletingSlug(null);
  };

  if (error) return <p className="text-red-500">Gagal memuat data.</p>;

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Dashboard</h1>
        <LogoutButton/>
        </div>
        <Link href="/admin/dashboard/create-post">
          <Button className="mb-4 cursor-pointer">+ New Post</Button>
        </Link>

        {isLoading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">No posts found.</p>
        ) : (
          <>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(post.publishedAt).toLocaleDateString("id-ID")}
                    </p>
                    <p className="text-sm line-clamp-3 text-gray-500 mb-4">
                      {post.content
                        .replace(/<\/?[^>]+(>|$)/g, "")
                        .slice(0, 25)}
                      ...
                    </p>
                    <div className="flex gap-2">
                      <Link href={`/admin/dashboard/edit-post/${post.slug}`}>
                        <Button className="cursor-pointer" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/admin/dashboard/${post.slug}`}>
                        <Button
                          className="cursor-pointer"
                          size="sm"
                          variant="outline"
                        >
                          Read more
                        </Button>
                      </Link>
                      <AlertDelete
                        itemName={post.title}
                        loading={deletingSlug === post.slug}
                        onConfirm={() => handleDelete(post.slug)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-2">
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm mt-2">
                Page {page} of {totalPages}
              </span>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
