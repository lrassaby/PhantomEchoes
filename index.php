<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Phantom Echoes</title>
<link rel="stylesheet" href="assets/css/style.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="assets/js/game.js"></script>
<!-- EchoNest Scripts -->
<script type="text/javascript" src="remix.js/remix.js"></script>
<script type="text/javascript" src="remix.js/test.js"></script>
</head>
    <h1 id="big_header"> 
    Phantom Echoes
    </h1>
<body> <!-- onload="startGame()" -->

<div id="game_wrapper">
    <canvas id="game" height="400" width="800"></canvas>
</div>
<form action="upload.php" method="post"
      enctype="multipart/form-data">
    <label for="file">Filename:</label>
    <input type="file" name="file" id="file"><br>
    <input type="submit" name="submit" value="Submit">
</form>
</body>
</html>

<script type="text/javascript">
function startUpload(){
  document.getElementById('upload_process').style.display = 'block';
  document.getElementById('drop-zone').style.display = 'none';
  document.getElementById('result').style.display = 'none';

  return true;
}
function stopUpload(success){
  var result = '';
  if (success == 1){
     result = '<span class="msg">The file was uploaded successfully!<\/span><br/><br/>';
    
  }
  else {
     result = '<span class="emsg">There was an error during file upload! </br>Make sure filetype is .mp3.<\/span><br/>';
  }
    $('#file').val("");
  document.getElementById('upload_process').style.display = 'none';
  document.getElementById('result').innerHTML = result;
  document.getElementById('result').style.display = 'block'; 
  document.getElementById('drop-zone').style.display = 'block';      
  return true;   
}

function hideForm(){
    $('#the_table').remove();
}

function submitForm(){  

    $('#submit').trigger('click');
}

function removeChart(){ 
    d3.select("#the_chart").remove();       
    $.get('unlink.php');
    return false;       
}
</script>