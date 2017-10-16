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

    //place enemy at begining after reaching the end
    if (this.xPosition >= 510) {
      this.xPosition = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(xPosition, yPosition) {
  this.xPosition = 200;
  this.yPosition = 400;


  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function() {
  inBounds(this);
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);

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

let checkCollisions = function() {

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
