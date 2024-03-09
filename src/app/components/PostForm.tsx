
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/lib/api';
import { IBlogPost } from '../interfaces/blogPostInterface';
import { Toaster, toast } from 'sonner';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const schema = yup.object().shape({
  author: yup.string().required('Campo requerido'),
  title: yup.string().required('Campo requerido').max(50, 'El título no debe tener más de 50 caracteres'),
  content: yup.string().required('Campo es requerido'),
});

type PropTypes = {
  blogItem: IBlogPost | null,
  setOpen: Dispatch<SetStateAction<boolean>>,
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
}

export const PostForm = ({
  blogItem,
  setOpen, 
  refetch
}: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false)
  const methods = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setValue('title', blogItem?.title || '');
    setValue('content', blogItem?.content || '');
    setValue('author', blogItem?.author || '');
  }, [blogItem]);

  const { 
    handleSubmit, 
    reset , 
    register,
    setValue,
    watch,
    formState: { errors, defaultValues } } = methods;

  const onSubmit = async(data: IBlogPost) => {
    try {
      setIsLoading(true)
      const response = await api.blogpost.createPost(data)
      refetch()
      toast.success('Publicación realizada correctamente')
      setOpen(false)
    } catch (error) {
      toast.error('Ocurrió un error, vuelva a intentar')
    } finally {
      reset()
      setIsLoading(false)
    }
  };

  const onEdit = async(data: IBlogPost) => {
    try {
      setIsLoading(true)
      const response = await api.blogpost.editPost(
        {...data, updatedAt: new Date()}, 
        String(blogItem?.id)
      )
      refetch()
      toast.success('Publicación editada correctamente')
      setOpen(false)
    } catch (error) {
      toast.error('Ocurrió un error, vuelva a intentar')
    } finally {
      reset()
      setIsLoading(false)
    }
  }; 

  return <>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(blogItem ? onEdit : onSubmit)} className='w-full flex flex-col gap-5'>
        <div className='flex flex-col justify-start gap-1 w-full box-border'>
          <label className='text-sm text-gray-300 font-light'>Título:</label>
          <input 
            {...register('title')} 
            defaultValue={defaultValues?.title}
            type='text'
            name='title'
            className="w-full bg-black rounded-xl p-2 focus:outline-none"
          />
          <p className='text-xs font-light text-red-600'>{errors.title?.message}</p>
        </div>

        <div className='flex flex-col justify-start gap-1 w-full box-border '>
          <label className='text-sm text-gray-300 font-light'>Autor:</label>
          <input 
            {...register('author')} 
            type='text'
            name='author'
            className="w-full bg-black rounded-xl p-2 focus:outline-none"
          />
          <p className='text-xs font-light text-red-600'>{errors.author?.message}</p>
        </div>

        <div className='w-full flex flex-col gap-1'>
          <label className='text-sm text-gray-300 font-light'>Contenido:</label>
          <textarea 
            {...register('content')}
            onChange={(e) => setValue('content', e.target.value)}
            className='max-h-30 bg-black rounded-xl p-2 focus:outline-none' 
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
    </FormProvider>
    <Toaster position='top-right' richColors/>
  </>

}