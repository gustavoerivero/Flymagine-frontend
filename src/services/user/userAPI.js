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

module.exports  = {
  getOnlyUser,
  getUserById
}