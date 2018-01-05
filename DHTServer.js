const express = require('express')
var config = require('./config')

const app = express()
const port = config.webserver_port

app.get('/', (request, response) => {
    //Todo: Add DHT code here
  response.send('Hello from DHT Server!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})