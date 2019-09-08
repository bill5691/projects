// William Skiles
// ITEC 345
// Programming Assignment 2

/* Function to get an element from its name **/
function getElement(elementName) {
    var element = document.getElementById(elementName);
    return element;
}

/* Function to move an object by a given number of pixels **/
function objPos(div, dx, dy) {
	var obj = getElement(div);
	var posX = parseInt(obj.style.left);
	var posY = parseInt(obj.style.top);
	var objHeight = parseInt(obj.style.height);
	var objWidth = parseInt(obj.style.width);
	var objNewLeft = posX + dx;
	var objNewTop = posY + dy;
	
	// Canvas boundaries predetermined since objects are technically not drawn onto the play area canvas.
	// Prevents objects from passing through game boundaries
	if ((posX + (objWidth/2) <= 878) && 
		(posX + (objWidth/2) >= 40) && 
		(posY + (objHeight/2) <= 755) && 
		(posY + (objHeight/2) >= 220)) {
		obj.style.top = objNewTop;
		obj.style.left = objNewLeft;
	} else {
		if (posX + (objWidth/2) > 878) {
			dx = -1;
			objNewLeft = posX + dx;
			obj.style.top = objNewTop;
			obj.style.left = objNewLeft;
		} else if (posX + (objWidth/2) < 40) {
			dx = 1;
			objNewLeft = posX + dx;
			obj.style.top = objNewTop;
			obj.style.left = objNewLeft;
		} else if (posY + (objHeight/2) > 755) {
			dy = -1;
			objNewTop = posY + dy;
			obj.style.top = objNewTop;
			obj.style.left = objNewLeft;
		} else {
			dy = 1;
			objNewTop = posY + dy;
			obj.style.top = objNewTop;
			obj.style.left = objNewLeft;
		}
	}
}

/* Function to detect collision between objects **/
function checkCollision() {
	var obj1 = getElement('PACMAN');
	var obj2 = getElement('GHOST');
	var bCollided = false;
	
	if (parseInt(obj1.style.left) < parseInt(obj2.style.left) + parseInt(obj2.style.width) &&
		parseInt(obj1.style.left) + parseInt(obj1.style.height) > parseInt(obj2.style.left) &&
		parseInt(obj1.style.top) < parseInt(obj2.style.top) + parseInt(obj2.style.height) &&
		parseInt(obj1.style.top) + parseInt(obj1.style.height) > parseInt(obj2.style.top)) {
			console.log("Collision detected");
			bCollided = true;
			obj1.style.top = 205;
			obj1.style.left = 30;
			obj2.style.top = 695
			obj2.style.left = 30;
		}
		
		return bCollided;
}

/* Object constructor with movement functions **/
function object(divId, delay) {
	this.name = divId;
    this.moveTimer = 0;
	this.moveDelay = delay;
	var dx = 0;
	var dy = 0;
	
	this.moveRight = function() {
		dx = 1;
		dy = 0;
		
		clearInterval(this.moveTimer);
		this.moveTimer = setInterval( function() {
			objPos(divId, dx, dy);
			if (checkCollision() == true) {
				alert("Pacman loses!");
				clearInterval(this.moveTimer);
			}
		}, this.moveDelay);
	};	
	
	this.moveLeft = function() {
		dx = -1;
		dy = 0;
		
		clearInterval(this.moveTimer);
		this.moveTimer = setInterval( function() {
			objPos(divId, dx, dy);
			if (checkCollision() == true) {
				alert("Pacman loses!");
				clearInterval(this.moveTimer);
			}
		}, this.moveDelay);
	};
	
	this.moveUp = function() {
		dx = 0;
		dy = -1;
		
		clearInterval(this.moveTimer);
		this.moveTimer = setInterval( function() {
			objPos(divId, dx, dy);
			if (checkCollision() == true) {
				alert("Pacman loses!");
				clearInterval(this.moveTimer);
			}
		}, this.moveDelay);
	};
	
	this.moveDown = function() {
		dx = 0;
		dy = 1;
		
		clearInterval(this.moveTimer);
		this.moveTimer = setInterval( function() {
			objPos(divId, dx, dy);
			if (checkCollision() == true) {
				alert("Pacman loses!");
				clearInterval(this.moveTimer);
			}
		}, this.moveDelay);
	};
	
	this.stop = function() {
		clearInterval(this.moveTimer);
	};
}