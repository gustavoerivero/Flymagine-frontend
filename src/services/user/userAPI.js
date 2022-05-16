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

const setPreferences = async (id, data) => {
  const response = await http.post(`${BASE_URL}/${id}/preferences`, data)
  return response.data
}

const getPreferences = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}/preferences`)
  return data?.Data[0]?.genres || []
}

module.exports = {
  getOnlyUser,
  getUserById,
  updateUser,
  setProfileImage,

  setPreferences,
  getPreferences,
}