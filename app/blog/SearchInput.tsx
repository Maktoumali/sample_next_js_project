"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(searchParams?.get("search")?.toString() || "");

  // Debounce the search to avoid updating the URL on every keystroke immediately
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      
      const newQueryString = params.toString();
      const currentQueryString = searchParams?.toString() || "";
      
      // Only push to router if the query string actually changed
      if (newQueryString !== currentQueryString) {
        startTransition(() => {
          router.replace(`${pathname}?${newQueryString}`, { scroll: false });
        });
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  return (
    <div className="relative w-full mt-10">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Search blogs by title, content, or author..."
      />
      {isPending && (
        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
          Searching...
        </span>
      )}
    </div>
  );
}
