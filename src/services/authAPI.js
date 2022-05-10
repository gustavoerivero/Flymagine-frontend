import { http } from './http'

const BASE_URL = 'user'

export const authAPI = {
  register: async (form = {}) => {
    let {
      firstName,
      lastName,
      email,
      password,
      photo,
      biography,
      address,
      phone,
      birthday,
    } = form

    const [year, month, day] = new Date(birthday)
      ?.toISOString()
      ?.split('T')[0]
      .split('-')

    const { data } = await http.post(BASE_URL, {
      firstName,
      lastName,
      email,
      password,
      photo,
      biography,
      address,
      phone,
      birthday: `${day}/${month}/${year}`,
    })
    return data
  },
  login: async (form = {}) => {
    const { data } = await http.post(BASE_URL + '/login', form)
    return data
  },
  requestPasswordReset: async (form) => {
    const { data } = await http.post('passwordreset', form)
    return data
  },
}