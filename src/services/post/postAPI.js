import { http } from '../http'
import { getFollows } from '../user/userAPI'

const BASE_URL = 'post'

const getPosts = async () => {
  const { data } = await http.get(`${BASE_URL}`)
  return data?.Data || null
}

const getFeed = async (users) => {
  const { data } = await http.post(`${BASE_URL}/feed`, users)
  return data || null
}

const getPostByUser = async (id) => {
  const { data } = await http.get(`${BASE_URL}/user/${id}`)
  return data || null
}

const deletePost = async (id) => {
  const { data } = await http.delete(`${BASE_URL}/${id}`)
  return data || null
}

module.exports  = {
  getPosts,
  getFeed,
  getPostByUser,
  deletePost,
}