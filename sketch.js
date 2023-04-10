

var PLAY = 2;
var END = 0;
var gameState = PLAY;


//Variáveis de personagem e cenário
var comeco,comecoImg
var candyBoy
var candyBoyImg,candyBoymImg
var monstro,monstroImg
var fundo,fundoImg
var chaoInv
var reiniciar,reiniciarImg
var comecar,comecarImg
var gameOver,gameOverImg
var ground,groundImg;
var jumpSound, dieSound;


function preload(){
  //imagen e animações
  candyBoyImg = loadAnimation("cdbF1.png","cdbF2.png");
  candyBoymImg = loadAnimation("cdbM.png");
  monstroImg = loadImage("monstro.png");
  reiniciarImg = loadImage("reiniciar.png");
  fundoImg = loadImage("cenariofinal.png");
  comecoImg = loadImage("começo.png");
  comecarImg = loadImage("começar.png")
  gameOverImg = loadImage("gameover.png")
  groundImg = loadImage("chão.png")
  //Sons
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
}


function setup() {


  createCanvas(windowWidth,windowHeight);


  monsterGroup = new Group();


  fundo = createSprite(width/2,height/2);
  fundo.addImage(fundoImg);
  fundo.scale = 0.9
 
  candyBoy = createSprite(200,height-390,20,50);
  candyBoy.addAnimation("correndo",candyBoyImg);
  candyBoy.addAnimation("morto",candyBoymImg);
  candyBoy.scale = 0.1;


  ground = createSprite(width-150,height-100)
  ground.addImage(groundImg);
 
  reiniciar  = createSprite(width/2,height/2-100);
  reiniciar.addImage(reiniciarImg)
  reiniciar.scale = 0.2
 
  gameOver = createSprite(width/2,height/2-200)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.1


}


function draw() {
  candyBoy.collide(ground);




if(gameState === PLAY){
 
  gameOver.visible=false;
  reiniciar.visible=false;


  ground.velocityX = -10;
  candyBoy.changeAnimation("correndo",candyBoyImg);
 
  if((touches.length>0 || keyDown("SPACE")) && candyBoy.y >= 210) {
      candyBoy.velocityY = -12;
      jumpSound.play();
      touches = [];
  }


  candyBoy.velocityY = candyBoy.velocityY + 0.9


  if (ground.x < width/4+200){
    ground.x = fundo.width/2;
  }


  spawnMonstros();
  if(monsterGroup.isTouching(candyBoy)){
    dieSound.play();
    gameState = END;
  }
}


if(gameState === END){


  //esta velocidade dá bug, é muito alta.
  candyBoy.velocityY = candyBoy.velocityY + 100


  candyBoy.changeAnimation("morto",candyBoymImg);
  candyBoy.scale=0.1;
  reiniciar.visible=true;
  gameOver.visible=true;
  ground.velocityX=0;
  monsterGroup.destroyEach();


  if(touches.length>0 ||mousePressedOver(reiniciar)) {
    reset();
  }
}


  drawSprites();
}


function reset(){


  gameOver.visible = false;
  reiniciar.visible = false;
 
  monsterGroup.destroyEach();
  gameState = PLAY
}




function spawnMonstros() {
  if(frameCount % 140 === 0) {
    monstro = createSprite(width+30,height-250,10,40);
    monstro.scale=0.1
    monstro.addImage(monstroImg)
    monstro.velocityX=-9
    monsterGroup.add(monstro);
  }    
}



