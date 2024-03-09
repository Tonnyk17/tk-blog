import { useRouter } from "next/navigation"
import { IBlogPost } from "../interfaces/blogPostInterface"
import { FaEdit, FaTrash } from "react-icons/fa"
import { MouseEvent, MouseEventHandler } from "react"
import { formatDate } from "@/lib/formatDate"

interface IProps extends IBlogPost {
  onEdit: () => void
  onDelete: () => void
}

export const PostCard = ({ 
    title, 
    author, 
    content, 
    id, 
    createdAt,
    updatedAt,
    onEdit, 
    onDelete 
  }: IProps) => {
  const router = useRouter()
  const textSliced = content.slice(0,70)

  const handleEdit = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onEdit()
  }

  const handleDelete = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onDelete()
  }
  
  return <>
    <div 
      onClick={() => router.push(`/blogpost/${id}`)}
      className="w-72 h-96 relative flex flex-col justify-between items-center gap-4 p-3 bg-gray-900 rounded shadow-white hover:shadow-selected cursor-pointer"
    >
      <div className="w-full flex justify-between">
        <div onClick={handleEdit}>
          <FaEdit className="hover:opacity-40"/>
        </div>
        <div onClick={handleDelete}>
          <FaTrash className="hover:opacity-40"/>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <p className="w-full text-base">{textSliced}</p>
      <div className="w-full flex flex-col gap-1">
        <span className="text-sm font-light text-gray-300">{author}</span>
        <span className="text-xs font-light text-gray-300">Creado: {createdAt ? formatDate(createdAt) : 'Desconocida'}</span>
        {updatedAt && <span className="text-xs font-light text-gray-300">Editado: {formatDate(updatedAt)}</span> }
      </div>
      
    </div>  
  </>
}
