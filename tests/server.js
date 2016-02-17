var express=require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	socket.on('client_data', function(data){
		console.log(data);
	});
	socket.on('ship_location', function(data){
		console.log(data);
		var strJson = JSON.stringify(data);
		fs.writeFile('ship_location.json', strJson, function (err) {
		  if (err) return console.log(err);
		  console.log('created json file');
		});
	});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});