
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint=Matter.Constraint;
var player,football,goalpost,ground,launcher;
var score=0;
var invisible;
var cheersound;
var goalkeeper;

function preload()
{
	player=loadImage("images/player1.png")
	playground=loadImage("images/plaground2.png")
	cheersound=loadSound("images/cheer.mp3")
      goalkeeper=loadImage("images/goal1.png")
}

function setup() {
	createCanvas(1300, 600);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
football=new Football(100,570,30,30)
goalpost=new Goalpost(900,180,300,400)
ground=new Ground(650,590,1300,20)
launcher=new Launcher(football.body,{x:180,y:300})

invisible=new Invisible(1050,450,30,30)
	//Engine.run(engine);
  
}


function draw() {
	background("white")
  background(playground);
  textSize(30)
  stroke("green")
  text("GOAL="+score,500,100) 
  textSize(20)
  text("Hit The Circle",1020,350)
  Engine.update(engine)
  image(player,50,260,200,300);
football.display();
goalpost.display();
ground.display();
 launcher.display();
 
 invisible.display()
 detectCollision(football,invisible)
 if(score===10){
	 
	image(goalkeeper,800,280,100,200)
	
		
	}
	 

 
 //drawSprites();
 
}

function mouseDragged(){
	Matter.Body.setPosition(football.body,{x:mouseX,y:mouseY})
	
}
function mouseReleased(){
	launcher.fly();
}
function keyPressed(){
	if(keyCode===32){
		Matter.Body.setPosition(football.body,{x:180,y:300})
		launcher.attach(football.body);
	}
}

function detectCollision(lfootball,lgoalpost){
	var footballbody=lfootball.body.position;
	var goalpostbody=lgoalpost.body.position;

var distance=dist(footballbody.x,footballbody.y,goalpostbody.x,goalpostbody.y)
if(distance<lfootball.r+lgoalpost.r){
	score++;
	cheersound.play();
}
}
