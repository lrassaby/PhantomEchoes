<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Phantom Echoes</title>
<link rel="stylesheet" href="assets/css/style.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<!-- EchoNest Scripts -->
<script type="text/javascript" src="remix.js/remix.js"></script>
<script type="text/javascript">
       
            if( $('#r1').is(":checked")){
                $('#r2').prop("checked",false);
                $('#r3').prop("checked",false);
            }
            if($('#r2').is(":checked")){
                $('#r1').prop("checked",false);
                $('#r3').prop("checked",false);
            }
            if($('#r3').is(":checked")){
                $('#r2').prop("checked",false);
                $('#r1').prop("checked",false);
            }
     
</script>

<script src="assets/js/game.js"></script>
<!-- <script type="text/javascript" src="remix.js/test.js"></script> -->
</head>
    <h1 id="big_header"> 
    Phantom Echoes
    </h1>
<body> <!-- onload="startGame()" -->
<!-- game  -->
<div id="game_wrapper">
    <canvas id="game" height="400" width="800"></canvas>
    
</div>
<button id="play" >Play Button</button>
<div id='sound_element'></div>
<input type='radio' class="r"id="r1"></input>
<input type='radio' class="r"id="r2"></input>
<input type='radio' class="r"id="r3"></input>

<!-- uploader/form -->
<!-- <form action="upload.php" method="post"
      enctype="multipart/form-data">
    <label for="file">Filename:</label>
    <input type="file" name="file" id="file"><br>
    <input type="submit" name="submit" value="Submit">
</form>
<div id="upload_process" style="display:none">Loading...<br/><img src="assets/images/loader.gif" /></div>
                        <div id="result"></div> -->
</body>
</html>
