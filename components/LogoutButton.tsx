"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { status } = useSession();

  if (status !== "authenticated") {
    return null;
  }

  return (
    <Button 
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="absolute top-4 right-4 z-50 flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}