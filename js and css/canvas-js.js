function newGame(howFast, apple, snakeBody, backgroundColor) {
//clean choseMenu and create Canvas in div game
  $(".allMenus").html(" ");
  $('<canvas/>',{
      id:'canvas'
    }).appendTo(".game");
//variables
    let canvas = $("#canvas")[0];
    let resultSpan = $("#result")[0];
    let levelSpan = $("#level")[0];

    let size = 30;
    let speed = howFast;
    let snake = [];
    let currentApple;
    let currentMovement;
    let level = 1;
    let result = 0;
//canvas
    canvas.width = 21*size;
    canvas.height = 21*size;
    let c = canvas.getContext('2d');
//Sprite animations
    let coin = new Image();
    coin.src = apple;
    let snakeImg = new Image();
    snakeImg.src = snakeBody;
//functions:
    function SnakePiece(x,y) {
      this.x = x;
      this.y = y;
    };

    function createScnake(snake) {
      let nextX = 0;
      for (var i = 0; i <= 4; i++) {
           let newPiece = new SnakePiece(nextX,0);
           snake.push(newPiece);
           nextX += size;
      }
    }

    function Apple(x,y){
      this.x = x;
      this.y = y;
      this.framePosition = 0;
    }

    function createApple() {
      let randomX = Math.floor((Math.random() * 20) + 1)*size;
      let randomY = Math.floor((Math.random() * 20) + 1)*size;
      let permission = true;
      for (var i = 0; i < snake.length; i++) {
        if(snake[i].x == randomX && snake[i].y == randomY) {
          permission = false;
        }
      }
     if(permission){
      currentApple = new Apple(randomX, randomY)}
      else {createApple()}
    }

    function drawSnake(snake, apple, direction) {
      //draw background
        c.fillStyle = backgroundColor;
        c.fillRect(0,0, canvas.width, canvas.height);

      //draw snake
        for (var i = 0; i < snake.length; i++) {
         if(i == (snake.length - 1)){
           switch (direction) {
             case "up":
               c.drawImage(snakeImg, 0, 0, size, size, snake[i].x, snake[i].y, size, size)
               break;
            case "down":
               c.drawImage(snakeImg, size, 0, size, size, snake[i].x, snake[i].y, size, size)
               break;
            case "right":
               c.drawImage(snakeImg, size*2, 0, size, size, snake[i].x, snake[i].y, size, size)
               break;
            case "left":
               c.drawImage(snakeImg, size*3, 0, size, size, snake[i].x, snake[i].y, size, size)
               break;
             default:
           }
         }else {
           c.drawImage(snakeImg, size*4, 0, size, size, snake[i].x, snake[i].y, size, size)
         }
       } //for

      //draw diamond or coin
        c.drawImage(coin, apple.framePosition*size, 0, size, size, apple.x, apple.y, size, size);
          if(apple.framePosition < 9){
          apple.framePosition++;
        } else {apple.framePosition = 0;}
      }//drawSnake

    function crashCheck(snake){
      //end of the canvas
        if(snake[snake.length-1].x < 0 || snake[snake.length-1].y < 0 || snake[snake.length-1].x > canvas.width || snake[snake.length-1].y > canvas.height) {
          clearInterval(currentMovement);
          if (confirm("GAME OVER") == true) {
            location.reload();;
            } else {
            location.reload();;
             }
        }
      //bites itself
        for (var i = 0; i < snake.length-1; i++) {
          if (snake[i].x == snake[snake.length-1].x && snake[i].y == snake[snake.length-1].y) {
            //
            clearInterval(currentMovement);
            if (confirm("GAME OVER") == true) {
              location.reload();;
              } else {
              location.reload();;
               }
          }
        }
    }

    function eatCheck(snake, apple){
       if (snake[snake.length-1].x == apple.x && snake[snake.length-1].y == apple.y) {
         createApple();
         result++;
         levelCheck();
         createResult()
         return true;
       } else {
         return false;
       }
     }//eatcheck

     function levelCheck() {
       if(result > 0 && result % 10 == 0) {
           speed -= 10;
           level++;
       }
     }

     function createResult() {
       resultSpan.innerHTML = "RESULT: " + result;
       levelSpan.innerHTML = "LEVEL: " + level
     }

    function movement(direction, snake, apple){
      let newX;
      let newY;

        switch (direction) {
        case "up":
             newX = snake[snake.length-1].x;
             newY = snake[snake.length-1].y - size;
             break;
        case "down":
            newX = snake[snake.length-1].x;
            newY = snake[snake.length-1].y + size;
            break;
        case "right":
            newX = snake[snake.length-1].x + size;
            newY = snake[snake.length-1].y;
           break;
        case "left":
            newX = snake[snake.length-1].x - size;
            newY = snake[snake.length-1].y;
            break;
        default:
      }

       let newPiece = new SnakePiece(newX, newY);
       snake.push(newPiece);
       if(!eatCheck(snake, apple)) {
         snake.shift(); //skip if snake eated the apple
       }
       drawSnake(snake, apple, direction);
       crashCheck(snake);
    }//movement

    function crawling(direction) {
      clearInterval(currentMovement);
      currentMovement = setInterval(function(){movement(direction, snake, currentApple)}, speed);
    }

    function startGame() {
      createScnake(snake);
      createApple();
      drawSnake(snake, currentApple);
      crawling("right");
      createResult();
    }

    //eventListeners:
    $(document).keydown(function(e){
      switch (e.which) {
        case 38:
          crawling("up")
          break;
        case 37:
          crawling("left")
          break;
        case 40:
          crawling("down")
          break;
        case 39:
            crawling("right")
            break;
        default:
      }
    })

    //let start the game
    startGame();
};
