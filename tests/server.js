var express=require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
app.use(express.static('public'));

Player = require("./ServerPlayers").Player;

var players;
var MAXPLAYERS = 2;

var hexTileArray = [];
var arrayOfLocationObjects = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('a user' +socket.id+' connected');
	
	// add player
	var newPlayer = new Player();
	newPlayer.id = socket.id;
	players.push(newPlayer);
	
	io.emit('update number of players', players.length);
	
	socket.on('disconnect', function() {
		console.log('user disconnected');

		var removePlayer = findPlayerById(this.id);
		players.splice(players.indexOf(removePlayer), 1);
		io.emit('update number of players', players.length);
	});

	socket.on('start game', function() {
		if (players.length == 2) {
			console.log('Start');
			
			// have to reset here from wierd bug adding same player multiple times
			arrayOfLocationObjects = [];
			// this will create location objects for server to keep track of
			initLocationsOnServer();

			for (var i = 0; i < players.length; i++) {
				var startPlayer = findPlayerById(players[i].id);
				var randomLocationIndex = Math.floor(Math.random()*arrayOfLocationObjects.length);
				
				while(arrayOfLocationObjects[randomLocationIndex].owner !== "neutral") {
					var randomLocationIndex = Math.floor(Math.random()*arrayOfLocationObjects.length);
				}

				arrayOfLocationObjects[randomLocationIndex].owner = startPlayer.id;

				//setRandomStartLocations(i);
				
				//var randomHex = Math.floor(Math.random()*hexTileArray.length);
				//startPlayer.setStationLocation(hexTileArray[randomHex][0], hexTileArray[randomHex][1], hexTileArray[randomHex][2]);
				// send info of player only to that specific player and no one else
				/*io.sockets.connected[players[i].id].emit('init players on client', 
				{ 
					id: startPlayer.getPlayerId(), 
					x: startPlayer.getStationLocationX(), 
					y: startPlayer.getStationLocationY(), 
					z: startPlayer.getStationLocationZ() 
				});*/
			};
			//console.log(arrayOfLocationObjects);
			updateLocationsPlayersCanSee();
			switchTurn();			
		}
		else{
			console.log('Not enough players!');
		}
	});

	socket.on('map setup', function(data) {
		var locationOfHex = Object.keys(data).map(function(k) { return data[k] });
		hexTileArray.push(locationOfHex);
	});

	
	socket.on('hex tile clicked', function(data) {
		console.log(data);
	});
	/*socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
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

function initLocationsOnServer() {
	for (var i = 0; i < hexTileArray.length; i++) {
		var locationObject = {
			name: hexTileArray[i][0].toString() +  hexTileArray[i][1].toString() + hexTileArray[i][2].toString(),
			x: hexTileArray[i][0],
			y: hexTileArray[i][1],
			z: hexTileArray[i][2],
			owner: "neutral"
		}
		arrayOfLocationObjects.push(locationObject);
	};
	//console.log(arrayOfLocationObjects);
};

function updateLocationsPlayersCanSee() {
		// go through all players to give correct updates
		for (var i = 0; i < players.length; i++) {

			var currentPlayer = findPlayerById(players[i].id);
			// get all locations to give to player
			for (var j = 0; j < arrayOfLocationObjects.length; j++) {
				if (arrayOfLocationObjects[j].owner === currentPlayer.id) {
					currentPlayer.addLocationToPlayerControl(arrayOfLocationObjects[j].name);
				};
			};
			io.sockets.connected[currentPlayer.id].emit('update what player can see', 
			{ 
				locations: currentPlayer.getLocationsOfPlayerControl()
			});
		};
};

// Find player by ID
function findPlayerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};

function switchTurn() {
	var currentPlayerindex = Math.floor(Math.random()*players.length);
	var currentPlayer = findPlayerById(players[currentPlayerindex].id);
	currentPlayer.setCurrentPlayer();
	for (var i = 0; i < players.length; i++) {
		if (currentPlayer === players[i]) {
			var currentPlayerBool = true;
			io.sockets.connected[players[i].id].emit('display turn', 
			{ 
				currentPlayerBool
			});
		} else {
			var currentPlayerBool = false;
			io.sockets.connected[players[i].id].emit('display turn', 
			{ 
				currentPlayerBool
			});
		};
	};
};

function checkDistanceOfStart(clickedHexTile) {
	console.log('...');
	//var val = (Math.abs(clickedHexTile.hexTileX - redShip.XLocation) + Math.abs(clickedHexTile.hexTileY - redShip.YLocation) + Math.abs(clickedHexTile.hexTileZ - redShip.ZLocation)) / 2;
	//return val;
};