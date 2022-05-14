import { http } from '../http'

const BASE_URL = (id) => {
  return `post/${id}/reaction`
}

const postReactionsByPost = async (id, reactions) => {
  const { data } = await http.post(`${BASE_URL(id)}`, reactions)
  return data || null
}

const getReactionsByPost = async (id) => {
  const { data } = await http.get(`${BASE_URL(id)}`)
  return data || null
}

module.exports  = {
  postReactionsByPost,
  getReactionsByPost,
}