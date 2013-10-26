//globals
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

songLength = 0;
beats = new Array();
volumes = new Array();
//Echonest API code
apiKey   ='1DXWYOVVQHNF7AR18';

function getSongData(trackURL, _title, _artist) {

    var context  = new webkitAudioContext();
    var url = 'http://developer.echonest.com/api/v4/song/search?format=json&bucket=audio_summary';
    $.getJSON(url, {title:_title, artist:_artist, api_key:apiKey}, function(data) {
        var analysisURL = data.response.songs[0].audio_summary.analysis_url;

        console.log(analysisURL);
        var remixer = createJRemixer(context, $, apiKey);
        remixer.remixTrackByURL(analysisURL, trackURL, function (track, percent) {
            console.log(percent);
            console.log(track.status);
            if (track.status == 'ok') {
                songLength = track.analysis.beats.length - 2;
                console.log('YES WE GOT THINGS ANALYZED WOOOO!');

                beats      = track.analysis.beats;
                console.log('got beats:  ', beats);
                for (var i = 0; i < songLength; i++) {
                    volumes.push(parseFloat(beats[i].oseg.loudness_max));
                }
                console.log('defined volumes');

                var max_volume = Math.max.apply(null, volumes);
                var min_volume = Math.min.apply(null, volumes);
                console.log('made it past the math.apply');
                console.log(min_volume);
                var range      = max_volume - min_volume;

                // setting correct x/y values for beats in song
                items.obstacles[0] = new Item(randomSquare(), 0, 0, 20, 20, 800, 
                getElevation(range, min_volume, volumes[0]), 20, 20, 5);
                for (var i = 1; i < songLength; i++) {
                //console.log(beatDifference(beats[i-1].duration));
                    items.obstacles[i] = new Item(randomSquare(), 0, 0, 20, 20, items.obstacles[i-1].x + beatDifference(parseFloat(beats[i-1].duration)), 
                    getElevation(range, min_volume, volumes[i]), 20, 20, 5);
                }   
                
            }
        });
    });
}

//API code ends here

function randomSquare() {
    var squares = ['red.png', 'orange.png', 'yellow.png', 'green.png', 'light_blue.png', 
        'dark_blue.png', 'purple.png', 'magenta.png', 'strawberry.png'];
    var image = new Image();
    image.src = 'assets/images/' + squares[Math.floor(Math.random() * 9)];
    return image;
}


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
        ctx.drawImage(randomSquare(), this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
}


function reset() {
}
//anonymous function
period = 0;
$(document).ready(function(){
	period = 1000/30; // milliseconds
	ctx = document.getElementById('game').getContext('2d');

	initialize();

	avatar.onload = function() {
        console.log("here");
		drawGame();
		setInterval(drawGame, period); // draw refers to the function
	};
});

function getElevation(range, min, volume) {
    return Math.round(380 * (volume - min) / range);
}
function beatDifference(beatDuration) {
    return 5 / (period / 1000) * beatDuration;
}

// initializes images/objects
function initialize() {
	avatar = new Image();
	avatar.src = 'assets/images/green.png';
	items.avatar = new Item(avatar, 0, 0, 20, 20, 0, 0, 20, 20, 5);
    if($("#r1").is(":checked"){
        var mp3 = 'Sail.mp3';
        var title = 'Sail';
        var band = 'Awolnation';
    }
    if($("#r2").is(":checked"){
        var mp3 = 'Freestyle.mp3';
        var title = 'Freestyle';
        var band = 'Taalbi Brothers';
    }
    if($("#r3").is(":checked"){
        var mp3 = 'Red_Oyster_Cult.mp3';
        var title = 'Red Oyster Cult';
        var band = 'Guster';
    }
    getSongData(mp3, title, band);
    
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

   for(var i = 0; i < songLength; i++) {
        items.obstacles[i].x -= items.obstacles[i].speed;
        $(items.obstacles[i].img).ready(function () {
            items.obstacles[i].drawObject();
        });
    }
}
function renderAvatar() {
	$(items.avatar.img).ready(function () {
		items.avatar.drawme();
	});
}


//will be used to detect interactions etc.
function gameLoops(){

    for (var i = 0; i < songLength; i++) {
        if(collision(items.avatar,items.obstacles[i])){
            alert("you dead");
         }
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
