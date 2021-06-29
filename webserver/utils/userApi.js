import { request } from './api'

export function createUser(username, password) {
  const url = `/graphql`
  const body = {
    query: `mutation{
      createUser(username:"${username}",password:"${password}"){
          _id
          username
        }
    }`,
  }
  return request('POST', url, body, false)
}

export function getCompanyGroup() {
  const url = `/graphql`
  const body = {
    query: `{
      company{
        groups{
          groupName
        }
        minThreshold
        maxThreshold
      }
    }`,
  }
  return request('POST', url, body, true)
}

export function getLatestGroupInfo(groupName, limit = 5000) {
  const url = `/graphql`
  const body = {
    query: `{
      groupData(groupName:"${groupName}",limit:${limit}){
        date
        lat
        lng
        devices{
          deviceId
          temp
        }
      }
    }`,
  }
  return request('POST', url, body, true)
}

export function getGroupInfo(groupName, startDate, endDate) {
  const url = `/graphql`
  const body = {
    query: `{
      groupData(groupName:"${groupName}", startDate: "${startDate}", endDate: "${endDate}"){
        date
        lat
        lng
        devices{
          deviceId
          temp
        }
      }
    }`,
  }
  return request('POST', url, body, true)
}

// export function getGroupInfo(groupName, date) {
//   const url = `/graphql`
//   const body = {
//     query: `{
//       groupData(groupName:"${groupName}", date: "${date}"){
//         date
//         lat
//         lng
//         devices{
//           deviceId
//           temp
//         }
//       }
//     }`,
//   }
//   return request('POST', url, body, true)
// }

export function getUserInfo() {
  const url = `/graphql`
  const body = {
    query: `{
      company{
        groups{
          groupName
          groupData(limit:1){
            date
            lat
            lng
            devices{
              deviceId
              temp
            }
          }
        }
      }
    }`,
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
    }`,
  }
  return request('POST', url, body, false)
}

export function setThreshold(minimum, maximum) {
  const url = '/graphql'
  const body = {
    query: `mutation{
      changeThreshold(minThreshold:${minimum},maxThreshold:${maximum}){
        maxThreshold
        minThreshold
      }
    }`,
  }
  return request('POST', url, body, true)
}
