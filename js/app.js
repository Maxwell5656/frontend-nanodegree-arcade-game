// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.spawnLocs = [48, 131, 214]; // stores three locations for the enemies to spawn from
    this.initLoc = Math.floor(Math.random() * (2 - 0 + 1)) + 0; // randomly picks either 0, 1, or 2 in order to select a number from spawnLocs
    this.startX = -100;
    this.x = this.startX;
    this.y = this.spawnLocs[this.initLoc]; // picks a number from spawnLocs based on initLoc
    this.maxSpeed = 550;
    this.minSpeed = 300;
    this.speed = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed; // generates a random speed for the enemy
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) { // resets the enemy when it goes off the right side of the screen
        this.reset();
    }
    if (this.checkX(this.x, player.x) === true && player.y + 83 === this.y + 83){ // checks for a collision between the player and the enemy
        player.reset();
        console.log("You Fail!");
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() { // resets the enemy's position and speed, respawing it at a random location with a random speed
    this.initLoc = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    this.y = this.spawnLocs[this.initLoc];
    this.x = this.startX;
    this.speed = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
};
Enemy.prototype.checkX = function(x1, x2){ // checks if the player's x value is between the enemy's x value
    if (x2 > x1 - 60 && x2 < x1 + 60){
        return true;
    }else {
        return false;
    }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.startX = 202;
    this.startY = 380;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() { // updates the player
    if (this.y === -35) { // checks if the player has reached the row of water blocks
        this.reset();
        console.log("You Win!");
    }
};

Player.prototype.render = function() { // draws the player's sprite
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) { // moves the player based on which key was pressed
    if (key === 'left'){
        if (this.x > 0){
            this.x = this.x - 101;
        }
    }
    if (key === 'right'){
        if (this.x < 404){
            this.x = this.x + 101;
        }
    }
    if (key === 'up'){
        if (this.y > -35){
            this.y = this.y - 83;
        }
    }
    if (key === 'down'){
        if (this.y < this.startY){
            this.y = this.y + 83;
        }
    }
};

Player.prototype.reset = function(){ // resets the player's position to the starting position
    this.x =  this.startX;
    this.y = this.startY;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

for (var i = 0; i < 3; i++){
    allEnemies.push(new Enemy());
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
