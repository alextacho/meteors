window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();

function GameEngine() {
    this.entities = [];
    this.ctx = null;
    this.playGame = null;
    
   // this.timer = new Timer();
    //this.stats = new Stats();
	
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.halfSurfaceWidth = null;
    this.halfSurfaceHeight = null;
    
   	this.player = null;
	this.lastUpdateTimestamp = null;
	this.deltaTime = null;

	this.meteors = null;

}

GameEngine.prototype.init = function(ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.halfSurfaceWidth = this.surfaceWidth/2;
    this.halfSurfaceHeight = this.surfaceHeight/2;
    
   	this.ui = $("#gameUI");
    this.uiIntro = $("#gameIntro");
    this.uiStats = $("#gameStats");
 	this.uiComplete = $("#gameComplete");
 	this.uiPlay = $("#gamePlay");
 	this.uiReset = $(".gameReset");
 	this.uiScore = $(".gameScore");
	
	this.uiStats.hide();
 	this.uiComplete.hide();
		
//	this.startInput();
    //document.body.appendChild(this.stats.domElement);
	this.startInput();
    console.log('game initialized');
}

GameEngine.prototype.startInput = function() {
    console.log('Starting input');
	
	var that = this;
	this.uiPlay.click(function(e) {
 		e.preventDefault();
 		that.uiIntro.hide();
		that.start();
 	});
 	
    this.uiReset.click(function(e) {
 		e.preventDefault();
 		that.uiComplete.hide();
		that.start();
 	});
    
    console.log('Input started');
}


GameEngine.prototype.addPlayer = function(myplayer) {
	this.player = myplayer;
}

GameEngine.prototype.start = function() {
	console.info("starting game");
	
	this.uiScore.html("0");
	this.uiStats.show();
	
	this.playGame = false;
	
	var that = this;
	(function gameLoop() {
		that.loop();
		requestAnimFrame(gameLoop, that.ctx.canvas);
	})();
}

GameEngine.prototype.loop = function() {
	var now = Date.now();
	this.deltaTime = now - this.lastUpdateTimestamp;
	this.update();
	this.draw();
	this.lastUpdateTimestamp = now;
};

GameEngine.prototype.draw = function() {
	this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
	this.ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
	this.ctx.save();
	this.player.draw(this.ctx);
	this.ctx.restore();
};

GameEngine.prototype.update = function() {
	this.player.update();
};

function Player(x,y) {
	console.info("Player created");

	this.x = x;
	this.y = y;
	this.width = 24;
	this.height = 24;
	this.halfWidth = this.width/2;
	this.halfHeight = this.height/2;
	
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	
	this.speed = 3;
	this.strifeSpeed = 3;
	this.vX = 0;
	this.vY = 0;
	
	initCtrl();
	
	function initCtrl() {
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
	
		$(window).keydown(function(e) {
			
			var keyCode = e.keyCode;
			
			if (keyCode==39) this.right = true;
			if (keyCode==37) this.left = true;
			if (keyCode==38) this.up = true;
			if (keyCode==40) this.down = true;
			
		});
	
		$(window).keyup(function(e) {
			var keyCode = e.keyCode;
			
			if (keyCode==39) this.right = false;
			if (keyCode==37) this.left = false;
			if (keyCode==38) this.up = false;
			if (keyCode==40) this.down = false;
		
		});
	}

};

Player.prototype.update = function() {
	this.vX = 0;
	this.vY = 0;
	console.log(this.right, this.left, this.up, this. down);
	if (this.left) {
		this.vX = -this.strifeSpeed;
	}
	if (this.right) {
		this.vX = this.strifeSpeed;
	}
	if (this.up) {
		this.vY = -this.speed;
	}
	if (this.down) {
		this.vY = this.speed;
	}
	console.log(this.vX, this.vY);
	this.x += this.vX;
	this.y += this.vY;

};

Player.prototype.draw = function(ctx) {
	ctx.fillStyle = "rgb(0,255,0)";
	ctx.fillRect(this.x+this.halfWidth, this.y-this.halfHeight, this.width, this.height);
};

function MeteorControl(engine) {
	engine.meteors = new Array();
}

function Meteor(x, y, radius, vX) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.vX = vX;

};



	


