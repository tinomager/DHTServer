const express = require('express')
var config = require('./config')
const fs = require('fs');

const app = express()
const port = config.webserver_port
var counter = 0;
var tempValues = [17.0, 17.1, 17.0, 30.0, 17.1, 16.5, 8.0, 16.0, 17.1, 18.0];
var humValues = [17.0, 17.1, 17.0, 30.0, 17.1, 16.5, 8.0, 16.0, 17.1, 18.0];

app.get('/', (request, response) => {
		if(counter == tempValues.length){
			counter = 0;
		}

		var temp = tempValues[counter];
		var hum = humValues[counter];

		var message = '{ "temp": '+ temp.toFixed(4) +', "hum": '+ hum.toFixed(4) +' }';

		response.send(message);
		console.log('message was sent from testserver: ' + message);

		counter++;
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened, cannot start listening webserver', err)
  }

  console.log(`server is listening on ${port}`)
})