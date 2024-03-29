import { http, URL } from '../http'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'comment-post'

const createComment = async (comment) => {
  const { data } = await http.post(`${BASE_URL}/`, comment)
  return data
}

const getComments = async (postId) => {
  const { data } = await http.get(`${BASE_URL}/post/${postId}`)
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

const postImage = async(commentId, image) => { 
  const token = await AsyncStorage.getItem('@token')
  fetch(`${URL}${BASE_URL}/${commentId}/image`, {
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

const deleteComment = async (commentId) => {
  const response = await http.delete(`${BASE_URL}/${commentId}`)
  return response
}

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  postImage,
  deleteComment,
}