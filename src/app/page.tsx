import Image from "next/image";
import { PostCard } from "./components/PostCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PostCard/>
    </main>
  );
}
