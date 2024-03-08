'use client'

import { PostCard } from "./components/PostCard";
import { SearchBar } from "./components/SearchBar";
import { IconButton } from "./components/IconButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-10">
      <div className="w-full flex justify-center items-center gap-4">
        <SearchBar/>
        <IconButton/>
      </div>
      <div className="w-3/4 max-md:w-full flex justify-center flex-wrap gap-10">
        <PostCard/>
        <PostCard/>
      </div>
    </main>
  );
}
