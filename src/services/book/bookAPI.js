import { http, URL } from '../http'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'book'

const createBook = async (book) => {
  const { data } = await http.post(`${BASE_URL}`, book)
  return data
}

const getBooks = async (page = 1) => {
  const { data } = await http.get(`${BASE_URL}/page=${page}&limit=10`)
  return data?.Data || null
}

const getBookById = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}`)
  return data?.Data
}

const getGenresByIdBook = async (id) => {
  const { data } = await http.get(`${BASE_URL}/${id}/genres`)
  return data?.Data[0]?.genres || []
}

const getBooksByUser = async (id, page = 1) => {
  const { data } = await http.get(`${BASE_URL}/user=${id}/page=${page}&limit=10`)
  return data?.Data || null
}

const searchBooks = async (name, page = 1) => {
  const { data } = await http.get(`${BASE_URL}/search=${name}/page=${page}&limit=10`)
  return data?.Data || null
}

const uploadImage = async (id, image) => {
  const token = await AsyncStorage.getItem('@token')
  fetch(`${URL}${BASE_URL}/${id}/image`, {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
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

const uploadDocument = async (id, document) => {
  const token = await AsyncStorage.getItem('@token')
  fetch(`${URL}${BASE_URL}/${id}/document`, {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
    body: document
  }).then(response => {
    response.text().then((res) => {
      return res
    })
  }).catch(err => {
    return err
  })
}

const setLiteraryGenres = async (id, genres) => {
  const { data } = await http.post(`${BASE_URL}/${id}/genres`, genres)
  return data
}

const updateBook = async (id, book) => {
  const { data } = await http.put(`${BASE_URL}/${id}`, book)
  return data
}

const deleteBook = async (id) => {
  const { data } = await http.delete(`${BASE_URL}/${id}`)
  return data
}

module.exports = {
  createBook,
  getBooks,
  getBookById,
  getGenresByIdBook,
  searchBooks,
  getBooksByUser,
  uploadImage,
  uploadDocument,
  setLiteraryGenres,
  updateBook,
  deleteBook
}