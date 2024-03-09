import axios from 'axios'

const HOST_URL = `${process.env.NEXT_PUBLIC_HOST_URL}/api`


export default {
  blogpost : {
    getAll(params: string){
      return axios.get(`${HOST_URL}/blogpost`, { params: { search: params } })
    },
    getDetail(id: string){
      return axios.get(`${HOST_URL}/blogpost/${id}`)
    }
  }
}