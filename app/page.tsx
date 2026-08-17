// app/page.tsx
import BlogPage from "./blog/page";
import OpeningPage from "./OpeningPage/page";

export default async function Home(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  // This renders the entire blog page on the '/' route
  return (
    <div>
      <OpeningPage/>
      <BlogPage searchParams={props.searchParams} />
    </div>
  );
}
