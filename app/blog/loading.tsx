import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome to the Blog</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            This is the blog page content, fetched from our server-side API.
          </p>
        </div>
        <Button size="lg" className="w-full sm:w-auto opacity-50 cursor-not-allowed">
          Create New Post
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col h-[200px]">
            <CardHeader>
              <div className="h-7 bg-muted/60 animate-pulse rounded-md w-3/4"></div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              <div className="h-4 bg-muted/60 animate-pulse rounded-md w-full"></div>
              <div className="h-4 bg-muted/60 animate-pulse rounded-md w-5/6"></div>
              <div className="h-4 bg-muted/60 animate-pulse rounded-md w-4/6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
