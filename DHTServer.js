const express = require('express')
var sensor = require('node-dht-sensor')
var config = require('./config')

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
	});
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})