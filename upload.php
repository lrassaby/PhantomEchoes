<?php

if($_SERVER['REQUEST_METHOD'] == 'POST') {
   
     
    $allowedExts = array("mp3");
    $extension = end(explode(".", $_FILES["file"]["name"]));
    if ( isset($_FILES["file"]["type"]) && in_array($extension, $allowedExts))
    { 
         if ($_FILES["file"]["error"] > 0) {
                        echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
                    }
            else{
                    $result = 1;
                    move_uploaded_file($_FILES["file"]["name"], "upload/" . $FILES["file"]["name"]);
            }
    }    
    else {
                     sleep(1);
                     echo "Incorrect filetype, please use .mp3 <br />";
                     $result = 0;
             }


}
?>

<script language="javascript" type="text/javascript"> window.top.window.stopUpload(<?php echo $result; ?>); </script>