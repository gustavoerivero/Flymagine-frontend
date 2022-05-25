import { http } from '../http'

const BASE_URL = 'user'

const getOnlyUser = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}/only`)
  return data
}

const setProfileImage = async (id, image) => {
  fetch(`https://flymagine-backend.herokuapp.com/api/v1/${BASE_URL}/${id}/image`, {
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

const getUserById = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}`)
  return data
}

const updateUser = async (id, values) => {
  const { data } = await http.put(`${BASE_URL}/${id}`, values)
  return data
}

const changeUserPassword = async (id, values) => {
  const { data } = await http.post(`${BASE_URL}/${id}/password`, values)	
  return data
}

const setPreferences = async (id, data) => {
  const response = await http.post(`${BASE_URL}/${id}/preferences`, data)
  return response.data
}

const getPreferences = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}/preferences`)
  return data?.Data[0]?.genres || []
}

const setFollowsByUser = async (id, follows) => {
  const { data } = await http.post(`${BASE_URL}/${id}/follows`, follows)
  return data
}

const getFollows = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}/follows`)
  return data || []
}

const getFollowers = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}/followers`)
  return data
}

const searchUsers = async (search) => {
  const { data } = await http.get(`${BASE_URL}/search/${search}`)
  return data
}

const searchUsersNoLimits = async (search) => {
  const { data } = await http.get(`${BASE_URL}/search-users/${search}`)
  return data
}

module.exports = {
  getOnlyUser,
  getUserById,
  updateUser,
  changeUserPassword,
  setProfileImage,

  setPreferences,
  getPreferences,

  setFollowsByUser,
  getFollows,
  getFollowers,

  searchUsers,
  searchUsersNoLimits,
}