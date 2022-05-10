import axios from 'axios'

export const BASE_URL = 'https://flymagine-backend.herokuapp.com/'

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})