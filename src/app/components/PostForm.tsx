
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/lib/api';
import { IBlogPost } from '../interfaces/blogPostInterface';
import { Toaster, toast } from 'sonner';
import { Dispatch, SetStateAction, useState } from 'react';

const schema = yup.object().shape({
  author: yup.string().required('Campo requerido'),
  title: yup.string().required('Campo requerido').max(50, 'El título no debe tener más de 50 caracteres'),
  content: yup.string().required('Campo es requerido'),
});

type PropTypes = {
  id?: string,
  title?: string,
  author?: string,
  content?: string,
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const PostForm = ({title, author, content, setOpen, id}: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false)

  const { 
    handleSubmit, 
    control, 
    reset , 
    watch,
    formState: { errors } } = useForm<IBlogPost>({
      resolver: yupResolver(schema),
      defaultValues: {
        title,
        author,
        content
      }
  });
  console.log(watch())
  const onSubmit = async(data: IBlogPost) => {
    try {
      setIsLoading(true)
      const response = await api.blogpost.createPost(data)
      toast.success('Publicación realizada correctamente')
      reset()
      setOpen(false)
    } catch (error) {
      toast.error('Ocurrió un error, vuelva a intentar')
    } finally {
      setIsLoading(false)
    }
  };

  return <>
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-5'>
      <div className='flex flex-col justify-start gap-1 w-full box-border'>
        <label className='text-sm text-gray-300 font-light'>Título:</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <input {...field} className="w-full bg-black rounded-xl p-2 focus:outline-none"/>}
        />
        <p className='text-xs font-light text-red-600'>{errors.title?.message}</p>
      </div>

      <div className='flex flex-col justify-start gap-1 w-full box-border '>
        <label className='text-sm text-gray-300 font-light'>Autor:</label>
        <Controller
          name="author"
          control={control}
          render={({ field }) => <input {...field} className="w-full bg-black rounded-xl p-2 focus:outline-none"/>}
        />
        <p className='text-xs font-light text-red-600'>{errors.author?.message}</p>
      </div>

      <div className='w-full flex flex-col gap-1'>
        <label className='text-sm text-gray-300 font-light'>Contenido:</label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => <textarea {...field} className='max-h-30 bg-black rounded-xl p-2 focus:outline-none' />}
        />
        <p className='text-xs font-light text-red-600'>{errors.content?.message}</p>
      </div>

      <div className='w-full flex justify-end'>
        <button 
          disabled={isLoading} 
          className={`${isLoading ? 'bg-gray-600' : 'bg-white'} hover:bg-gray-400 text-black w-40 p-1 rounded-md`} 
          type="submit"
        >
          Publicar
        </button>
      </div>
    </form>
    <Toaster position='top-right' richColors/>
  </>

}