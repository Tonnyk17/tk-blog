import { IBlogPost } from "../interfaces/blogPostInterface"

export const PostDetail = ({ title, author, content, createdAt, updatedAt}: IBlogPost) => {
  return <>
    <article className="max-md:w-full min-h-[500px] rounded-md w-1/2 flex flex-col items-center justify-between gap-10 bg-gray-900 p-5">
      <div className="w-full flex flex-col items-center gap-10">
        <h1 className="first-letter:uppercase text-5xl font-semibold">
          {title}
        </h1>
        <p className="text-lg">
          {content}
        </p>
      </div>
      <div className="w-full flex justify-between items-end">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-light text-gray-300">Fecha de edición: {author}</span>
        <span className="text-sm font-light text-gray-300">Fecha de publicación: {author}</span> 
      </div>
      <span className="text-sm font-light text-gray-300 first-letter:uppercase">{author}</span>
      </div>
    </article>
  </>
}