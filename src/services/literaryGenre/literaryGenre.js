import { http } from '../http'

const BASE_URL = 'literary-genre'

const getAllLiteraryGenre = async () => {
  const { data } = await http.get(BASE_URL)
  return data?.Data || [] 
}

const getLiteraryGenereByBook = async(id) => {
  const { data } = await http.get(`${BASE_URL}/book/${id}`)
  return data?.Data || null
}

module.exports = {
  getAllLiteraryGenre,
  getLiteraryGenereByBook
}
