var mover = [];
var attractor, cNoise;
var a = 0;
var mNoise = 0;
var wNoise = 1000;
var hNoise = 2000;

var para = {
  num: 200,
}


function setup() {
  const myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('loader')
  // frameRate(30);
  var mNoise = random(1000);
  var wNoise = random(1000);
  var hNoise = random(2000);

  for (i = 0; i < para.num; i++) {
    mover[i] = new Mover(map(noise(mNoise), 0, 1, 0.1, 0.5), map(noise(wNoise), 0, 1, 0, width), map(noise(hNoise), 0, 1, 0, height));
    mNoise += 0.01;
    wNoise += 0.01;
    hNoise += 0.01;
  }
  attractor = new Attractor();
  cNoise = 0;

}

function draw() {
  background('#24562B');
  for (i = 0; i < para.num; i++) {
    var force = attractor.attract(mover[i]);
    mover[i].applyForce(force);
    mover[i].update();
    mover[i].display(cNoise);
    cNoise += 0.001;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function changePattern() {
  for (i = 0; i < para.num; i++) {
    mover[i] = new Mover(map(noise(mNoise), 0, 1, 0.1, 0.5), map(noise(wNoise), 0, 1, 0, width), map(noise(hNoise), 0, 1, 0, height));
    mNoise += 0.01;
    wNoise += 0.01;
    hNoise += 0.01;
  }
}

var Mover = function(m, x, y) {
  this.mass = m;
  this.pos = createVector(x, y);
  this.acc = createVector(0, 0);
  this.vel = createVector(0, 0);

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.display = function(cNoise) {
    fill('#BDF166');
//    stroke(3, 5, 4, 10);
    strokeWeight(0);
    circle(this.pos.x, this.pos.y, 50 * this.mass * this.mass,50 * this.mass * this.mass);
    line(width / 3 , height / 40, this.pos.x, this.pos.y);
  }
}

var Attractor = function() {
  this.pos = createVector(width / 2, height / 2);
  this.mass = 1;
  this.C = 1;

  this.attract = function(mover) {
    var force = p5.Vector.sub(this.pos, mover.pos);
    var d = force.mag();
    force.normalize();
    d = constrain(d, 1, 7);

    var strength = (this.C * mover.mass * this.mass) / (d * d);
    force.mult(strength);
    return force;
  }

  this.display = function() {
    fill(0);
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }
}