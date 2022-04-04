const baseApi = 'https://c09e788e-186f-40bb-8e9a-7ccce6e457a7.mock.pstmn.io'
const basicAuthApi = 'Basic 12345678'

const fetchData = async (url, method, data, auth=null) => {

  let jsonFetch = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth === null ? basicAuthApi : auth,
    }
  }
  if(data)
    jsonFetch = {
      ...jsonFetch,
      body: JSON.stringify(data)
    }

  const response = await fetch(url, jsonFetch)
  if(!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }
  return await response.json()
}

export default {
  getPosts: async (method) => {
    const url = `${baseApi}/posts`
    const data = {
      
    }
    return await fetchData(url, 'GET')
  },
  baseApi,
  basicAuthApi,
}