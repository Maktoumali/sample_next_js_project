import { Suspense } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CreateBlogModal } from "./CreateBlogModal";
import { BlogCardActions } from "./BlogCardActions";
import Image from "next/image";
import prisma from "@/lib/db";
import SearchInput from "./SearchInput";
import { getBlogs } from "@/lib/blogs";
import BlogList from "./BlogList";
import HeroSection from "./HeroSection";
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
export default async function BlogPage(props: {
  searchParams?:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
}) {
  const params = (await props.searchParams) || {};
  const limit = 12;
  const search = typeof params.search === "string" ? params.search : undefined;
  const blogs = await getBlogs(search, limit);

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="w-full h-60">
        <HeroSection />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to the Blog
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            This is the blog page content, fetched from our server-side API.
          </p>
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchInput />
          </Suspense>
        </div>
        <CreateBlogModal />
      </div>

      <BlogList search={search} />
    </div>
  );
}
