import axios from 'axios'

export const URL = 'https://medinajosedev.com/flymagine/api/v1/'

export const http = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})