"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      toast.success("Logout berhasil");
      router.push("/");
    } else {
      toast.error("Gagal logout");
    }
  };

  return (
    <Button className="cursor-pointer" variant={"destructive"}  onClick={handleLogout}>
      Logout
    </Button>
  );
}
