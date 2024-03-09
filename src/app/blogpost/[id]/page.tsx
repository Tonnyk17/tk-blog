'use client'

import { PostDetail } from "@/app/components/PostDetail";
import { useBlogPost } from "@/app/hooks/useBlogPost";
import { useState } from "react";

export default function BlogPostDetail() {
  const [filters, setFilters] = useState('')
  const { data, isLoading } = useBlogPost(filters);

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-10">
      <PostDetail/>
    </main>
  );
}