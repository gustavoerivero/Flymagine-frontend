import { http } from "../http"

const BASE_URL = 'book'

const createBook = async (book) => {
  const { data } = await http.post(`${BASE_URL}`, book)
  return data
}

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
  return data?.Data[0]?.genres || []
}

const getBooksByUser = async (id) => {
  const { data } = await http.get(`${BASE_URL}/user/${id}`)
  return data?.Data || []
}

const searchBooks = async (name) => {
  const { data } = await http.get(`${BASE_URL}/search/${name}`)
  return data?.Data || []
}

const uploadImage = async (id, image) => {
  fetch(`https://medinajosedev.com/flymagine/api/v1/${BASE_URL}/${id}/image`, {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
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
  fetch(`https://medinajosedev.com/flymagine/api/v1/${BASE_URL}/${id}/document`, {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
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
}