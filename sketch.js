var monkey
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
gamestate = "play"

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(900, 500)
  monkey = createSprite(50, 400)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.15

  ground = createSprite(450, 450, 1000, 20);
  ground.shapeColor = "black"
  score = 0
  FoodGroup = new Group()
  obstacleGroup = new Group()
}


function draw() {
  background("lightgreen")
  if (gamestate === "play") {
    if (frameCount % 90 === 0) {
      obstacle = createSprite(1110, 420)
      obstacle.addImage("obstacle", obstaceImage)
      obstacle.scale = 0.15
      obstacle.velocityX = -(5 + score / 10)
      obstacleGroup.add(obstacle)
    }
    if (frameCount % 160 === 0) {
      banana = createSprite(1110, 350)
      banana.addImage(bananaImage)
      banana.velocityX = -(5 + score / 10)
      banana.scale = 0.1
      FoodGroup.add(banana)
    }
    text("score:" + score, 50, 250)
    if (monkey.isTouching(FoodGroup)) {
      score = score + 10
      FoodGroup.destroyEach()
    }
    
    monkey.collide(ground)

    if (keyDown("space") && monkey.y > 390) {
      monkey.velocityY = -15;

    }
    monkey.velocityY = monkey.velocityY + 0.8

    if (obstacleGroup.isTouching(monkey)) {
      gamestate = "end"
    }

  }
    
    if (gamestate == "end"){
      obstacleGroup.setVelocityXEach (0)
      obstacleGroup.setLifetimeEach  (-1)
      FoodGroup.setVelocityXEach (0)
      FoodGroup.setLifetimeEach  (-1)
      monkey.collide(ground)
    }

    if (keyDown("space")&&gamestate === "end"){
      FoodGroup.destroyEach()
      obstacleGroup.destroyEach()
      gamestate = "play"
    }  
  
  
  drawSprites();
}