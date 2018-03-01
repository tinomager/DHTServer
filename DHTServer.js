const express = require('express')
var sensor = require('node-dht-sensor')
var config = require('./config')
const fs = require('fs')
var python = require('python-shell')
var bodyParser = require('body-parser')

const app = express()
const port = config.webserver_port

var jsonParser = bodyParser.json();

app.get('/', (request, response) => {
  sensor.read(22, config.dht_gpio_pin, function(err, temp, hum)
	{
		var message = '';
		if(!err){
			message = '{ "temp": '+ temp.toFixed(4) +', "hum": '+ hum.toFixed(4) +' }';
		}
		else{			
			message = '{ "error": ' + err + ' }';
		}
		response.send(message);
		console.log('message was sent: ' + message);

		var logstring = '' + temp + ',' + hum + ',' + new Date().toUTCString();
		var filename = config.logfile_directory + '/' + config.logfile_filename;
		fs.appendFile(filename, logstring, function (err) {
			if (err){
				console.log('cannot save logstring to file: '+ logstring);
			}
			else{
				console.log('logstring successfully saved: '+ logstring);
			}		
		});
	});
})

app.get('/downloadlogs', (request, response) => {
	var filename = config.logfile_directory + '/' + config.logfile_filename;
	response.download(filename);
})

app.post('/interact', jsonParser, function(request, response){
	console.log(request.body);
	if(request.body === undefined || request.body.Type === undefined || request.body.Payload === undefined){
		response.send('{ Error : "Body missing with elements Type and Payload"}');
	}

	var type = request.body.Type;
	if(type === "ShowText"){
		var options = {
			mode: 'text',
			//pythonPath: 'path/to/python',
			pythonOptions: ['-u'],
			//scriptPath: 'showtext.py',
			args: [request.body.Payload]
		};

		python.run('showtext.py', options, function (err, results) {
			if (err) throw err;
			// results is an array consisting of messages collected during execution
			console.log('results: %j', results);
		});
	}
	else if(type === "ShowStatus"){

	}

	response.send("Ok");
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened, cannot start listening webserver', err)
  }

  console.log(`server is listening on ${port}`)
})