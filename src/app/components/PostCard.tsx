import { useRouter } from "next/navigation"
import { IBlogPost } from "../interfaces/blogPostInterface"

export const PostCard = ({ title, author, content, id }: IBlogPost) => {
  const router = useRouter()
  const textSliced = content.slice(0,70)
  return <>
    <div 
      onClick={() => router.push(`/blogpost/${id}`)}
      className="w-72 h-80 flex flex-col justify-between items-center gap-4 p-3 bg-gray-900 rounded shadow-white hover:shadow-selected cursor-pointer"
    >
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <p className="w-full text-base">{textSliced}</p>
      <div className="w-full flex flex-col gap-1">
        <span className="text-sm font-light text-gray-300">{author}</span>
        <span className="text-xs font-light text-gray-300">Creado: 20/11/2024</span>
        <span className="text-xs font-light text-gray-300">Editado: 20/11/2024</span>
      </div>
    </div>  
  </>
}
