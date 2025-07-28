"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "sonner";

type BlogPost = {
  title: string;
  content: string;
};

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:3001/blog/${slug}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPost({ title: data.title, content: data.content });
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load post");
        setLoading(false);
      });
  }, [slug]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setUpdating(true);
    const res = await fetch(`http://localhost:3001/blog/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(post),
    });

    if (res.ok) {
      toast.success("Post updated successfully");
      router.push("/admin/dashboard");
    } else {
      toast.error("Failed to update post");
    }

    setUpdating(false);
  };

  if (loading)
    return (
      <AdminLayout>
        <p>Loading post...</p>
      </AdminLayout>
    );
  if (!post)
    return (
      <AdminLayout>
        <p>Post not found.</p>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Edit Blog Post</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              rows={10}
              required
            />
          </div>
          <Button className="cursor-pointer" type="submit" disabled={updating}>
            {updating ? "Updating..." : "Update Post"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
