//globals
score = 0;
levelnumber = 1;
moveup = false;
movedown = false;
moveright = false;
moveleft = false;
items = {
    obstacles: [],
    avatar: null,
    obstacles2: [],
    coin: null
};

interval = null;

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
                
                items.obstacles2[0] = new Item(randomSquare(), 0, 0, 20, 20, 800, 
                getElevation(range, min_volume, max_volume+volumes[0]), 20, 20, 5);

                for (var i = 1; i < songLength; i++) {
                //console.log(beatDifference(beats[i-1].duration));
                    items.obstacles[i] = new Item(randomSquare(), 0, 0, 20, 20, items.obstacles[i-1].x + beatDifference(parseFloat(beats[i-1].duration)), 
                    getElevation(range, min_volume, volumes[i]), 20, 20, 5);
                    
                    items.obstacles2[i] = new Item(randomSquare(), 0, 0, 20, 20, items.obstacles2[i-1].x + beatDifference(parseFloat(beats[i-1].duration)), 
                    getElevation(range, min_volume, max_volume + volumes[i]), 20, 20, 5);

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
        
        var canvas = document.getElementById('game');
        this.ctxheight = canvas.height-20;
        this.ctxwidth  = canvas.width-20;
	this.breathefire = function () {
		alert("breathing fire");
	}
		
	this.drawme = function () {
        if (moveup){
            if(this.y - this.speed <= 0)
                this.y =0;
            else  this.y -= this.speed;   
            
        }
        if(movedown){
            if(this.y+this.speed >= this.ctxheight)
                this.y = this.ctxheight;
            else  this.y += this.speed;
        }
        if(moveleft){
            if(this.x - this.speed <= 0)
                this.x=0;
            else  this.x -= this.speed;
        }
        if(moveright){
            if(this.x + this.speed >= this.ctxwidth)
                this.x= this.ctxwidth;
            else  this.x += this.speed;
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

    if($(".r").is(":checked")){
        

       

    };
    	$("#play").click(function(){
            period = 1000/30; // milliseconds
        ctx = document.getElementById('game').getContext('2d');
             initialize();

//media player
 if($("#r1").is(":checked")){
     $('#sound_element').html(
"<embed src='"+'Sail.mp3'+"' hidden=true autostart=true loop=false>");
      
    }
    if($("#r2").is(":checked")){
      $('#sound_element').html(
"<embed src='"+'Freestyle.mp3'+"' hidden=true autostart=true loop=false>");
    }
    if($("#r3").is(":checked")){
     $('#sound_element').html(
"<embed src='"+'Red_Oyster_Cult.mp3'+"' hidden=true autostart=true loop=false>");
    }




                avatar.onload = function() {
                console.log("here");
                //drawGame();
        	interval = setInterval(drawGame, period); // draw refers to the function
            };

        });
    	
});

function getElevation(range, min, volume) {
    return Math.round(380 * (volume - min) / range);
}
function beatDifference(beatDuration) {
    return 5 / (period / 1000) * beatDuration;
}

function createCoin(){
        var coin = new Image();
        coin.src = 'assets/images/coin.png';
        return new Item(coin, 0, 0, 20, 20, Math.random() * 380, Math.random() * 780, 20, 20, 0);
}


// initializes images/objects
function initialize() {

        items.coin = createCoin();
	avatar = new Image();
	avatar.src = 'assets/images/green.png';
	items.avatar = new Item(avatar, 0, 0, 20, 20, 0, 0, 20, 20, 5);
    if($("#r1").is(":checked")){
        var mp3 = 'Sail.mp3';
        var title = 'Sail';
        var band = 'Awolnation';
    }
    if($("#r2").is(":checked")){
        var mp3 = 'Freestyle.mp3';
        var title = 'Freestyle';
        var band = 'Taalbi Brothers';
    }
    if($("#r3").is(":checked")){
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
          
        items.obstacles2[i].x -= items.obstacles2[i].speed;
        $(items.obstacles2[i].img).ready(function () {
            items.obstacles2[i].drawObject();
        });
    }
    $(items.coin.image).ready(function() {
        items.coin.drawme();
    });

}


function renderAvatar() {
	$(items.avatar.img).ready(function () {
		items.avatar.drawme();
	});
}

//will be used to detect interactions etc.
function gameLoops(){

    for (var i = 0; i < songLength; i++) {
        if(collision(items.avatar,items.obstacles[i]) || 
           collision(items.avatar,items.obstacles2[i])){
            var image = new Image();
            image.src = 'assets/images/screen_over.png';
            ctx.drawImage(image, 86,0);
            clearInterval(interval);
         }
    }
    if(collision(items.avatar, items.coin)) {
      console.log("Got Coin!");
      items.coin = createCoin();
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
