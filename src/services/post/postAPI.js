import { http, URL } from '../http'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'post'

const createPost = async (post) => {
  const { data } = await http.post(`${BASE_URL}`, post)
  return data?.Data
}

const postImage = async (postId, image) => {
  const token = await AsyncStorage.getItem('@token')
  fetch(`${URL}${BASE_URL}/${postId}/image`, {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
    body: image
  }).then(response => {
    response.text().then((res) => {
      return res
    })
  }).catch(err => {
    return err
  })
}

const getPostById = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}`)
  return data?.Data
}

const getPosts = async (page) => {
  const { data } = await http.get(`${BASE_URL}/page=${page}&limit=10`)
  return data?.Data || null
}

const getFeed = async (users, page = 1) => {
  const { data } = await http.post(`${BASE_URL}/feed/page=${page}&limit=10`, users)
  return data?.Data || null
}

const getPostByUser = async (id, page = 1) => {
  const { data } = await http.get(`${BASE_URL}/user/${id}/page=${page}&limit=10`)
  return data?.Data || null
}

const searchPostByHashtags = async (hashtags, page = 1) => {
  const { data } = await http.post(`${BASE_URL}/hashtags/page=${page}&limit=10`, hashtags)
  return data?.Data || null
}

const updatePost = async (id, post) => {
  const { data } = await http.put(`${BASE_URL}/${id}`, post)
  return data?.Data
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
  createPost,
  postImage,
  getPosts,
  getPostById,
  getFeed,
  getPostByUser,
  updatePost,
  deletePost,

  searchPostByHashtags,

  // Hashtag Post API
  setHashtags,
  getHashtags,

  // Usertags Post API
  setUsertags,
  getUsertags,
}