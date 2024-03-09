'use client'

import { PostCard } from "@/app/components/PostCard";
import { SearchBar } from "@/app/components/SearchBar";
import { IconButton } from "@/app/components/IconButton";
import { useBlogPost } from "@/app/hooks/useBlogPost";
import { IBlogPost } from "@/app/interfaces/blogPostInterface";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CardSkeleton } from "./components/skeletons/CardSkeleton";
import { Modal } from "./components/Modal";
import { PostForm } from "./components/PostForm";
import api from "@/lib/api";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [filters, setFilters] = useState('')
  const [selected, setSelected] = useState<IBlogPost | null>(null)
  const [open, setOpen] = useState(false) 
  const { data, isLoading, refetch } = useBlogPost(filters);

  const handleEdit = (item: IBlogPost) => {
    setSelected(item)
    setOpen(true)
  }

  const handleDelete = async(id: string) => {
    try {
      const response = await api.blogpost.deletePost(id)
      toast.success('Publicación eliminada')
      refetch()
    } catch (error) {
      toast.error('Ocurrió un error al eliminar la publicación')
    }
  } 

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-10">
      <div className="w-full flex justify-center items-center gap-4">
        <SearchBar setFilters={setFilters} />
        <IconButton onClick={() => setOpen(true)}>
          <FaPlus/>
        </IconButton>
      </div>
      <div className="w-3/4 max-md:w-full flex justify-center flex-wrap gap-10">
        {
          !isLoading && data ?
            data?.data?.map((item:IBlogPost, i: number) => <div key={i}>
                <PostCard 
                  {...item} 
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item.id || '')}
                />
              </div>
            )
          :
            Array.from({ length: 3 }, (_, index) => <CardSkeleton key={index} />)
        }
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
      >
        <PostForm
          setOpen={setOpen}
          title={selected?.title}
          author={selected?.author}
          content={selected?.content}
          id={selected?.id}
        />
      </Modal>
      <Toaster richColors/>
    </main>
  );
}
