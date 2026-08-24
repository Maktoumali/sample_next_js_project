"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function ClientSessionGuard() {
  const { status } = useSession();

  useEffect(() => {
    // If the browser restores the page from cache (bfcache) after logout,
    // this client component will detect that the session is unauthenticated
    // and force a hard redirect to clear the screen.
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  return null;
}
