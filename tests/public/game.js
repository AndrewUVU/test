var game = new Phaser.Game(1100, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var testships = [];
var hexXPosition = 200;
var hexYPosition = 400;
var hexXOrigionPosition = hexXPosition;
var hexYOrigionPosition = hexYPosition;
var amountOfHex = 3;
var resetHex = true;

function preload() {
	this.game.scale.pageAlignHorizontally = true;
	this.game.scale.pageAlignVertically = true;
	this.game.scale.refresh();
	game.load.image('testship', 'assets/hexagon-blue.png');
	}

function create() {
	
	for (var i = 0; i < amountOfHex; i++) {
		testships[i] = [];
		for (var j = 0; j < amountOfHex; j++) {

			var testship = game.add.sprite(0, 0, 'testship');
			testships[i][j] = testship;
			testships[i][j].anchor.setTo(0.5, 0.5);
			testships[i][j].inputEnabled = true;
			testships[i][j].events.onInputDown.add(clickTest, this);
			
			testships[i][j].reset(hexXPosition, hexYPosition);
			testships[i][j].name = i+", "+j;

			var style = { font: "32px Arial", fill: "#ffffff", align: "center", id: 'i, + j' };
			text = game.add.text(0, 0, i+", "+j, style);
			text.anchor.set(0.5, 0.5);
			
			testships[i][j].addChild(text);

			hexXPosition = hexXPosition + testships[i][j].width*(3/4);
			hexYPosition = hexYPosition - testships[i][j].width*(1/2);
		};
		hexXPosition = hexXOrigionPosition + testship.width*(3/4);
		hexYPosition = hexYOrigionPosition + testship.width*(1/2);
		hexXOrigionPosition = hexXPosition;
		hexYOrigionPosition = hexYPosition;
	};
	
}

function update() {
}

function clickTest(sprite, pointer) {
	console.log(sprite.name);
}