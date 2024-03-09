import axios from 'axios'
import { IBlogPost } from '@/app/interfaces/blogPostInterface'

const HOST_URL = `${process.env.NEXT_PUBLIC_HOST_URL}/api`

export default {
  blogpost : {
    getAll(params: string){
      return axios.get(`${HOST_URL}/blogpost`, { params: { search: params } })
    },
    getDetail(id: string){
      return axios.get(`${HOST_URL}/blogpost/${id}`)
    },
    createPost(data: IBlogPost){
      return axios.post(`${HOST_URL}/blogpost`, data)
    },
    deletePost(id: string){
      return axios.delete(`${HOST_URL}/blogpost/${id}`)
    },
    editPost(data: IBlogPost, id: string){
      return axios.put(`${HOST_URL}/blogpost/${id}`, data)
    }
  }
}