import { request } from './api'

export function createUser(username, password) {
  const url = 'http://localhost:4000/graphql'
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
