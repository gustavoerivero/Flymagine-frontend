import { http } from '../http'

const POST_URL = (id) => {
  return `post/${id}/reaction`
}

const REVIEW_URL = (id) => {
  return `review/${id}/reaction`
}

const postReactionsByPost = async (id, reactions) => {
  const { data } = await http.post(`${POST_URL(id)}`, reactions)
  return data || null
}

const getReactionsByPost = async (id) => {
  const { data } = await http.get(`${POST_URL(id)}`)
  return data || []
}

const postReactionsByReview = async (id, reactions) => {
  const { data } = await http.post(`${REVIEW_URL(id)}`, reactions)
  return data || null
}

const getReactionsByReview = async (id) => {
  const { data } = await http.get(`${REVIEW_URL(id)}`)
  return data || []
}


module.exports  = {
  postReactionsByPost,
  getReactionsByPost,
  postReactionsByReview,
  getReactionsByReview,
}