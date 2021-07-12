import { addData } from '../utils/userApi'
import { json2csvAsync } from 'json-2-csv'
import express from 'express'
import cors from 'cors'

const app = require('express')()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb'
  })
)

app.all('/submit', async (req, res) => {
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

app.all('/generateCSV', async (req, res) => {
  try {
    const result = await json2csvAsync(req.body)
    res.attachment('data.csv')
    res.status(200).send(result)
  } catch (err) {
    console.log(err)
  }
})

export default app
