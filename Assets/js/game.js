score = 0;
levelnumber = 1;
items = {
	obstacles: [],
	avatar: null
};

function Item (img, sx, sy, swidth, sheight, x, y, width, height, speed) {
	this.img = img;
	this.sx = sx;
	this.sy = sy;
	this.swidth = swidth;
	this.sheight = sheight;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;

	this.breathefire = function () {
		alert("breathing fire");
	}
	
	this.moveup = function () {
		alert("moving up");
	}
	
	this.movedown = function () {
		alert("moving down");
	}
	
	this.moveleft = function () {
		alert("moving left");
	}
		
	this.moveright = function () {
		alert("moving right");
	}
	
	this.drawme = function () {
		ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	}
}


function reset() {
}

$(document).ready(function(){
	delay = 4000; // milliseconds
	ctx = document.getElementById('game').getContext('2d');
	initialize();
	avatar.onload = function() {
		drawGame();
		setInterval(drawGame, delay); // draw refers to the function
	};
});

function initialize() {
	avatar = new Image();
	avatar.src = 'assets/images/simon.png';
	items.avatar = new Item(avatar, 0, 50, 0, 30, 0, 50, 0, 50, 50);
	
    document.addEventListener("keydown", KeyDown, true);
    function KeyDown(evt)
    {
        var KeyID = evt.keyCode;
        switch(KeyID)
        {
        	case 32:
        		items.avatar.breathefire();
        		break;
            case 37:
            case 65:
                items.avatar.moveleft();
                break;
            case 39:
            case 68:
                items.avatar.moveright();
                break;
            case 38:
            case 87:
                items.avatar.moveup();
                break;
            case 40:
            case 83:
                items.avatar.movedown();
                break;
        }
    }
}


function drawGame() {
	//addBackgrounds();
	//addOverlays();
	addAvatar();		
}

function addBackgrounds () {
	ctx.fillStyle = "#191970";
	ctx.fillRect(0, 0, 800, 400);
}

function addOverlays() {
}

function addAvatar() {
	$(items.avatar.img).ready(function () {
		items.avatar.drawme();
	});
}

function collision(obj1, obj2){
    if (obj1.x + obj1.width - 5 < obj2.x) {
      	return false;
    } else if (obj1.y + obj1.height - 5< obj2.y) {
      	return false;
    } else if (obj1.x > obj2.x + obj2.width - 5) {
      	return false;
    } else if (obj1.y > obj2.y + obj2.height- 5){
     	return false;
    } else {
    	return true;
    }
}
