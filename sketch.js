const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground
var rope,rope2,rope3
var link1,link2,link3
var fruit,fruit2,fruit3
var coelinho_img
var fruit_img
var background_img
var coelho
var btn1,btn2,btn3
var blink
var eat
var sad
var backsound
var airsound
var cuttsound
var sadsound
var eatsound
var btnair,btnair2,btnair3
var mutebtn

function preload() {
  background_img = loadImage("assets/background.png")
  fruit_img = loadImage("assets/melon.png")
  coelinho_img = loadImage("assets/Rabbit-01.png")
  eat=loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png")
  sad=loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png")
  blink=loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
  backsound = loadSound("assets/sounds/sound1.mp3")
  airsound = loadSound("assets/sounds/air.wav")
  cuttsound = loadSound("assets/sounds/cutting through foliage.mp3")
  sadsound = loadSound("assets/sounds/sad.wav")
  eatsound = loadSound("assets/sounds/eating_sound.mp3")
  blink.playing=true
  eat.playing=true
  sad.playing=true
  eat.looping=false
  sad.looping=false
  blink.looping=true
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20
  ground = new Ground(200,690,600,20)
 
  rope = new Rope(6,{x:245,y:30})
  rope2 = new Rope(6,{x:353,y:46})
  rope3 = new Rope(6,{x:186,y:45})
 
  fruit = Bodies.circle(300,300,15)
  fruit2 = Bodies.circle(300,300,15)
  fruit3 = Bodies.circle(300,300,15)
 
  Matter.Composite.add(rope.body,fruit)
  Matter.Composite.add(rope2.body,fruit2)
  Matter.Composite.add(rope3.body,fruit3)
  
  link1 = new Link(rope,fruit)
  link2 = new Link(rope2,fruit2)
  link3 = new Link(rope3,fruit3)
  
  coelho = createSprite(250,650,100,100)
  coelho.addAnimation("blink",blink)
  coelho.addAnimation("eat",eat)
  coelho.addAnimation("sad",sad)
  coelho.scale = 0.2
 
  btn1 = createImg("assets/cut_btn.png")
  btn1.position(220,30)
  btn1.size(50,50)
  btn1.mouseClicked(drop)

  btn2 = createImg("assets/cut_btn.png")
  btn2.position(330,35)
  btn2.size(50,50)
  btn2.mouseClicked(drop2)

  btn3 = createImg("assets/cut_btn.png")
  btn3.position(163,35)
  btn3.size(50,50)
  btn3.mouseClicked(drop3)
  
  btnair = createImg("assets/balloon.png")
  btnair.position(10,200)
  btnair.size(150,100)
  btnair.mouseClicked(airBalloon)

  btnair2 = createImg("assets/balloon.png")
  btnair2.position(10,250)
  btnair2.size(150,100)
  btnair2.mouseClicked(airBalloon2)

  btnair3 = createImg("assets/balloon.png")
  btnair3.position(10,300)
  btnair3.size(150,100)
  btnair3.mouseClicked(airBalloon3)
 
  mutebtn = createImg("assets/mute.png")
  mutebtn.position(450,20)
  mutebtn.size(50,50)
  mutebtn.mouseClicked(mute)
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
  
}

function draw() 
{
  background(51);
  image(background_img,width/2,height/2,width,height)
  Engine.update(engine);
  //backsound.play()
  backsound.setVolume(0.1)
  ground.display()
  rope.show()
  rope2.show()
  rope3.show() 

  if (fruit!=null) {
    image(fruit_img,fruit.position.x,fruit.position.y,60,60)
  }
 
  if (collide(fruit,coelho)) {
    coelho.changeAnimation("eat")
    eatsound.play()
    World.remove(world,fruit)
    fruit=null
  }
  if (fruit!=null&&fruit.position.y>650) {
    coelho.changeAnimation("sad")
    //sadsound.play()
    sadsound.setVolume(0.1)
    fruit=null
  }

 //fruta 2
  if (fruit2!=null) {
    image(fruit_img,fruit2.position.x,fruit2.position.y,60,60)
  }
 
  if (collide(fruit2,coelho)) {
    coelho.changeAnimation("eat")
    eatsound.play()
    World.remove(world,fruit2)
    fruit2=null
  }
  if (fruit2!=null&&fruit2.position.y>650) {
    coelho.changeAnimation("sad")
    sadsound.play()
    fruit2=null
  }
  //fruta 3
  if (fruit3!=null) {
    image(fruit_img,fruit3.position.x,fruit3.position.y,60,60)
  }
 
  if (collide(fruit3,coelho)) {
    coelho.changeAnimation("eat")
    eatsound.play()
    World.remove(world,fruit3)
    fruit3=null
  }
  if (fruit3!=null&&fruit3.position.y>650) {
    coelho.changeAnimation("sad")
    sadsound.play()
    fruit3=null
  }

  drawSprites()
  textSize(15)
  textAlign(CENTER,CENTER)
  text("x" + mouseX + " / y"+ mouseY,mouseX,mouseY)
}

function drop() {
  rope.break()
  link1.detach()
  link1 = null;
  cuttsound.play()
}

function drop2() {
  rope2.break()
  link2.detach()
  link2 = null;
  cuttsound.play()
}

function drop3() {
  rope3.break()
  link3.detach()
  link3 = null;
  cuttsound.play()
}

function collide(body,sprite) {
  if (body!=null) {
    var D=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (D<=80) {
     
      
      return true
    } else {
      return false
    }
  }
}
function airBalloon() {
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  airsound.play()
}

function airBalloon2() {
  Matter.Body.applyForce(fruit2,{x:0,y:0},{x:0.01,y:0})
  airsound.play()
}

function airBalloon3() {
  Matter.Body.applyForce(fruit3,{x:0,y:0},{x:0.01,y:0})
  airsound.play()
}

function mute() {
  if (backsound.isPlaying()) {
    backsound.stop()
  } else {
    backsound.play()
  }
}

