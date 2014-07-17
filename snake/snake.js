var JS_SNAKE = (function() {


  //grid size
  var COLS = 30, 
      ROWS = 20;
      TILE_SIZE = 15;

  //grid content
  var EMPTY = 0, 
      SNAKE = 1, 
      FRUIT = 2;

  //snake direction
  var LEFT = 0, 
      UP = 1, 
      RIGHT = 2, 
      DOWN = 3;

  //event listener/handlers
  var KEY_LEFT = 37, 
      KEY_UP = 38, 
      KEY_RIGHT = 39, 
      KEY_DOWN = 40,
      SPACE_BAR = 32;

  var FPS = 5;

  var canvas, 
      ctx, 
      keystate, 
      frames, 
      score;

  var grid = {
    width:null,
    height: null,
    _grid: null,

    init: function(d, c, r) {
      this.width = c;
      this.height = r;
      this._grid = [];

      for (var x = 0; x < c; x++) {
        this._grid.push([]);
        for(var y = 0; y < r; y++) {
          this._grid[x].push(d);
        }
      }
    },

    set: function(val, x, y) {
      this._grid[x][y] = val;
    },

    get: function(x, y) {
      return this._grid[x][y];
    }
  }

  
  var snake = {
    direction: null,
    head: null,
    _queue: null,

    init: function( d, x, y) {
      this.direction = d;
      this._queue = [];
      //create horizontal snake of length 3
      this.insert(x, y);
      this.insert(x + 1, y);  
      this.insert(x + 2, y);
    },

    insert: function(x, y) {
      //prepends coordinates to queue
      this._queue.unshift({x:x, y:y});
      this.head = this._queue[0];
    },

    remove: function() {
      return this._queue.pop();
    }
  }

  function setFood() {
    var empty = [];
    for (var x=0; x< grid.width; x++) {
      for (var y=0; y < grid.height; y++) {
        if (grid.get(x,y) === EMPTY) {
          empty.push({x:x, y:y});
        }
      }
    }
    var randpos = empty[Math.floor(Math.random() * empty.length)];
    grid.set(FRUIT, randpos.x, randpos.y);
  }

  function play() {
    canvas = document.createElement("canvas");
    canvas.width = COLS * TILE_SIZE;
    canvas.height = ROWS * TILE_SIZE;
    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d");
    ctx.font = "12px Helvetica";
    frames = 0;
    keystate = {};

    document.addEventListener("keydown", function(evt) {
      keystate[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function(evt) {
      delete keystate[evt.keyCode];
    });

    init();
   
    loop();

  }

  function init() {
    grid.init(EMPTY, COLS, ROWS);
    score = 0;

    //snake's starting point
    var sp = {x: 1, y:Math.floor(ROWS/3)};
    snake.init(RIGHT, sp.x, sp.y);

    //initial snake length of 3
    grid.set(SNAKE, sp.x, sp.y);
    grid.set(SNAKE, sp.x+1, sp.y);
    grid.set(SNAKE, sp.x+2, sp.y);

    setFood();
  }

  function loop() {
    update();
    draw();
    window.requestAnimationFrame(loop, canvas);
  }

  function update() {
    frames++;

    if (keystate[KEY_LEFT] && snake.direction !== RIGHT) snake.direction = LEFT;
    if (keystate[KEY_UP] && snake.direction !== DOWN) snake.direction = UP;
    if (keystate[KEY_RIGHT] && snake.direction !== LEFT) snake.direction = RIGHT;
    if (keystate[KEY_DOWN] && snake.direction != UP) snake.direction = DOWN;

    if (frames % FPS === 0) {
      var nx = snake.head.x;
      var ny = snake.head.y;

      switch(snake.direction) {
        case LEFT:
          nx--;  break;
        case UP:
          ny--;  break;
        case RIGHT:
          nx++;  break;
        case DOWN:
          ny++;  break;
      }

      //edge and snake collision check
      if ( nx < 0 || nx > grid.width-1  ||
           ny < 0 || ny > grid.height-1 ||
           grid.get(nx, ny) === SNAKE ) {

        return init();

      }

      //fruit collision check
      if (grid.get(nx, ny) === FRUIT) {
        score += 10;
        setFood();
      } else {
        var tail = snake.remove();
        grid.set(EMPTY, tail.x, tail.y);

      }
      
      grid.set(SNAKE, nx, ny);
      snake.insert(nx, ny);
    }
  }

  //paint grid to canvas
  function draw() {
 
    var ts = TILE_SIZE;

    //draw empty, snake, and fruit tiles
    for (var x=0; x< grid.width; x++) {
      for (var y=0; y < grid.height; y++) {
        switch(grid.get(x,y)) {
          case EMPTY:
            ctx.fillStyle = "#fff";
            ctx.fillRect(x * ts, y * ts, ts, ts);
            break;

          case SNAKE:
            ctx.fillStyle = "blue";
            ctx.strokeStyle = "white";
            ctx.fillRect(x * ts, y * ts, ts, ts);
            ctx.strokeRect(x * ts, y * ts, ts, ts);
            break;

          case FRUIT:
            ctx.fillStyle = "#0a0";
            ctx.beginPath();
            var radius = ts / 2;
            var nx = x * ts + radius;
            var ny = y * ts + radius;
            ctx.arc(nx, ny, radius, 0, Math.PI * 2, true);
            ctx.fill();
            break;
        }   
      }
    }
    //add score
    ctx.fillStyle = "000";
    ctx.fillText("SCORE: " + score, 10, canvas.height - 10);
  }

  return {
    play: play
  };
})();

JS_SNAKE.play();



