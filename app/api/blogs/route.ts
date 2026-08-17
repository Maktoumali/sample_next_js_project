import { NextRequest, NextResponse } from 'next/server';
import { blogs, Blog } from '../db';
import { getBlogs } from '@/lib/blogs';
import prisma from "@/lib/db";
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function GET(req:NextRequest) {
  const {searchParams}=new URL(req.url);

  const page = Number(searchParams.get("page") ?? "1")
  const limit = Number(searchParams.get("limit") ?? "10")
  
  const search = searchParams.get("search")?.trim();

  const blogs = await getBlogs(search, limit, page);
  return NextResponse.json({
    data: blogs,
    pagination: {
      page,
      limit,
      nextCursor: blogs.length === limit ? page + 1 : null,
    }
  });
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const file = formData.get('image') as File | null;
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    let imagePath = '/nextjs.png';

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      const path = join(process.cwd(), 'public/uploads', filename);
      await writeFile(path, buffer);
      
      imagePath = `/uploads/${filename}`;
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        image: imagePath,
        authorId: user.id,
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
