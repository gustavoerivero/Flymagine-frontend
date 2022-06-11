import { http } from './http'

const BASE_URL = 'user'

const registerUser = async (data) => {
  const response = await http.post(`${BASE_URL}/`, data)
  return response.data
}

const login = async (form = {}) => {
  const { data } = await http.post(`${BASE_URL}/login`, form)
  return data
}

const restorePassword = async (email) => {
  await fetch(`https://flymagine-backend.herokuapp.com/flymagine/api/v1/user/restored/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    response.text().then((res) => {
      return res
    })
  }).catch(err => {
    return err
  })
}

module.exports = {
  // User
  registerUser,
  login,
  restorePassword

}
