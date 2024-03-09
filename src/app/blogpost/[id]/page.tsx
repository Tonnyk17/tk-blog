'use client'

import { IconButton } from "@/app/components/IconButton";
import { PostDetail } from "@/app/components/PostDetail";
import { PostDetailSkeleton } from "@/app/components/skeletons/PostDetailSkeleton";
import { useBlogPostDetail } from "@/app/hooks/useBlogPost";
import { useParams, useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

export default function BlogPostDetail() {
  const router = useRouter()
  const { id } = useParams()
  const { data, isLoading } = useBlogPostDetail(id as string);

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-10 px-6">
      <IconButton onClick={() => router.push('/')}>
        <FaHome className="w-6 h-6"/>
      </IconButton>
      {!isLoading ?
          <PostDetail {...data?.data}/>
        :
          <PostDetailSkeleton/>
      }
    </main>
  );
}