var express=require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
app.use(express.static('public'));

Player = require("./Player").Player;

var players;
var MAXPLAYERS = 2;

var hexTileArray = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	//console.log('a user' +socket.id+' connected');
	
	// add player
	if (players.length < MAXPLAYERS) {
		var newPlayer = new Player();
		newPlayer.id = socket.id;
		players.push(newPlayer);
	};

	io.emit('update number of players', players.length);
	
	console.log(players);

	socket.on('disconnect', function() {
		console.log('user disconnected');

		var removePlayer = findPlayerById(this.id);
		players.splice(players.indexOf(removePlayer), 1);

	});

	socket.on('start game', function() {
		if (players.length == 2) {
			console.log('Start');
			for (var i = 0; i < players.length; i++) {
				var startPlayer = findPlayerById(players[i].id);
				var randomHex = Math.floor(Math.random()*hexTileArray.length);
				startPlayer.setStationLocation(hexTileArray[randomHex][0], hexTileArray[randomHex][1], hexTileArray[randomHex][2]);
			};

			//io.emit('chat message', msg);
		}
		else{
			console.log('Not enough players!');
		}
	});

	socket.on('map setup', function(data) {
		var locationOfHex = Object.keys(data).map(function(k) { return data[k] });
		hexTileArray.push(locationOfHex);
	});

	/*socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
	socket.on('client_data', function(data) {
		console.log(data);
	});
	socket.on('ship_location', function(data) {
		console.log(data);
		//var strJson = JSON.stringify(data);
		//fs.writeFile('ship_location.json', strJson, function (err) {
		  //if (err) return console.log(err);
		  //console.log('created json file');
		//});
	});*/
});


http.listen(3000, function() {
  console.log('listening on *:3000');
  players = [];
});

// Find player by ID
function findPlayerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};