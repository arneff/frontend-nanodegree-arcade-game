// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xPosition = Math.random() * 184 + 50;
    this.yPosition = Math.random() * 184 + 50;
    this.speed = Math.random() * 256;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.xPosition += this.speed * dt;

    //resp enemy at begining after reaching the end
    if (this.xPosition >= 510) {
      this.xPosition = 0;
    }

    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
    //drawBox(this.xPosition, this.yPosition + 75, 100, 70, 'red');
};

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollisions = function(){
  //console.log("checkCollisions");
  let enemyRect = {x: this.xPosition, y: this.yPosition + 75, width: 80, height: 70}
  let playerRect = {x: player.xPosition + 17, y: player.yPosition + 60, width: 60, height: 80}

if (enemyRect.x < playerRect.x + playerRect.width &&
   enemyRect.x + enemyRect.width > playerRect.x &&
   enemyRect.y < playerRect.y + playerRect.height &&
   enemyRect.height + enemyRect.y > playerRect.y) {
    console.log('collision detected!');
    player.xPosition = 202.5;
    player.yPosition = 400;
}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(xPosition, yPosition) {
  this.xPosition = 202.5;
  this.yPosition = 400;


  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function() {
  inBounds(this);
  if (this.yPosition <= 20){
    this.xPosition = 202.5;
    this.yPosition = 400;
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
  //drawBox(this.xPosition + 17, this.yPosition + 60, 68, 80, 'yellow');
}

Player.prototype.handleInput = function(keyPress) {
  if (keyPress === 'up') {
    player.yPosition -= 25;
  }
  if (keyPress === 'down') {
    player.yPosition += 25;
  }
  if (keyPress === 'left') {
    player.xPosition -= 25;
  }
  if (keyPress === 'right') {
    player.xPosition += 25;
  }
}

let inBounds = function(player) {
  if (player.yPosition > 400) {
    player.yPosition = 400;
  }
  if (player.yPosition < -5) {
    player.yPosition = -5;
  }
  if (player.xPosition > 410) {
    player.xPosition = 410;
  }
  if (player.xPosition < -10) {
    player.xPosition = -10;
  }
}


function drawBox(x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player();
let enemy = new Enemy();

allEnemies.push(enemy);






// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
