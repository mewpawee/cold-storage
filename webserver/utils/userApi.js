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
