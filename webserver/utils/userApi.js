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

export function addTruck(truckName) {
  const url = `/graphql`
  const body = {
    query: `mutation{
      addUsersTruck(truckName: "${truckName}"){
        _id
        truckName
      }
    }`
  }
  return request('POST', url, body, true)
}

export function addTrucksData(truckId, temp, lat, lng) {
  const url = `/graphql`
  const body = {
    query: `mutation{
      addTrucksData(truckId:"${truckId}",temp:${temp},lat:${lat},lng:${lng}){
        _id
        date
        temp
        lat
        lng
      }
    }`
  }
  return request('POST', url, body, false)
}
