import SplitText from "@/components/SplitText";

export default function OpeningPage() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* SplitText is a Client Component, but it is imported and rendered inside this Server Component (page.tsx). 
            The surrounding HTML will be server-side rendered. */}
        <SplitText
          text="Welcome to the Ultimate Blog"
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          delay={50}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-50px"
          textAlign="center"
          tag="h1"
        />
        
        <p className="text-xl md:text-2xl text-muted-foreground mt-4 mb-8">
          Discover insightful articles, tutorials, and stories from the community. 
          Enjoy lightning-fast server-side rendering combined with beautiful animations.
        </p>

        <a
          href="/blog"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Read Our Latest Posts
        </a>
      </div>
    </div>
  );
}
