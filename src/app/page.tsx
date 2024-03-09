'use client'

import { PostCard } from "@/app/components/PostCard";
import { SearchBar } from "@/app/components/SearchBar";
import { IconButton } from "@/app/components/IconButton";
import { useBlogPost } from "@/app/hooks/useBlogPost";
import { IBlogPost } from "@/app/interfaces/blogPostInterface";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CardSkeleton } from "./components/skeletons/CardSkeleton";

export default function Home() {
  const [filters, setFilters] = useState('')
  const { data, isLoading } = useBlogPost(filters);

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-10">
      <div className="w-full flex justify-center items-center gap-4">
        <SearchBar setFilters={setFilters} />
        <IconButton
          onClick={() => console.log('Hello')}
        >
          <FaPlus/>
        </IconButton>
      </div>
      <div className="w-3/4 max-md:w-full flex justify-center flex-wrap gap-10">
        {
          !isLoading ?
            data?.data?.map((item:IBlogPost, i: number) => <PostCard key={i} {...item}/>)
          :
            Array.from({ length: 3 }, (_, index) => <CardSkeleton key={index} />)
        }
      </div>
    </main>
  );
}
