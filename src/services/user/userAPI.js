import { http } from "../http"

const BASE_URL = 'user'

const getUserById = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}`)
  return data
}

module.exports  = {
  getUserById
}