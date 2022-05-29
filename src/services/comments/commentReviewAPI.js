import { http } from '../http'

const BASE_URL = 'comment-review'

const createComment = async (comment) => {
  const { data } = await http.post(`${BASE_URL}/`, comment)
  return data?.Data
}

const getComments = async (reviewId) => {
  const { data } = await http.get(`${BASE_URL}/review/${reviewId}`)
  return data?.Data || []
}

const getComment = async (commentId) => {
  const { data } = await http.get(`${BASE_URL}/${commentId}`)
  return data?.Data
}

const updateComment = async (commentId, comment) => {
  const response = await http.put(`${BASE_URL}/${commentId}`, comment)
  return response
}

const deleteComment = async (commentId) => {
  const response = await http.delete(`${BASE_URL}/${commentId}`)
  return response
}

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
}