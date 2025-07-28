import { SidebarProvider } from "../ui/sidebar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 bg-background shadow-2xl p-6 text-foreground">
      <main className="flex-1 p-4 md:p-6 bg-white rounded-lg">{children}</main>
    </div>
  );
}
