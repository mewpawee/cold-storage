import axios from 'axios'
const getToken = function () {
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
      headers,
    })
    return response.data
  } catch (e) {
    return e
  }
}

export async function download(url, data) {
  const headers = {}
  headers['Content-Type'] = 'application/json'
  try {
    // call api
    const response = await axios({
      method: 'post',
      url,
      headers,
      data: JSON.stringify(data),
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'history.csv')
      document.body.appendChild(link)
      link.click()
    })
    return response
  } catch (e) {
    return e
  }
}

export async function snappedRoadAPI(data) {
  try {
    // call api
    const params = {
      interpolate: true,
      key: process.env.GOOGLEAPI,
      path: data.join('|'),
    }

    const response = await axios.get(
      'https://roads.googleapis.com/v1/snapToRoads',
      { params }
    )
    return response
  } catch (e) {
    return e
  }
}
