import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';
import prisma from '@/lib/db';
import { DeepMockProxy } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';

vi.mock('@/lib/db', async () => {
  const { mockDeep } = await import('vitest-mock-extended');
  return {
    __esModule: true,
    default: mockDeep(),
  };
});

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe('GET /api/blogs', () => {
  it('should return a list of blogs with pagination', async () => {
    // Arrange: Mock the database response
    const mockBlogs = [
      {
        id: 1,
        title: 'Test Blog 1',
        content: 'Content 1',
        image: '/img1.png',
        authorId: 1,
        author: { name: 'Author 1' }
      },
      {
        id: 2,
        title: 'Test Blog 2',
        content: 'Content 2',
        image: '/img2.png',
        authorId: 2,
        author: { name: 'Author 2' }
      }
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prismaMock.blog.findMany.mockResolvedValue(mockBlogs as any);

    const req = new NextRequest('http://localhost:3000/api/blogs?page=1&limit=2');

    // Act
    const res = await GET(req);
    const json = await res.json();

    // Assert
    expect(res.status).toBe(200);
    expect(json.data).toEqual(mockBlogs);
    expect(json.pagination).toEqual({
      page: 1,
      limit: 2,
      nextCursor: 2 // length === limit, so page + 1
    });
    
    expect(prismaMock.blog.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.blog.findMany).toHaveBeenCalledWith({
      where: {},
      include: { author: { select: { name: true } } },
      take: 2,
      skip: 0,
      orderBy: { id: 'desc' }
    });
  });

  it('should filter blogs based on search query', async () => {
    // Arrange
    prismaMock.blog.findMany.mockResolvedValue([]);
    const req = new NextRequest('http://localhost:3000/api/blogs?search=react');

    // Act
    const res = await GET(req);
    await res.json();

    // Assert
    expect(prismaMock.blog.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { title: { contains: 'react' } },
          { content: { contains: 'react' } },
          { author: { name: { contains: 'react' } } }
        ]
      },
      include: { author: { select: { name: true } } },
      take: 10,
      skip: 0,
      orderBy: { id: 'desc' }
    });
  });
});
