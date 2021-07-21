import { addData } from '../utils/userApi'
import { json2csvAsync } from 'json-2-csv'
import express from 'express'
import cors from 'cors'

const app = require('express')()

app.use(cors())
app.use(express.json({ limit: '9999mb' }))
app.use(
  express.urlencoded({
    extended: true,
    limit: '9999mb'
  })
)

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
