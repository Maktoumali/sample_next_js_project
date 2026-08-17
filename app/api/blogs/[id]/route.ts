import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { unlink, writeFile, mkdir } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id: idString } = await params;
    const id = parseInt(idString, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, { status: 400 });
    }

    // Check the blog exists first
    const existingBlog = await prisma.blog.findUnique({ where: { id } });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    let imageUrl = existingBlog.image; // keep old image by default

    // Only process a new image if one was actually uploaded
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name);
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);

      imageUrl = `/uploads/${filename}`;

      // Delete the old image file so uploads/ doesn't fill up with orphans
      if (existingBlog.image) {
        const oldPath = path.join(process.cwd(), "public", existingBlog.image);
        await unlink(oldPath).catch(() => {
          // ignore if file is already missing
        });
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        image: imageUrl,
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id: idString } = await params;
    const id = parseInt(idString, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, { status: 400 });
    }

    const existingBlog = await prisma.blog.findUnique({ where: { id } });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await prisma.blog.delete({ where: { id } });

    // Clean up the associated image file
    if (existingBlog.image) {
      const imagePath = path.join(process.cwd(), "public", existingBlog.image);
      await unlink(imagePath).catch(() => {});
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}