let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

// dynamically change the borders values
window.addEventListener("resize", () => { 
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
});

class Logo {
  constructor() {
    this.xSpeed = this.ySpeed = getRandomInt(-8, 8);                                            
    this.logo = document.createElement("img");
    this.logo.src = "DVD_logo.png";
    this.logo.onload = () => {  // give x, y only after the image loaded
      this.logo.style.position = "absolute";
      this.x = getRandomInt(1, screenWidth - this.logo.naturalWidth - 1); // to avoid hitting the corner right out of the gate
      this.y = getRandomInt(0, screenHeight - this.logo.naturalHeight);
      this.logo.style.left = `${this.x}px`;                              
      this.logo.style.top = `${this.y}px`;
    }
    document.body.appendChild(this.logo);
    document.body.style.backgroundColor = "silver";
  }

  move() {  
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if ((this.x <= 0 && this.y <= 0) || // left upper corner hit
    (this.x >= screenWidth - this.logo.naturalWidth && this.y <= 0) ||  // right upper corner hit
    (this.x >= screenWidth - this.logo.naturalWidth && this.y >= screenHeight - this.logo.naturalHeight) || // right bottom corner hit
    (this.x <= 0 && this.y >= screenHeight - this.logo.naturalHeight)) { // left bottom corner hit
      this.celebrate();
    }

    if ((this.x >= screenWidth - this.logo.naturalWidth && this.xSpeed > 0) || // right border
       ((this.x < 1 && this.xSpeed < 0))) { // left border
      this.xSpeed *= -1; // changes direction
      this.ySpeed += choice([-1, 0, 1]); // changes bounce angle
      // changeBgColor();
    }
    
    if ((this.y >= screenHeight - this.logo.naturalHeight && this.ySpeed > 0) || // bottom border
       ((this.y < 1 && this.ySpeed < 0))) { // top border
      this.ySpeed *= -1; // changes direction 
      this.xSpeed += choice([-1, 0, 1]); // changes bounce angle
      // changeBgColor();
    }
    this.logo.style.left = `${this.x}px`;
    this.logo.style.top = `${this.y}px`;
  } 
  
  celebrate() {
    clearInterval(intervalAnimationId);
    flashColors(celebrationColors);
    setTimeout( () => {
      animation(object, ms)
    }, 5000);
  }
};

// color changer
const celebrationColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]; 
let oldColor;
let newColor;
function changeBgColor(colors) {
  while (true) {
    newColor = choice(colors);
    if (newColor !== oldColor) {
      document.body.style.backgroundColor = newColor;
      oldColor = newColor;
      break;
    }
  };
};

function choice(array) { // randomly choose an element out of any array
      return array[Math.floor(Math.random() * (array.length))];
   }

function getRandomInt(min, max) { // randomly pick a value from the range (except 0)
  while (true) {
    let result = Math.floor(Math.random() * ((max - min) +1) + min);
    if (result !== 0) return result;
  }
};

let intervalAnimationId;
function animation() {
  clearInterval(intervalFlashId);
  intervalAnimationId = setInterval(() => {
    object.move();
  }, ms);
}

let intervalFlashId;
function flashColors(colors) {
  intervalFlashId = setInterval(() => {
    changeBgColor(colors)
  }, ms * 10);
}

const dvdLogo = new Logo(), object = dvdLogo;
const ms = 17 ;
animation();