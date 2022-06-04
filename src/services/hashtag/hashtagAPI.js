import { http } from '../http'

const BASE_URL = 'hashtag'

const createHashtag = async (hashtag) => {
  const { data } = await http.post(`${BASE_URL}`, hashtag)
  return data?.Data
}

const getHashtag = async (hashtagId) => {
  const { data } = await http.get(`${BASE_URL}/id/${hashtagId}`)
  return data?.Data 
}

const getHashtagByName = async (hashtagName) => {
  const { data } = await http.get(`${BASE_URL}/${hashtagName}`)
  return data?.Data
}

const getAllHashtags = async () => {
  const { data } = await http.get(BASE_URL)
  return data?.Data || []
}

const searchHashtag = async (hashtagName) => {
  const { data } = await http.get(`${BASE_URL}/search/${hashtagName}`)
  return data?.Data || []
}

const updateHashtag = async (hashtagId, hashtag) => {
  const response = await http.put(`${BASE_URL}/id/${hashtagId}`, hashtag)
  return response
}

const deleteHashtag = async (hashtagId) => {
  const response = await http.delete(`${BASE_URL}/id/${hashtagId}`)
  return response
}

module.exports = {
  createHashtag,
  getHashtag,
  getHashtagByName,
  getAllHashtags,
  searchHashtag,
  updateHashtag,
  deleteHashtag,
}
