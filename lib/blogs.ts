import prisma from "@/lib/db";

export async function getBlogs(search?: string, limit: number = 10, page: number = 1) {
  const where = search ? {
    OR: [
      { title: { contains: search } },
      { content: { contains: search } },
      { author: { name: { contains: search } } },
    ]
  } : {};

  const blogs = await prisma.blog.findMany({
    where,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      id: 'desc', // order by newest (assuming id is auto-increment or cuid)
    }
  });

  return blogs;
}
