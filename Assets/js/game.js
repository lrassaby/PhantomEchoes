//global variables
score = 0;
levelnumber = 1;
moveup = false;
movedown = false;
moveright = false;
moveleft = false;
items = {
	obstacles: [],
	avatar: null
};

//Object prototype
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
		
	this.drawme = function () {
      
        if (moveup){
            this.y -= this.speed;           
        }
        if(movedown){
            this.y += this.speed;
        }
        if(moveleft){
            this.x -= this.speed;

        }
        if(moveright){
            this.x += this.speed;
        }
		ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
	}
    this.drawObject = function () {
        ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
}


function reset() {
}
//anonymous function
$(document).ready(function(){
	delay = 1000/30; // milliseconds
	ctx = document.getElementById('game').getContext('2d');
	initialize();

	avatar.onload = function() {
         console.log("here");
		drawGame();
		setInterval(drawGame, delay); // draw refers to the function
	};
});
// initializes images/objects
function initialize() {
	avatar = new Image();
	avatar.src = 'assets/images/simon.png';
	items.avatar = new Item(avatar, 0, 0, 638, 850, 0, 0, 20, 20, 5);
    items.objects = new Item(avatar, 0, 0, 638, 850, 900, 200, 20, 20, 5);


    //need creation array here
	
    //key listeners
    document.addEventListener("keydown", KeyDown, false);
    document.addEventListener("keyup", KeyUp, false);

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
                moveleft=true;
                break;
            case 39:
            case 68:
               moveright=true;
                break;
            case 38:
            case 87:
                moveup=true;
                break;
            case 40:
            case 83:
                movedown=true;
                break;
        }
    }
    function KeyUp(evt)
    {
        var KeyID = evt.keyCode;
        switch(KeyID)
        {
            case 32:
                items.avatar.breathefire();
                break;
            case 37:
            case 65:
                moveleft=false;
                break;
            case 39:
            case 68:
                moveright=false;
                break;
            case 38:
            case 87:
                moveup=false;
                break;
            case 40:
            case 83:
                movedown=false;
                break;
        }
    }
}


//calls rendering functions
function drawGame() {
	renderBackgrounds();
	//addOverlays();
	renderAvatar();	

    renderObjects();	

        gameLoops();
    
}

function renderBackgrounds () {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, 800, 400);
}

function addOverlays() {
}

function renderObjects(){
    items.objects.x-=items.objects.speed;
    $(items.objects.img).ready(function () {
        items.objects.drawObject();
    });


}
function renderAvatar() {
	$(items.avatar.img).ready(function () {
		items.avatar.drawme();
	});
}


//will be used to detect interactions etc.
function gameLoops(){

    if(collision(items.avatar,items.objects)){
        alert("you dead");
    }

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
