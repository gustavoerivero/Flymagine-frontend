import { http } from "../http"

const BASE_URL = 'book'

const getBooks = async () => {
    const { data } = await http.get(`${BASE_URL}`)
    return data?.Data
  }
  
  const getBookById = async (id) => {
    const { data } = await http.get(`${BASE_URL}/${id}`)
    return data?.Data
  }

module.exports  = {
    getBooks,
    getBookById,
}