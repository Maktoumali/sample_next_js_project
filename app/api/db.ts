export interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
}

const initialBlogs: Blog[] = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    content:
      "Next.js is a powerful React framework that enables server-side rendering...",
    image: "/what-is-conciseness.jpg",
  },
  {
    id: 2,
    title: "Understanding Server Components",
    content:
      "React Server Components allow you to write UI that can be rendered on the server...",
    image: "/server-rendering.png",
  },
  {
    id: 3,
    title: "The Power of TypeScript",
    content:
      "TypeScript is a strongly typed programming language that builds on JavaScript...",
    image: "/typescriptImage.jpg",
  },
];

// Persist the array across hot reloads in development
const globalForDb = globalThis as unknown as {
  blogs: Blog[] | undefined;
};

export const blogs: Blog[] = globalForDb.blogs ?? initialBlogs;

// Ensure all blogs have an image (fixes issues where globalThis cached the old array before image was added)
blogs.forEach((b) => {
  if (!b.image) {
    b.image = initialBlogs.find((ib) => ib.id === b.id)?.image || "";
  }
});

if (process.env.NODE_ENV !== "production") {
  globalForDb.blogs = blogs;
}
