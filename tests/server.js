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
var justStartedGame = true;
var currentPlayer = null;

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
		currentPlayer = findPlayerById(socket.id);
		if (currentPlayer.getCurrentPlayer()) {
			checkDistanceOfClick(data.hexClicked, socket.id);
		}else {
			console.log("not your turn-----------------");
		};

	});

	socket.on('change player formation', function(data) {
		console.log(data);
		currentPlayer = findPlayerById(socket.id);
		currentPlayer.setPlayerFormation(data);
	});
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
	/*
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

			currentPlayer = findPlayerById(players[i].id);
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
	if (justStartedGame) {
		var currentPlayerindex = Math.floor(Math.random()*players.length);
		currentPlayer = findPlayerById(players[currentPlayerindex].id);
		currentPlayer.setCurrentPlayer();
		justStartedGame = false;
	} 
	
	for (var i = 0; i < players.length; i++) {
		// this code will make it so the person that was randomly picked is really the second player to start
		players[i].setCurrentPlayer();
		if (players[i].getCurrentPlayer()) {
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

function checkDistanceOfClick(clickedHexTile, clickPlayerId) {
	for (var i = 0; i < arrayOfLocationObjects.length; i++) {
		if (clickedHexTile === arrayOfLocationObjects[i].name) {
			var currentHex = arrayOfLocationObjects[i];
			break;
		};
	};
	
	if (currentHex.owner === clickPlayerId) {
		return;
	};
	for (var j = 0; j < arrayOfLocationObjects.length; j++) {
		if (arrayOfLocationObjects[j].owner === clickPlayerId) {
			var distance = (Math.abs(currentHex.x - arrayOfLocationObjects[j].x) + 
							Math.abs(currentHex.y - arrayOfLocationObjects[j].y) + 
							Math.abs(currentHex.z - arrayOfLocationObjects[j].z)) / 2;
			if (distance === 1) {
				console.log("Next");
				calculateBattle(arrayOfLocationObjects[j].owner, currentHex, clickPlayerId, currentHex.owner);
				break;
			}else{
				console.log("Not Next");
			};
		};
	};
};

function calculateBattle(ownerOfHexNextToBattleField, battleFieldHex, clickPlayerId, defendingPlayerId) {
	var battleMessage = "";
	console.log(defendingPlayerId);
	console.log(clickPlayerId);
	if (battleFieldHex.owner === "neutral") {
		console.log("neutral");
		var randNum = Math.random();
		if (randNum > 0.2) {
			console.log("won neutral hex");
			battleMessage = "won neutral hex";
			io.sockets.connected[clickPlayerId].emit('update combat results for player', 
			{ 
				battleMessage
			});
			battleFieldHex.owner = ownerOfHexNextToBattleField;
			updateLocationsPlayersCanSee();
		}else {
			console.log("lost neutral battle");
			battleMessage = "lost neutral battle";
			io.sockets.connected[clickPlayerId].emit('update combat results for player', 
			{ 
				battleMessage
			});
		};
	} else {
		console.log("PVP Battle");
		var randNum = Math.random();
		// formation advantage 
		var attackingPlayer = findPlayerById(clickPlayerId);
		var defendingPlayer = findPlayerById(defendingPlayerId);
		var formationmodifier = determineFormationAdvantage(attackingPlayer, defendingPlayer);
		console.log(randNum);
		console.log(formationmodifier);
		randNum = randNum + formationmodifier;
		console.log(randNum);

		if (randNum > 0.65) {
			console.log("Took Players hex");
			battleMessage = "Took Players hex";
			io.sockets.connected[clickPlayerId].emit('update combat results for player', 
			{ 
				battleMessage
			});
			battleFieldHex.owner = ownerOfHexNextToBattleField;
			updateLocationsPlayersCanSee();
		}else {
			console.log("lost pvp battle");
			battleMessage = "lost pvp battle";
			io.sockets.connected[clickPlayerId].emit('update combat results for player', 
			{ 
				battleMessage
			});
		};
	};
	switchTurn();
};

function determineFormationAdvantage(attackingPlayer, defendingPlayer) {
	var attackingFormation = attackingPlayer.getPlayerFormation();
	var defendingFormation = defendingPlayer.getPlayerFormation();
	var formationMod = 0;
	if (attackingFormation == defendingFormation) {
		formationMod =  0;
	}else {
		switch (attackingFormation){
			case "A":
				if (defendingFormation == "B") {
					formationMod = 0.25;
				}else if(defendingFormation == "C") {
					formationMod = -0.25;
				};
				break;
			case "B":
				if (defendingFormation == "C") {
					formationMod = 0.25;
				}else if(defendingFormation == "A") {
					formationMod = -0.25;
				};
				break;
			case "C":
				if (defendingFormation == "A") {
					formationMod = 0.25;
				}else if(defendingFormation == "B") {
					formationMod = -0.25;
				};
				break;
			default: 
				formationMod = 0;
		}
	};
	return formationMod;
};