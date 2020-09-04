const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const port = process.env.PORT || 8080
const app = express()

bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  app.use(express.static(path.join(__dirname, 'build')))

app.get('/api/v1/ping', (req, res) => {
  return res.send('OK')
})

app.listen(port)
