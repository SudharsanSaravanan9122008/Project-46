//variables
var player, playerImageRight, playerImageLeft, playerDeadRightImage, playerDeadLeftImage;
var zombieRightImage, zombieLeftImage;
var zombiesGroup;
var backgroundImage;
var zombiesGroup = [];
var bulletsGroup = [];

var INTRO = 3
var WON = 2;
var PLAY = 1;
var END = 0;


var bullet
var gameState = INTRO;
var playerFaceingRight = true;

var score = 0;
var totalScore = 0

var bulletsRemaining = 800;

//loading the images
function preload()
{
	playerImageLeft = loadImage('./flip/player.png');
	playerImageRight = loadImage("./player.png");

	zombieLeftImage = loadAnimation("./flip/1.png", "./flip/2.png", "./flip/3.png", "./flip/4.png", "./flip/5.png", "./flip/6.png");
	zombieRightImage = loadAnimation("./1.png", "./2.png", "./3.png", "./4.png", "./5.png", "./6.png");

	backgroundImage = loadImage("spookyNight.jpg");

	playerDeadRightImage = loadImage("playerDead.png");
	playerDeadLeftImage = loadImage("flip/playerDead.png");

}
//creating canvas and creating the player
function setup() {
	createCanvas(800, 500);

	player = createSprite(400, 450);
	player.addImage(playerImageRight);
	player.scale = 0.25;  
	console.log(document.cookie)
}


function draw() {
  rectMode(CENTER);
  background(backgroundImage);
 //calling the playerControl function to control the player movements and actions when in PLAY state 
  if(gameState === PLAY){
	  playerControl();
	  
  }
  //calling deathWhenTouched function
  deathWhenTouched();
  //getting a random number 1 or 2 and storing it in choise variable
 choise = Math.round(random(1,2));
 
 //for things to happen in different states and needs to be done before caling drawSprites function
 if(gameState === PLAY || gameState === END){
	if(frameCount%10 === 0 && score <= 100){
		
		if(choise === 1){
			spawnZombiesFromRight();
		}else{
			spawnZombiesFromLeft();
		}
	}else if(score === 100){
		gameState = WON
		saveHighScore();
	}
 }


 //calling drawSprites to draw all the sprites on the screen 
 drawSprites();
 
 //things tohappen in different states and needs to be done after calling drawSprites function
 if(gameState === END){
	 totalScore = score+bulletsRemaining/2
	if(document.cookie < totalScore){
		saveHighScore();
	}
	fill("white");
	text("Game Over", 365, 200);
	text("Score: "+totalScore, 365, 210);
 }else if(gameState === WON){
	 totalScore = score+Math.round(bulletsRemaining/2);
	 fill("white");
	 text("You Won", 350, 200);
	 for(var i = 0; i < zombiesGroup.length; i++){
		 zombiesGroup[i].destroyZombie();
	 }
 }else if(gameState === PLAY){
	 fill("white");
	 text("Score: " + score+" + "+Math.round(bulletsRemaining/2), 5, 15);
	 text("Bullets Remaining: "+bulletsRemaining, 5, 25)
	 if(document.cookie){
		 text("High Score: "+ document.cookie, 5, 35)
	 }
 }else if(gameState === INTRO){
	 background("white");
	 intro()
 }
 
}

//to spawn zombies from right facing the player
function spawnZombiesFromRight(){
	var zombie = new Zombie(zombieRightImage, true);
	zombiesGroup.push(zombie);
}

//to spawn zombies from left facing the player
function spawnZombiesFromLeft(){
	var zombie = new Zombie(zombieLeftImage, false);
	zombiesGroup.push(zombie);
}
//to make the player die when the zombie touch him and to make the zombies die when the bullet collides with them
function deathWhenTouched(){
	for(var i = 0;i < zombiesGroup.length; i++){
		if(zombiesGroup[i].isCollidedWithPlayer()){
			player.addImage(playerDeadLeftImage);
			gameState = END;
		}
	}
	for(var i = 0; i < bulletsGroup.length; i++){
		if(bulletsGroup[i].checkCollisionWithZombies()){
			score++;
		}
	}
}
//for attacking the zombies
function bulletAttackToRight(){
	var bullet = new Bullet(true, [player.x, player.y]);
	bulletsGroup.push(bullet);
}
function bulletAttackToLeft(){
	var bullet = new Bullet(false, [player.x, player.y]);
	bulletsGroup.push(bullet)
}

//for controlling the movements and actions of the player
function playerControl(){
	if(keyDown("right") && player.x < 501){
		player.x+=2;
		player.addImage(playerImageRight);
		playerFaceingRight = true;
	}else if(keyDown("left") && player.x > 299){
		player.x-=2;
		player.addImage(playerImageLeft);
		playerFaceingRight = false;
	}else if(keyDown("up") && player.y > 369){
		player.y-=2;
	}else if(keyDown("down") && player.y < 450){
		player.y+=2;
	}
	if(keyDown("space") && bulletsRemaining > 0){
		bulletsRemaining-=1;
		if(playerFaceingRight === true){
			bulletAttackToRight();
		}else{
			bulletAttackToLeft();
		}
	}
	if(bulletsRemaining === 0){
		gameState = END;
	}
}

//for saving the highscore of the player by using cookies
function saveHighScore(){
	document.cookie = score+Math.round(bulletsRemaining/2);
}

//to give the introdunction to the game
function intro(){
	fill("red");
	textSize(15);
	text("Game Features", 5, 15);
	fill("red");
	textSize(10);
	fill("Green")
	text("> This game uses cookies to save high score.", 5, 30);
	text("> The zombie hit by an bullet will only die, leaving others alive. Made possible by using arrays and custom classes for zombies", 5, 40);
	text("> Spawns zombies from both the sides", 5, 50);
	text("> Player can move up, down, right, left.", 5, 60);
	text("> The zombies Spawn even after the player loses in order to maintain the logic that the player dead but zombies are still alive. If Zombies stop spawning it would be like the ", 5, 70);
	text("   zombies are dead because the player is dead", 5, 80);
	text("> Need to add animations and make the story continue after the player killed all the zombies, which is to find and use the cure to make things right.", 5, 90)
	text("> Has Bullets Limit. The Game gets over when the bullets are fully used.", 5, 100)
	text("> The total score = score + round(bullets remaining / 2)", 5, 110);
	text("*This is the part 1 of the game. The next part(the last one) is being developed.", 5, 120)
	text("*These notes above are for development purpose", 5, 130)
	textSize(15);
	fill("Blue")
	text("Press arrow keys to move", 5, 150);
	text("Press Space to shoot", 5, 165);
	text("Press Enter to start",5, 180);
	if(keyDown("enter")){
		gameState = PLAY;
	}


}