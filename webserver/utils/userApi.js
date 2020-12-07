import { request } from './api'
export function createUser(username, password) {
  const url = `/graphql`
  const body = {
    query: `mutation{
      createUser(username:"${username}",password:"${password}"){
          _id
          username
        }
    }`
  }
  return request('POST', url, body, false)
}

export function getUserInfo() {
  const url = `/graphql`
  const body = {
    query: `{
      user{
        trucks{
          _id
          truckName
          trucksData{
            _id
            date
            temp
            lat
            lng
          }
        }
      }
    }`
  }
  return request('POST', url, body, true)
}

export function addData(username, groupName, lat, lng, devices) {
  const url = '/graphql'
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
    }`
  }
  return request('POST', url, body, false)
}
