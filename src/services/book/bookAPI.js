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

const getGenresByIdBook = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}/genres`)
  return data?.Data
}

const searchBooks = async (name) => {
  const { data } = await http.get(`${BASE_URL}/search/${name}`)
  return data?.Data || []
}

module.exports = {
  getBooks,
  getBookById,
  getGenresByIdBook,
  searchBooks,
}