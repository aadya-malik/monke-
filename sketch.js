var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana , bananaImg;
var obstacle, obstacleImg;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0
var obstaclesGroup, FoodGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImg = loadImage('banana.png');
obstacleImg = loadImage('stone.png');

}

function setup() {

  createCanvas(800,400);
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}
function spawnBananas(){
  if(frameCount%150===0){
    banana=createSprite(800,Math.round(random(250,350)),30,30);
    banana.addImage(bananaImg)
    banana.velocityX = -2;
    banana.scale = 0.07
    player.depthh = banana.depth + 1
    banana.lifetime = 500;
FoodGroup.add(banana)
  
  }
  
}
function spawnObstacles(){
  if(frameCount%190===0){
   obstacle=createSprite(800,Math.round(random(250,350)),30,30);
    obstacle.addImage(obstacleImg)
    obstacle.velocityX = -2;
    obstacle.scale = 0.07
    player.depth = obstacle.depth + 1
    obstacle.lifetime = 500;

obstaclesGroup.add(obstacle);
  }
  
}
function draw() { 
  background(0);

 
  if(gameState===PLAY){
    
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
   
   spawnBananas()
   spawnObstacles()
    text(score,200,200,50,50)
if(FoodGroup.isTouching(player)){

FoodGroup.destroyEach()


}
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
  if(gameState === END){
    backgr.velocityX = 0;
player.visible = false


FoodGroup.destroyEach( ) 
obstaclesGroup.destroyEach( )

textSize(20)
fill(255)
text("Game Over!",400,200)

  }
  if(obstaclesGroup.isTouching( player) ){ 
  gameState = END
  }
  drawSprites();
}

