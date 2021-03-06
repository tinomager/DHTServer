const express = require('express')
var config = require('./config')
const fs = require('fs');
var bodyParser = require('body-parser')

const app = express()
const port = config.webserver_port
var counter = 0;
var tempValues = [17.0, 17.1, 17.0, 30.0, 17.1, 16.5, 8.0, 16.0, 17.1, 18.0];
var humValues = [67.0, 67.1, 67.0, 30.0, 67.1, 66.5, 98.0, 66.0, 67.1, 68.0];

var jsonParser = bodyParser.json();

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

app.post('/interact', jsonParser, function(request, response){
	console.log("Received POST with body: " + request.body);

	if(request.body === undefined || request.body.Type === undefined || request.body.Payload === undefined){
		response.send('{ Error : "Body missing with elements Type and Payload"}');
	}

	var type = request.body.Type;
	if(type === "ShowText"){
			console.log("ShowText request received:")
			console.log(request.body.Payload);
	}
	else if(type === "ShowStatus"){
		console.log("ShowStatus request received:")
		console.log(request.body.Payload);
	}

	response.send("OK")
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened, cannot start listening webserver', err)
  }

  console.log(`server is listening on ${port}`)
})