import axios from 'axios'
const getToken = function() {
  if (process.server) {
    // server side
    return
  }
  if (window.$nuxt) {
    return window.$nuxt.$auth.getToken('local')
  }
}

export async function request(method, url, data, auth = false) {
  const headers = {}
  headers['Content-Type'] = 'application/json'
  if (auth) {
    headers.token = getToken()
  }
  try {
    // call api
    const response = await axios({
      method,
      url,
      data: JSON.stringify(data),
      headers
    })
    return response.data
  } catch (e) {
    return e
  }
}
