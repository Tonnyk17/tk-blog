'use client'

import { PostCard } from "@/app/components/PostCard";
import { SearchBar } from "@/app/components/SearchBar";
import { IconButton } from "@/app/components/IconButton";
import { useBlogPost } from "@/app/hooks/useBlogPost";
import { IBlogPost } from "@/app/interfaces/blogPostInterface";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CardSkeleton } from "./components/skeletons/CardSkeleton";
import { Modal } from "./components/Modal";
import { PostForm } from "./components/PostForm";
import api from "@/lib/api";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filters, setFilters] = useState('')
  const [selected, setSelected] = useState<IBlogPost | null>(null)
  const [open, setOpen] = useState(false) 
  const { data, isLoading, refetch } = useBlogPost(filters);

  const handleEdit = (item: IBlogPost) => {
    if(!isOnline){
      toast.error("No es posible hacer cambios hasta que se reestablezca la conexión a la Red")
      return
    }
    setSelected(item)
    setOpen(true)
  }

  const handleDelete = async(id: string) => {
    try {
      if(!isOnline) throw new Error("No es posible hacer cambios hasta que se reestablezca la conexión a la Red")
      
      const response = await api.blogpost.deletePost(id)
      toast.success('Publicación eliminada')
      refetch()

    } catch (error) {
      if(error instanceof Error) {
        toast.error(error?.message)
      }
    }
  } 

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Se ha reestablecido la conexión con la Red")
      refetch();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Se ha perdido la conexión con la Red")
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refetch]);

  console.log(isOnline)

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-10">
      <div className="w-full flex justify-center items-center gap-4">
        <SearchBar setFilters={setFilters} />
        {isOnline &&
          <IconButton onClick={() => setOpen(true)}>
            <FaPlus/>
          </IconButton>
        }
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
      <Toaster richColors position="top-right"/>
    </main>
  );
}
