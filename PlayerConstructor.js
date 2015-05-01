var Player = function(x,y, id){
	d3.select('.container').select('svg')

	.append("circle")
	.attr("cx", x)
	.attr("cy", y)
	.attr("r", 10)
	.style("fill", "grey");
	this.id = id;
}

var addPlayers = function(n){
	for(var i = 0; i < n; i++){

		var x = Math.random() * window.innerWidth;
		var y = Math.random() * window.innerHeight;

	var playa = new Player(x,y,i);
	playerArray.push(playa);
	}
}



// Player.prototype.startingLocation = Math.random() * window.width + x;


Player.prototype.x = 30;
Player.prototype.y = 0;
Player.prototype.angle = 0;
Player.prototype.r = 5;


// Player.prototype.rednder = functnio


Player.prototype.getX = function(){
	return this.x;
};

Player.prototype.setX = function(x){
	var max;
	var min;
	max = this.gameOptions.padding;
	min = this.gameOptions.height - this.gameOptions.padding;
	if (x <= min) x = min;
	if (x >= max) x = max;	
}

Player.prototype.getY = function(){
	return this.y;
};

Player.prototype.setY = function(y){
	var max;
	var min;
	max = this.gameOptions.padding;
	min = this.gameOptions.height - this.gameOptions.padding;
	if (y <= min) y = min;
	if (y >= max) y = max;	
}





