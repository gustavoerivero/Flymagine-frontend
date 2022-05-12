import { http } from '../http'

const BASE_URL = 'literary-genre'

const getAllLiteraryGenre = async () => {
  const { data } = await http.get(BASE_URL)
  return data?.Data || [] 
}

module.exports = {
  getAllLiteraryGenre,
}
