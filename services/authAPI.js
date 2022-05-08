import { http } from './http'

const BASE_URL = 'user'

export const authAPI = {
  register: async (form = {}) => {
    let {
      email,
      password,
      firstName,
      lastName,
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
      phone,
      password,
      email,
      birthday: `${month}/${day}/${year}`,
    })
    return data
  },
  login: async (form = {}) => {
    const { data } = await http.post('auth/login', form)
    return data
  },
  requestPasswordReset: async (form) => {
    const { data } = await http.post('passwordreset', form)
    return data
  },
}