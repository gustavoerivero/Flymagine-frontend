import { http } from '../http'

const BASE_URL = 'post'

const createPost = async (post) => {
  const { data } = await http.post(`${BASE_URL}`, post)
  return data?.Data
}

const postImage = async (postId, image) => {
  fetch(`https://flymagine-backend.herokuapp.com/api/v1/${BASE_URL}/${postId}/image`, {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
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

  // Hashtag Post API
  setHashtags,
  getHashtags,

  // Usertags Post API
  setUsertags,
  getUsertags,
}