import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
  try {
    const blogList = await prisma.post.findMany()
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