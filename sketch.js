var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, restartImage;        
var cactusGroup, cloudGroup;
var score = 0;
var gameState = "play";
var gameover;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  restartImage = loadImage("restart.png");
  
  gameendImage = loadImage("gameOver.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obstacleImage6 = loadImage("obstacle6.png");
  
  checkPoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
}

function setup() {
  background(220)
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.scale = 0.5;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
    
  cactusGroup = new Group();
  cloudGroup = new Group();
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  
  gameover = createSprite(300,125,30,30);
  gameover.addImage("restart", restartImage);
  gameover.scale = 0.5;
  
  ground.velocityX = -7;
  
  //creating invisible ground
  

}

function draw() {
  //set background color
  background(0);
  
  
  
  textSize(20);
  text(score, 300,30);
  
  if(gameState == "play"){
      // jump when the space key is pressed
    if(keyDown("space")&& trex.y == 149) {
      trex.velocityY = -12;
      jump.play();
    }
    
    gameover.visible = false;
    
    /*if(World.frameCount%60 ==0){
      trex.velocityY = -12;
      jump.play();
    }*/
    
    
    
    
    
    cactusGroup.setVelocityXEach(-(7 + score/50));
    cloudGroup.setVelocityXEach(-(7 + score/50));
    ground.velocityX = -(7 + score/50);    
    
    
    if(World.frameCount%5 == 0){
    score = score+1;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    //Spawn Clouds
    spawnClouds();
    
    obstacle();
    
    if(score%100 == 0){
      checkPoint.play();
    }
    
    
  }
  else{
    ground.velocityX = 0;
    cactusGroup.setVelocityEach(0,0); 
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-160)
    cactusGroup.setLifetimeEach(-160);
    
    
    text("Game Over!", 250, 80);
    
    trex.changeAnimation("collided", trex_collided);
    
    gameover.visible = true;
    
    if(mousePressedOver(gameover)){
      reset();
    }
  }
  
  if(cactusGroup.collide(trex)){
    gameState = "gameOver";
    die.play();
  }
 
  
  trex.setCollider("circle",0,0,50);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //stop trex from falling down
  trex.collide(ground);
  
  
  console.log(gameState);
  
  drawSprites();
  
  
  
}

//function to spawn the clouds
function spawnClouds(){
   if(World.frameCount%50 == 0){
      var cloud = createSprite(600,random(50,100),40,10);
      cloud.velocityX = -7;
      cloud.addImage(cloudImage);
      cloud.lifetime = 160;
      trex.depth = cloud.depth + 1;
     
      cloudGroup.add(cloud);
   }
   
  
  
 }

function obstacle(){
   if(World.frameCount%60 == 0){
     var cactus = createSprite(600,160,10,50);
     cactus.velocityX = -7;
     var r = Math.round(random(1,6));
     cactus.scale = 0.5; 
     cactus.lifetime = 160;
     cactusGroup.add(cactus);
     //console.log(r);
     switch(r){
       case 1: cactus.addImage(obstacleImage1);
         break;
       case 2: cactus.addImage(obstacleImage2);
         break;
       case 3: cactus.addImage(obstacleImage3);
         break;
       case 4: cactus.addImage(obstacleImage4);
         break;
       case 5: cactus.addImage(obstacleImage5);
         break;
       case 6: cactus.addImage(obstacleImage6);
         break;
      
     }
     
   }
   
}

function reset() {
  gameState = "play";
  score = 0;
  gameover.visible = false;
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
}
 

