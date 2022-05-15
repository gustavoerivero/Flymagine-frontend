import { http } from './http'

const BASE_URL = 'user'

const registerUser = async (data) => {
  const response = await http.post(`${BASE_URL}/`, data)
  return response.data
}

const login = async (form = {}) => {
  const { data } = await http.post(`${BASE_URL}/login`, form)
  return data
}



module.exports = {
  // User
  registerUser,
  login,

}
