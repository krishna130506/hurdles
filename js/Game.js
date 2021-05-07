class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      car1 = createSprite(10,300);
      car1.addImage("car1",car1_img);
      car1.scale = 0.35;
      car1.setCollider("rectangle",0,0);
      car1.debug=true;
      
      car2 = createSprite(10,500);
      car2.addImage("car2",car2_img);
      car2.scale = 0.35;
      car2.setCollider("rectangle",0,0);
      car2.debug=true;
      
      car3 = createSprite(10,700);
      car3.addImage("car3",car3_img);
      car3.scale = 0.35;
      car3.setCollider("rectangle",0,0);
      car3.debug=true;
      car4 = createSprite(10,900);
      car4.addImage("car4",car4_img);
      car4.scale = 0.35;
      car4.setCollider("rectangle",0,0);
      car4.debug=true;
      cars = [car1, car2, car3, car4];
      
      
      ground1 = createSprite(310,700,displayWidth *5,20);
      ground2 = createSprite(110,900,displayWidth *5,20);
      ground3 = createSprite(310,1100,displayWidth *5,20);
      ground4 = createSprite(110,1300,displayWidth *5,20);
      ground1.debug=true;
      ground2.debug=true;
      ground3.debug=true;
      ground4.debug=true;
      ground1.setCollider("rectangle",0,0);
      ground2.setCollider("rectangle",0,0);
      ground3.setCollider("rectangle",0,0);
      ground4.setCollider("rectangle",0,0);
      
      
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      player.getCarsAtEnd();
      

      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track,0,360,displayWidth*4, displayHeight+60);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var y = 430 ;
        var x = 0;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          y = y + 180;
          //use data form the database to display the cars in y direction
          x = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x, y, 70, 70);
            cars[index - 1].shapeColor = "black";
            camera.position.y = displayWidth/2;
            camera.position.x = cars[index-1].x;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance -=10;
        player.update();
      }
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(player.distance <= -6300){
        gameState = 2;
       
        player.rank += 1;
        Player.updateCarsAtEnd(player.rank);
        
      }
      drawSprites();
    }
  
    end(){
      
      console.log("Game Ended");
      console.log(player.rank);
    }
  }
  