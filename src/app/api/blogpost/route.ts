import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request: Request) {
  const {searchParams }= new URL(request.url)
  const search = searchParams.get('search')
  
  try {
    let filters = {};

    if(search) {
      filters = {
          OR: [
          { title: { contains: search, mode: 'insensitive'} },
          { author: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ]
      }
    }

    const blogList = await prisma.post.findMany({
      where: filters
    })

    return NextResponse.json(blogList)

  } catch (error) {
    if(error instanceof Error) {
      return NextResponse.json(
      {
        error: error.message,
        cause: error.cause
      }, {
        status: 500
      })
    }
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, author } = await request.json()
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author
      }
    })

    return NextResponse.json(newPost)
  } catch (error) {
    if(error instanceof Error) {
      return NextResponse.json(
      {
        error: error.message,
        cause: error.cause
      }, {
        status: 500
      })
    }
  }
}