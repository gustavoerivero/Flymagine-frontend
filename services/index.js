import axios from 'axios'

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
  baseApi,
  basicAuthApi,
}