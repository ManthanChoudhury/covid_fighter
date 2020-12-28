function load() {
    //player,gem,virus
    enemy_image = new Image;
    enemy_image.src = "Assets/v1.png";
    player_image = new Image;
    player_image.src = "Assets/superhero.png";
    gem_image = new Image;
    gem_image.src = "Assets/gem.png";
}

function init() {
    //?for intial state
    //objects in game
    // used from html
    canvas = document.getElementById("mycanvas");
    // height width control
    W = 700;
    H = 400;
    canvas.width = W;
    canvas.height = H;

    //create gesture
    pen = canvas.getContext('2d');
    console.log(pen);
    game_over =false;
    
    // json enemy
    e1 = {
        x : 150,
        y : 50,
        w : 60,
        h : 60,
        speed :20,
    };
    e2 = {
        x : 300,
        y : 200,
        w : 60,
        h : 60,
        speed :30,
    };
    e3 = {
        x : 450,
        y : 20,
        w : 60,
        h : 60,
        speed :40,
    };
   
// array of enemy for ease of itration 
    enemy = [e1,e2,e3];
    // player prop 
    player = {
        x : 20,
        y : H/2,
        w : 60,
        h : 60,
        speed:20,
        moving : false,
        health :50,
};
    //gem static
    gem = {
        x : W -100,
        y : H/2,
        w : 60,
        h : 60,
};
    // event listener
    canvas.addEventListener('mousedown',function(){
        console.log("mouse pressed");
        player.moving = true; 
        });
    canvas.addEventListener('mouseup',function(){
        console.log("mouse relesed");
        player.moving = false; 
        });
};
function isOverlap(rect1,rect2){
    //collision dection
if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
    return true
    }
    return false;
}

//!for draw
function draw() {
    //clear old screen
    pen.clearRect(0,0,W,H);
    // to fill color
    pen.fillStyle = "red";
    // make rectangele
    //?pen.fillRect(box.x,box.y,box.w,box.h);
    // single image
    //?pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    //! player image
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    //! gem image
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    for (let i = 0; i < enemy.length; i++) {
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    pen.fillStyle ="white";
    pen.fillText("Score "+player.health,10,10);
}

//!for update
function update() {
    if(player.moving == true){
        player.x += player.speed;
        player.health += 20;
}
    for(let i =0 ; i<enemy.length;i++){
        if(isOverlap(enemy[i],player)){
            player.health -= 50;
            if(player.health <0 ){
                console.log(player.health);
                game_over =true;
                alert("Bye Bye Game over" + player.health);
                
               
               }
        }
    }
    
    
    if(isOverlap(player,gem)){
        
       console.log("You won");
        alert("Hurrrrryrrr You won !!");
        game_over =true;
        return;
       }
    
    //!
    // for single object
    /*box.y +=box.speed;
    if(box.y >= H - box.h  || box.y < 0){ // to reverse dirt to safe exit box
        box.speed *= -1;
    }*/
    // for enemy array speed ,direction,postion
    for (i = 0; i< enemy.length; i++) {
        enemy[i].y += enemy[i].speed;
       
        if (enemy[i].y > H - enemy[i].h || enemy[i].y <0 ) {
            enemy[i].speed *= -1;
        }
        
    }
    
}
    
//!to call them
function gameloop() {
    if(game_over == true){
       clearInterval(f);
       }
    draw();
    update();
    console.log("In gameloop");
}

load();
init();
  
f = setInterval(gameloop,100);

