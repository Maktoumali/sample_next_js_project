"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BlogCardActions } from "./BlogCardActions";

type Blog = {
  id: string;
  title: string;
  content: string;
  image: string;
  authorId: string;
  author: {
    name: string | null;
  } | null;
};

type BlogListProps = {
  search?: string;
  initialData: Blog[];
};

export default function BlogList({ search, initialData }: BlogListProps) {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["blogs", search],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/blogs?page=${pageParam}&limit=9${search ? `&search=${encodeURIComponent(search)}` : ""}`
      );
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    // initialData: {
    //   pages: [
    //     {
    //       data: initialData,
    //       pagination: {
    //         page: 0,
    //         limit: 9,
    //         nextCursor: initialData.length === 9 ? 1 : null,
    //       },
    //     },
    //   ],
    //   pageParams: [0],
    // },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "error") {
    return <div className="text-red-500 text-center py-4">Error loading blogs.</div>;
  }

  const blogs = data?.pages.flatMap((page) => page.data) || [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog: Blog) => (
          <Card
            key={blog.id}
            className="flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <Image
                src={blog.image}
                alt={blog.title}
                width={100}
                height={100}
                className="rounded-md w-full"
              />
              <CardTitle className="text-xl leading-tight">
                {blog.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground italic">
                By {blog.author?.name || "Unknown"}
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground leading-relaxed">
                {blog.content}
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <BlogCardActions blog={blog as any} />
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Intersection Observer target */}
      <div ref={ref} className="h-10 w-full flex items-center justify-center mt-6">
        {isFetchingNextPage && <p className="text-muted-foreground">Loading more blogs...</p>}
      </div>
    </>
  );
}
