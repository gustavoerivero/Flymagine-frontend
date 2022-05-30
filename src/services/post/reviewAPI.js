import { http } from '../http'

const BASE_URL = 'review'

const createReview = async (review) => {
  const { data } = await http.post(`${BASE_URL}/`, review)
  return data
}

const getReviews = async () => {
  const { data } = await http.get(`${BASE_URL}`)
  return data?.Data || null
}

const getReviewById = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}`)
  return data?.Data || null
}

const getReviewByUser = async (id) => {
  const { data } = await http.get(`${BASE_URL}/user/${id}`)
  return data?.Data || []
}

const getReviewByBook = async (id) => {
  const { data } = await http.get(`${BASE_URL}/book/${id}`)
  return data?.Data || null
}

const updateReview = async (id, review) => {
  const { data } = await http.put(`${BASE_URL}/${id}`, review)
  return data?.Data || null
}

const deleteReview = async (id) => {
  const { data } = await http.delete(`${BASE_URL}/${id}`)
  return data || null
}

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  getReviewByUser,
  getReviewByBook,
  updateReview,
  deleteReview,
}