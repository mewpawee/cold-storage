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
          trucksData{
            _id
            date
            temp
          }
        }
      }
    }`
  }
  return request('POST', url, body, true)
}
