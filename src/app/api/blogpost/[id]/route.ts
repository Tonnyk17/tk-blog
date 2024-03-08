import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const blogItem = await prisma.post.findFirst({
      where: {
        id: params.id
      }
    })
    
    if(!blogItem) return NextResponse.json(
      {
        message: "Blog item Not Found"
      }, 
      {
        status: 404
      }
    )

    return NextResponse.json(blogItem)

  } catch (error) {

    if(error instanceof Error) {
      return NextResponse.json(
      {
        error: error.message,
      }, {
        status: 500
      })
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedItem = await prisma.post.delete({
      where: {
        id: params.id
      }
    })
    
    return NextResponse.json({
      message: "Deleted successfully",
      deletedItem
    })

  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === "P2025") return NextResponse.json(
        {
          message: "Blog item Not Found"
        }, 
        {
          status: 404
        }
      )

      return NextResponse.json(
      {
        error: error.message,
      }, {
        status: 500
      })
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
 try {
    const { title, author, content, published } = await request.json() 
    const updatedItem = await prisma.post.update({
      where: {
        id: params.id
      },
      data: {
        title,
        content,
        author,
        published
      }
    })
    
    return NextResponse.json({
      message: "Deleted successfully",
      updatedItem
    })

  } catch (error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === "P2025") return NextResponse.json(
        {
          message: "Blog item Not Found"
        }, 
        {
          status: 404
        }
      )

      return NextResponse.json(
      {
        error: error.message,
      }, {
        status: 500
      })
    }
  }
}