import Link from "next/link";

type BlogCardProps = {
  title: string;
  slug: string;
  publishedAt: string;
};

export function BlogCard({ title, slug, publishedAt }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block border rounded-xl p-4 hover:shadow-sm transition bg-white dark:bg-zinc-900"
    >
      <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
        {new Date(publishedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </Link>
  );
}
