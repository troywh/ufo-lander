/* 
  global createCanvas colorMode HSB background elevation noLoop circle drawGround drawUfo drawMoon
  push texture plane pop rotateX pointLight spotLight scale emissiveMaterial ellipsoid
  pmouseX pmouseY mouseX mouseY random noStroke ellipse sphere setup WEBGL line stroke fill
  mouseIsPressed torus box loadImage cylinder width ufoTexture rotateZ image strokeWeight 
  ambientMaterial directionalLight rotateY translate cone orbitControl specularMaterial
*/

let canvasWidth = 700;
let canvasHeight = 700;
let elevation = -300;
let grassImage, moonTexture, ufoTexture;
let moonAngle = 0;
let ufoAngle = 0;
let ufoAngleChange = 0.09;
let ufoRadius = 80;
let moonAngleChange = ufoAngleChange / 50;
let groundWidth = 600;
let groundHeight = 520;
let groundSurface = 190;
let groundElevation = 200;

let stars = [];
let trees = [];

function preload() {
  grassImage = loadImage(
    "https://cdn.glitch.com/74af461e-f3fd-45dc-98cf-843a0fbb94cf%2FGrass.jpg?v=1607837850908"
  );

  moonTexture = loadImage(
    "https://cdn.glitch.com/f5422b1b-d33f-40b3-8e27-c9b10eccaba5%2Fmoon.jpg?v=1594419119213"
  );

  ufoTexture = loadImage(
    "https://cdn.glitch.com/81e088a6-1036-4c8e-a93a-ff9e7e00bad9%2Fufo%20Texture.jpg?v=1608268930419"
  );
}

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  noStroke();
  const inset = 75;
  while (stars.length < 50) {
    stars.push({ x: 5, y: 5, speed: 0 });
    trees.push(new Tree(-groundWidth / 2 + inset, -groundHeight / 2 + inset));
    trees.push(new Tree(-groundWidth / 2 + inset, groundHeight / 2 - inset));
    trees.push(new Tree(groundWidth / 2 - inset, -groundHeight / 2 + inset));
    trees.push(new Tree(groundWidth / 2 - inset, groundHeight / 2 - inset));
  }
}

function draw() {
  background("midnightblue");
  directionalLight(255, 255, 255, 1, 1, -1);
  pointLight(255, 255, 255, 0, elevation - 30, 0);
  drawStars(stars);
  drawGround();
  drawTrees();
  drawUfo();
  drawMoon();
  moveUfo();
}

function moveUfo() {
  if (elevation < groundSurface - 100) {
    elevation += 7;
  } else {
    elevation += 2;
  }
  if (elevation === groundSurface) {
    noLoop();
  }
}

function drawStars(star) {
  for (let star of stars) {
    fill("yellow");
    circle(star.x, star.y, 8);
    star.y += star.speed;
    star.x = random(-500, 700);
    star.y = random(-500, 500);
  }
}

function drawGround() {
  push();
  texture(grassImage);
  spotLight(255, 255, 255, 0, elevation, 0, 0, 1, 0, Math.PI / 6, 3);
  translate(0, groundElevation, 0);
  rotateX(Math.PI / 2);
  plane(groundWidth, groundHeight);
  pop();
}

function drawTrees() {
  for (let tree of trees) {
    tree.draw();
  }
}

class Tree {
  constructor(x, z) {
    this.x = x;
    this.y = groundElevation;
    this.z = z;
    this.r = 40;
    this.h = 70;
    this.width = 10;
    this.height = 90;
  }
  draw() {
    push();
    translate(this.x, this.y, this.z);
    rotateX(Math.PI);
    translate(0, 50, 0);
    fill("brown");
    cylinder(this.width, this.height);
    texture(grassImage);
    translate(0, 75, 0);
    cone(this.r, this.h);
    pop();
  }
}

function drawUfo() {
  push();
  directionalLight(255, 25, 0, 44, 0, -300);
  rotateY(ufoAngle);
  translate(0, elevation, 0);
  scale(1, 0.25, 1);
  ambientMaterial("lightblue");
  texture(ufoTexture);
  sphere(ufoRadius); // main sphere
  translate(0, -80, 0);
  scale(1, 2, 1);
  specularMaterial("black");
  ellipsoid(ufoRadius - 40); //little sphere
  ufoAngle += ufoAngleChange;
  pop();
}

function drawMoon() {
  directionalLight(255, 255, 255, 0, 0, -300);
  push();
  rotateY(moonAngle);
  texture(moonTexture);
  translate(200, -200, 0);
  sphere(30);
  pop();
  moonAngle += moonAngleChange;
}
