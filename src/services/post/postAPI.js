import { http } from '../http'

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

// Hashtag Post API

const setHashtags = async (postId, hashtags) => {
  const { data } = await http.post(`${BASE_URL}/${postId}/hashtag`, hashtags)
  return data || null
}

const getHashtags = async (postId) => {
  const { data } = await http.get(`${BASE_URL}/${postId}/hashtag`)
  return data?.Data[0]?.hashtags || null
}

// Usertags Post API

const setUsertags = async (postId, usertags) => {
  const { data } = await http.post(`${BASE_URL}/${postId}/usertag`, usertags)
  return data || null
}

const getUsertags = async (postId) => {
  const { data } = await http.get(`${BASE_URL}/${postId}/usertag`)
  return data?.Data[0]?.users || null
}


module.exports = {
  getPosts,
  getFeed,
  getPostByUser,
  deletePost,

  // Hashtag Post API
  setHashtags,
  getHashtags,

  // Usertags Post API
  setUsertags,
  getUsertags,
}