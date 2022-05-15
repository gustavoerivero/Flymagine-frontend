import { http } from "../http"

const BASE_URL = 'user'

const getOnlyUser = async (id) => {
  const {data} = await http.get(`${BASE_URL}/${id}/only`)
  return data
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

module.exports  = {
  getOnlyUser,
  getUserById,
  updateUser,

  setPreferences,
  getPreferences,
}