import { addData } from '../utils/userApi'

const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

app.all('/submit', async (req, res) => {
  try{
    const {username, groupName, lat, lng, devices} = req.body
    const devicesString = JSON.stringify(devices).toString().replace(/"deviceId"/g, "deviceId").replace(/"temp"/g, "temp")
    const response = await addData(username, groupName, lat, lng, devicesString);
    res.status(200).json(response)
  }catch(err){
    console.log(err)
  }
})

export default app
