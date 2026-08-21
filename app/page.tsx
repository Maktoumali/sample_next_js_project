// app/page.tsx
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import BlogPage from "./blog/page";
import OpeningPage from "./OpeningPage/page";

export default async function Home(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(options);

  return (
    <div>
      {session ? (
        <BlogPage searchParams={props.searchParams} />
      ) : (
        <OpeningPage />
      )}
    </div>
  );
}
