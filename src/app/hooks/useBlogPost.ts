import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export const useBlogPost = (params: string) => {

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['blogpost', params],
    queryFn: async () => {
      const data = await api.blogpost.getAll(params)
      return data
    },
  })
  
  return {isLoading, isError, data, error, refetch}
}
