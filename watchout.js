var settings = {
  w: window.innerWidth,
  h: window.innerHeight,
  r: 25,
  n: 30,
  duration: 4500
};


d3.select('.scoreboard').selectAll('div')
  .data(['#dcdcdc','#C5C5CE','#a9a9a9'])
  .transition().duration(1000)
  .style("background", function(o){
    return o;
   })

var resetScore = function(){
  score = 0;
  highScore = 0;
  collisionCount = 0;
}

  d3.selectAll('btn')
  .data(['#dcdcdc','#C5C5CE','#a9a9a9'])
  .transition().duration(1000)
  .style("background", function(o){
    return o;
   })

var mouse = { x: settings.w/2, y: settings.h/2};
var score = 0, highScore = 0, collisionCount = 0;

var pixelize = function(number) {
  return number + 'px';
}

var rand = function(n) { return Math.floor( Math.random() * n )};
var randX = function() { return pixelize( rand(settings.w-settings.r*2) ) };
var randY = function() { return pixelize( rand(settings.h-settings.r*2) ) };

var updateScore = function() {
  d3.select('.scoreboard .current span').text(score);
  d3.select('.scoreboard .high span').text(highScore);
  d3.select('.scoreboard .collisions span').text(collisionCount);
};


var board = d3.select('.board').style({
  width: pixelize( settings.w ),
  height: pixelize( settings.h )
});

d3.select('.mouse').style({
  top: pixelize( mouse.y ),
  left: pixelize( mouse.x ),
  width: pixelize( settings.r*2 ),
  height: pixelize( settings.r*2 ),
  'border-radius': pixelize( settings.r*2 ),
  'background-color': 'white',
  opacity: 0.9,
});


var asteroids = board.selectAll('.asteroid')
  .data(d3.range(0,settings.n))
  .enter()
  .append('div')
  .attr('class', 'asteroid')
  .style({
    top: randY,
    left: randX,
    width: pixelize( settings.r*2 ),
    height: pixelize( settings.r*2 ),
    'background-image': 'url(pacman_green_art.svg)',
  })

board.on('mousemove', function() {
  var loc = d3.mouse(this);
  mouse = { x: loc[0], y: loc[1] };
  d3.select('.mouse').style({
    top: pixelize( mouse.y - settings.r ),
    left: pixelize( mouse.x - settings.r )
  })

});

d3.select('.diff')
.on('click', function(){
  resetScore();
})


d3.selectAll(".diff")
   .data('Just Kidding').enter().append("svg:circle")
   .append("svg:title")
   .text(function(d) { return d.text; });




var move = function(element) {  

  element.transition().duration(settings.duration).style({
    top: randY,
    left: randX
  }).each('end', function(){
    move( d3.select(this) );
  });
}

move(asteroids);

var scoreTicker = function(){
  score = score+1;
  highScore = Math.max(score, highScore);
  updateScore();
};

setInterval(scoreTicker, 1);

var prevCollision = false;

var detectCollisions = function() {

  var collision = false;

  asteroids.each(function(){
    var cx = this.offsetLeft + settings.r;
    var cy = this.offsetTop + settings.r;

    var x = cx - mouse.x;
    var y = cy - mouse.y;
    if( Math.sqrt(x*x + y*y) < settings.r*2 ) {
      collision = true;
    }
  });

  if(collision){
    score = 0;
    board.style('background-image', 'url(dragon.jpg)');
    if (prevCollision != collision) {
      collisionCount = collisionCount + 1;
    }
  } else {
    board.style('background-image', 'url(aria.png)');

  }

  prevCollision = collision;

};

if(score > 2000){
   settings.duration -= 500;
}


d3.timer(detectCollisions)
