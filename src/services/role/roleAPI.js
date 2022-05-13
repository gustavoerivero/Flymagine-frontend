import { http } from '../http'

const BASE_URL = 'role'

const getRole = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}`)
  return data?.Data?.name || null
}

module.exports  = {
  getRole
}