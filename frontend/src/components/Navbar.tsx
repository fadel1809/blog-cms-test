import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full px-4 sm:px-6 py-4 border-b shadow-sm">
      <nav className="flex justify-between items-center max-w-5xl mx-auto">
        <Link href="/" className="text-lg sm:text-xl font-bold text-primary">
          Simple Blog
        </Link>
        <Link
          href="/login"
          className="text-xs sm:text-sm text-muted-foreground hover:underline"
        >
          Admin Login
        </Link>
      </nav>
    </header>
  );
}
