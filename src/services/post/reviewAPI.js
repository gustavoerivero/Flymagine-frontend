import { http } from '../http'

const BASE_URL = 'review'

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
  return data?.Data || null
}

const getReviewByBook = async (id) => {
    const { data } = await http.get(`${BASE_URL}/book/${id}`)
    return data?.Data || null
}

const deleteReview = async (id) => {
  const { data } = await http.delete(`${BASE_URL}/${id}`)
  return data || null
}



module.exports  = {
    getReviews,
    getReviewByUser,
    deleteReview,
    getReviewByBook,

}