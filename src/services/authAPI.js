import { http } from './http'

const BASE_URL = 'user'

export const authAPI = {
  register: async (form = {}) => {
    let {
      firstName,
      lastName,
      phone,
      address,
      birthday,
      email,
      password,
      biography,
      idRole
    } = form

    const [year, month, day] = new Date(birthday)
      ?.toISOString()
      ?.split('T')[0]
      ?.split('-')

    const { data } = await http.post(BASE_URL, {
      firstName,
      lastName,
      phone,
      address,
      birthday: `${day}/${month}/${year}`,
      email,
      password,
      biography,
      idRole      
    })
    return data
  },
  login: async (form = {}) => {
    const { data } = await http.post(`${BASE_URL}/login`, form)
    return data
  },
  requestPasswordReset: async (form) => {
    const { data } = await http.post('passwordreset', form)
    return data
  },
  setPreferences: async (id, preference) => {
    const { data } = await http.post(`${BASE_URL}/${id}/set-preference`, preference)
    return data
  }
}