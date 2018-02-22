const express = require('express')
var sensor = require('node-dht-sensor')
var config = require('./config')
const fs = require('fs');

const app = express()
const port = config.webserver_port

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

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened, cannot start listening webserver', err)
  }

  console.log(`server is listening on ${port}`)
})