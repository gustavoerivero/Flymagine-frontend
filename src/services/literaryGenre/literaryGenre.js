import { http } from '../http'

const BASE_URL = 'literary-genre'

export const literaryGenreAPI = {
  getAll: async () => {
    const { data } = await http.get(BASE_URL)
    return data?.Data || []
  },
}
