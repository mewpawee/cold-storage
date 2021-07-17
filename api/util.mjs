import axios from 'axios'
const API_URL = process.env.API_URL || 'http://apollo:4000/graphql'

async function request(method, url, data) {
  const headers = {}
  headers['Content-Type'] = 'application/json'
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

export function addData(username, groupName, lat, lng, devices) {
  const url = API_URL
  const body = {
    query: `mutation{
      addGroupData(username:"${username}",groupName:"${groupName}",lat: ${lat},lng: ${lng},devices: ${devices}){
        _id
        date
        lat
        lng
        devices{
          deviceId
        }
      }
    }`,
  }
  return request('POST', url, body)
}