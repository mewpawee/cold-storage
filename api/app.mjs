import { addData } from './util.mjs'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

const port = process.env.PORT || 4000;

app.post('/submit', async (req, res) => {
  try {
    const { username, groupName, lat, lng, devices } = req.body
    const devicesString = JSON.stringify(devices)
      .toString()
      .replace(/"deviceUUID"/g, 'deviceUUID')
      .replace(/"temp"/g, 'temp')
    const response = await addData(username, groupName, lat, lng, devicesString)
    res.status(200).json(response)
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`listen to ${port}`)
})

