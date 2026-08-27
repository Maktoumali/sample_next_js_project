"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Blog } from "../api/db";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function BlogCardActions({ blog }: { blog: Blog }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const queryClient = useQueryClient();

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setIsEditOpen(false);
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
        router.refresh();
        toast.success("Blog updated successfully!");
      } else if (res.status === 401) {
        toast.error("You must be logged in to edit a blog");
        router.push("/login");
      } else {
        toast.error("Failed to edit blog");
      }
    } catch (error) {
      console.error("Error editing blog", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setIsDeleteOpen(false);
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
        router.refresh();
        toast.success("Blog deleted successfully!");
      } else if (res.status === 401) {
        toast.error("You must be logged in to delete a blog");
        router.push("/login");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    if (status === "unauthenticated") {
      toast.error("Please log in to edit a blog");
      router.push("/login");
      return;
    }
    setIsEditOpen(true);
  };

  const handleDeleteClick = () => {
    if (status === "unauthenticated") {
      toast.error("Please log in to delete a blog");
      router.push("/login");
      return;
    }
    setIsDeleteOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 justify-end w-full">
        <Button variant="outline" size="sm" onClick={handleEditClick}>Edit</Button>
        <Button variant="destructive" size="sm" onClick={handleDeleteClick}>Delete</Button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground shadow-lg rounded-xl w-full max-w-lg p-6 border mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter blog content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground shadow-lg rounded-xl w-full max-w-sm p-6 border mx-auto">
            <h2 className="text-xl font-bold mb-2 text-destructive">Delete Blog Post?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete &quot;{blog.title}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
