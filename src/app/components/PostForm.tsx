
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@/lib/api';
import { IBlogPost } from '../interfaces/blogPostInterface';

const schema = yup.object().shape({
  author: yup.string().required('El autor es requerido'),
  title: yup.string().required('El título es requerido'),
  content: yup.string().required('El contenido es requerido'),
});

export const PostForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data: IBlogPost) => {
    try {
      const response = await api.blogpost.createPost(data)
      console.log(response)
    } catch (error) {
      
    }
  };

  return <>
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-5'>
      <div className='w-full flex justify-between gap-4 flex-wrap px-4'>
        <div className='flex flex-col justify-start gap-1 w-full max-w-80 box-border '>
          <label className='text-sm text-gray-300 font-light'>Autor:</label>
          <Controller
            name="author"
            control={control}
            render={({ field }) => <input {...field} className="w-full bg-black rounded-xl p-2 focus:outline-none"/>}
          />
          <p className='text-xs font-light text-red-600'>{errors.author?.message}</p>
        </div>

        <div className='flex flex-col justify-start gap-1 w-full max-w-80 box-border'>
          <label className='text-sm text-gray-300 font-light'>Título:</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input {...field} className="w-full bg-black rounded-xl p-2 focus:outline-none"/>}
          />
          <p className='text-xs font-light text-red-600'>{errors.title?.message}</p>
        </div>
      </div>

      <div className='w-full flex flex-col px-4 gap-1'>
        <label className='text-sm text-gray-300 font-light'>Contenido:</label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => <textarea {...field} className='max-h-20 bg-black rounded-xl p-2 focus:outline-none' />}
        />
        <p className='text-xs font-light text-red-600'>{errors.content?.message}</p>
      </div>

      <button className='bg-black' type="submit">Enviar</button>
    </form>
  </>
}