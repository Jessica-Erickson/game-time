const GamePiece = require('./GamePiece');

module.exports = class Player extends GamePiece {
  constructor(x, y, src) {
    super(x, y, src);
    this.width = 40;
    this.isDead = false;
    this.isRiding = false;
    this.lives = 7;
    this.dx = 0;
    this.dxv = 0;
    this.farthest = 480;
    this.score = 0;
  } 

  isCollidingWith(object) {
    return (
      this.x < object.x + object.width && 
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y
    );
  }

  bunnyDeath() {
    this.lives--;
    this.resetLocation();
    this.playDeathSound();
    this.farthest = 480;
  }

  scoreCheck() {
    if (this.farthest > this.y) {
      this.farthest = this.y;
      this.score += 10;
    }
  }

  move(e) {
    e.preventDefault();
    this.isRiding = false;
    this.keepBunnyOnGrid();
    let userInput = e.key;

    if (this.isDead === false) { 
    this.playHopSound();

      switch (userInput){
        case 'ArrowRight': 
          if (this.x < 520) { 
            this.x += 40; 
          } 
          break;
        case 'ArrowLeft': 
          if (this.x >= 40) { 
            this.x -= 40; 
          } 
          break;
        case 'ArrowDown': 
          if (this.y <= 440) { 
            this.y += 40; 
          } 
          break;
        case 'ArrowUp': 
          if (this.y > 40 && this.y < 520 || this.x >= 240 && this.x <= 280) { 
            this.y -= 40;
            this.scoreCheck();
          }
          break; 
      }
    }
  }

  keepBunnyOnGrid() {
    if (this.x % 40) {
      this.x = (Math.round((this.x % 40) / 40) + Math.floor(this.x / 40)) * 40;
    }
  }

  rideAsteriod(obstacle) {
    this.dx = obstacle.dx;
    this.dxv = obstacle.dxv;
    this.isRiding = true;
    this.x += this.dx * this.dxv;
  }

  resetLocation() {
    this.x = 280; 
    this.y = 480; 
  }

  playDeathSound() {
    let audio = new Audio('./assets/audio/sound-frogger-squash.wav');
    audio.play();
  }

  playHopSound() {
    let audio = new Audio('./assets/audio/sound-frogger-hop.wav');
    audio.play();
  }
}