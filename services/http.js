import axios from 'axios'

export const BASE_URL = 'http://localhost:3000/'

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})