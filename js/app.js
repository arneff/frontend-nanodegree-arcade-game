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
    //drawBox(this.xPosition + 8, this.yPosition + 80, 85, 55, 'red');
};

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollisions = function(){
  //console.log("checkCollisions");
  let enemyRect = {x: this.xPosition + 8, y: this.yPosition + 80, width: 85, height: 55};
  let playerRect = {x: player.xPosition + 10, y: player.yPosition + 10, width: 60, height: 70};

  //defines collision area
  if (enemyRect.x < playerRect.x + playerRect.width &&
     enemyRect.x + enemyRect.width > playerRect.x &&
     enemyRect.y < playerRect.y + playerRect.height &&
     enemyRect.height + enemyRect.y > playerRect.y) {
      //console.log('collision detected!');
      player.xPosition = 212;
      player.yPosition = 450;
      collisions++;
    }
  //after a collision occurs remove a player 'life' from visiblity
  if (collisions === 1){
    $('.lives li:last-child').hide();
  }
  if (collisions === 2){
    $('.lives li:nth-child(2)').hide();
  }
  if (collisions === 3) {
    $('.lives li:first-child').hide();
    gameOver();

  }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(xPosition, yPosition) {
  this.xPosition = 212;
  this.yPosition = 450;


  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';

};
//update player instance to ensure stays within canvas
Player.prototype.update = function() {
  //sets parameters of player to stay in certain area on canvas
  if (this.yPosition > 450) {
    this.yPosition = 450;
  }
  if (this.yPosition < 50) {
    this.yPosition = 50;
  }
  if (this.xPosition > 412) {
    this.xPosition = 412;
  }
  if (this.xPosition < 12) {
    this.xPosition = 12;
  }
  //if player reaches the top of the canvas reset to starting postion
  //add new enemy and increase level count
  if (this.yPosition <= 50){
    this.xPosition = 212;
    this.yPosition = 450;
    level++;
    let addEnemy = new Enemy();
    allEnemies.push(addEnemy);
  }
  let levelTotal =+ level;
  $('.level').text(levelTotal);
  $('#finalLevel').text(levelTotal);

};


//show player on canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
  //drawBox(this.xPosition + 10, this.yPosition + 10, 60, 70, 'yellow');
};
//take input from keybard to move player
Player.prototype.handleInput = function(keyPress) {
  if (collisions < 3) {
    if (keyPress === 'up') {
      this.yPosition -= 83;
    }
    if (keyPress === 'down') {
      this.yPosition += 83;
    }
    if (keyPress === 'left') {
      this.xPosition -= 101;

    }
    if (keyPress === 'right') {
      this.xPosition += 101;

    }
  }
};



//when called draws a box around an element
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
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let collisions = 0;
let level = 1;

allEnemies.push(enemy1);
allEnemies.push(enemy2);

function gameOver() {
  //https://www.w3schools.com/howto/howto_css_modals.asp
  //remove enemies from allEneiems array
  while(allEnemies.length > 0){
    allEnemies.pop();
  };

  //create end of game message
  let modal = document.getElementById('myModal');
  let span = document.getElementsByClassName("close")[0];
  $('.modal').css('display', 'block');


  //exit the modal
  span.onclick = function() {
  modal.style.display = "none";
};

  //exit the modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  //exit modal if user no longer wishes to play
  quit.onclick = function() {
    modal.style.display = "none";
  };

  //refresh game
  newGame.onclick = function() {
    $('.lives').children().show();
    level = 1;
    collisions = 0;
    enemy1 = new Enemy();
    enemy2 = new Enemy();
    allEnemies.push(enemy1, enemy2);
    modal.style.display = "none";
  };

}


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
