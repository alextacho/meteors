function Control(socket) {
	
	this.socket = socket;
	
	this.initialize = function() {
		console.info("initializing control");
		//alert("init control");
		
		
		//**************************
		// Detects if the current device is an iPhone.
		function detect()
		{
		   if (navigator.platform.indexOf("iPhone") != -1) {
			  //alert("is iphone");
		   	  isIphone();
		   } else {
			  isPC();
		   }
		}
		
		detect();
		
		console.debug("initializing control");
		/*addEventListener( 'mousemove', onMouseMove, false);
		
		addEventListener( 'orientationchange', onOrientationChange, false );
		addEventListener( 'devicemotion', onMotionChange, false );

		
		updateOrientation();*/
		
	};
	
	var isPC = function() {
		console.info("device is PC");
		//PC Stuff	
		var right = false;
		var left = false;
		var up = false;
		var down = false;
		
		$(window).keydown(function(e) {
			var keyCode = e.keyCode;
			
			var tmpright = right;
			var tmpleft = left;
			var tmpup = up;
			var tmpdown = down;
			var changed = false;
			
			if (keyCode==39) right = true;
			if (keyCode==37) left = true;
			if (keyCode==38) up = true;
			if (keyCode==40) down = true;
			
			if (right!=tmpright || left!=tmpleft ||
				up!=tmpup || down!=tmpdown) {
				
				console.log("key down - sending event");
				this.socket.emit("ctrl message", left, right, up, down);
			}
		});
	
		$(window).keyup(function(e) {
			var keyCode = e.keyCode;
					
			if (keyCode==39) right = false;
			if (keyCode==37) left = false;
			if (keyCode==38) up = false;
			if (keyCode==40) down = false;
			console.log("key up - sending event");
			this.socket.emit("ctrl message", left, right, up, down);
		});

	};
	
	var isIphone = function() {
		//alert("device is iPnone");
		//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		window.addEventListener('devicemotion', function( event ) {
			
			left = right = false;
			//x = event.accelerationIncludingGravity.x;		
			if (event.accelerationIncludingGravity.y>'1') left = true;
			if (event.accelerationIncludingGravity.y<'-1') right = true;

			//z = event.accelerationIncludingGravity.z;		

			update();
		
			event.preventDefault();
		}, false);

		
		var right = false;
		var left = false;
		var up = false;
		var down = false;
		
				
		var onOrientationChange = function( event ) {
			updateOrientation();

			event.preventDefault();
		}

		var onMotionChange = function( event ) {
			
			left = right = false;
			//x = event.accelerationIncludingGravity.x;		
			if (event.accelerationIncludingGravity.y>'2') left = true;
			if (event.accelerationIncludingGravity.y<'-2') right = true;

			//z = event.accelerationIncludingGravity.z;		

			update();
		
			event.preventDefault();
		};

		function updateOrientation() {
			// Check if we're in portrait or landscape mode as we'll need
			// to use different values from the accelerometer
		
			if( window.orientation == 90 || window.orientation == -90 ) {
				orientation = 1;
			} else {
				orientation = 0;
			}
		}

		function update() {
		
			this.socket.emit("ctrl message", left, right, up, down);
			$('#messages').html("left: " + left + ", right: " + right);
		}
		
	};
};



/*Control.prototype = {

	onMouseMove : function( event ) {
						
		x = event.clientX;
		y = event.clientY;
		z = 0;
		
		update();
	};
	
	var onTouchMove = function( event ) {

		event.preventDefault();

	};

	var onOrientationChange = function( event ) {
		updateOrientation();

		event.preventDefault();
	}

	var onMotionChange = function( event ) {
		var beta = orientation === 1 ? -event.accelerationIncludingGravity.z : -event.accelerationIncludingGravity.z;
		var gamma = orientation === 1 ? -event.accelerationIncludingGravity.y : -event.accelerationIncludingGravity.x;

		x = event.accelerationIncludingGravity.x;		
		y = event.accelerationIncludingGravity.y;		
		z = event.accelerationIncludingGravity.z;		

		update();
		
		event.preventDefault();
	}

	function updateOrientation() {
		// Check if we're in portrait or landscape mode as we'll need
		// to use different values from the accelerometer
		
		if( window.orientation == 90 || window.orientation == -90 ) {
			orientation = 1;
		} else {
			orientation = 0;
		}
	}

	function update() {
		
		//socket.emit('ctrl message', "x: " + x + ", y: " + y);
	    //$('#messages').html("x: " + x + ", y: " + y);
	}


};*/
