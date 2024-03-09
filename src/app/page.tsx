'use client'

import { PostCard } from "./components/PostCard";
import { SearchBar } from "./components/SearchBar";
import { IconButton } from "./components/IconButton";
import { useBlogPost } from "./hooks/useBlogPost";
import { IBlogPost } from "./interfaces/blogPostInterface";

export default function Home() {
  const { data, isLoading } = useBlogPost('')

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-10">
      <div className="w-full flex justify-center items-center gap-4">
        <SearchBar/>
        <IconButton/>
      </div>
      <div className="w-3/4 max-md:w-full flex justify-center flex-wrap gap-10">
        {
          !isLoading ?
            data?.data?.map((item: IBlogPost, i: number) => <PostCard key={i} {...item} />)
          :
            <div>Loading...</div>
        }
      </div>
    </main>
  );
}
