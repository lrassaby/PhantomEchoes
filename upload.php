<?php

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    //**********************************************************************************************
     
    echo "Please wait while we attempt to upload your file...<br><br>";
     
    //**********************************************************************************************
     
     
    $target_path = "uploads/";
     
    $flag = 0; // Safety net, if this gets to 1 at any point in the process, we don't upload.
     
    $filename = $_FILES['uploadedfile']['name'];
    $filesize = $_FILES['uploadedfile']['size'];
    $mimetype = $_FILES['uploadedfile']['type'];
     
    $filename = htmlentities($filename);
    $filesize = htmlentities($filesize);
    $mimetype = htmlentities($mimetype);
     
    $target_path = $target_path . basename( $filename );
     
    if($filename != ""){
     
    echo "Beginning upload process for file named: ".$filename."<br>";
    echo "Filesize: ".$filesize."<br>";
    echo "Type: ".$mimetype."<br><br>";
     
    }
     
    //First generate a MD5 hash of what the new file name will be
    //Force a MP3 extention on the file we are uploading
     
    $hashedfilename = md5($filename);
    $hashedfilename = $hashedfilename.".mp3";
     
    //Check for empty file
    if($filename == ""){
    $error = "No File Exists!";
    $flag = $flag + 1;
     
    }
     
    //Now we check that the file doesn't already exist.
    $existname = "uploads/".$hashedfilename;
     
    if(file_exists($existname)){
     
    if($flag == 0){
    $error = "Your file already exists on the server!  
    Please choose another file to upload or rename the file on your
    computer and try uploading it again!";
    }
     
    $flag = $flag + 1;
    }
     
    //Whitelisted files - Only allow files with MP3 extention onto server...
     
    $whitelist = array(".mp3");
    foreach ($whitelist as $ending) {
     
    if(substr($filename, -(strlen($ending))) != $ending) {
     $error = "The file type or extention you are trying to upload is not allowed!  
    You can only upload MP3 files to the server!";
    $flag++;
    }
    }
     
     
    //Now we check the filesize.  If it is too big or too small then we reject it
    //MP3 files should be at least 1MB and no more than 6.5 MB
     
    if($filesize > 6920600){
    //File is too large
     
    if($flag == 0){
    $error = "The file you are trying to upload is too large!  
    Your file can be up to 6.5 MB in size only.  
    Please upload a smaller MP3 file or encode your file with a lower bitrate.";
    }
     
    $flag = $flag + 1;
    }
     
    if($filesize < 1048600){
    //File is too small
     
    if($flag == 0){
    $error = "The file you are trying to upload is too small!
    Your file has been marked as suspicious because our system has
    determined that it is too small to be a valid MP3 file.
    Valid MP3 files must be bigger than 1 MB and smaller than 6.5 MB.";
    }
     
    $flag = $flag + 1;
     
    }
     
    //Check the mimetype of the file
    if($mimetype != "audio/x-mp3" and $mimetype != "audio/mpeg"){
     
    if($flag == 0){
    $error = "The file you are trying to upload does not contain expected data.
    Are you sure that the file is an MP3?";
    }
     
    $flag = $flag + 1;
    }
     
    //Check that the file really is an MP3 file by reading the first few characters of the file
    $f = @fopen($_FILES['uploadedfile']['tmp_name'],'r');
    $s = @fread($f,3);
    @fclose($f);
    if($s != "ID3"){
     
    if($flag == 0){
    $error = "The file you are attempting to upload does not appear to be a valid MP3 file.";
    }
     
    $flag++;
    }
     
     
     
    //All checks are done, actually move the file...
     
    if($flag == 0){
     
    if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
       
     
        //Change the filename to MD5 hash and FORCE a MP3 extention.
     
        if(@file_exists("uploads/".$filename)){
     
        //Rename the file to an MD5 version
        rename("uploads/".$filename, "uploads/".$hashedfilename);
     
        echo "The file ".  basename( $filename ). "
         has been uploaded.  Your file is <a href='uploads/$hashedfilename'>here</a>.";
       
        }  
        else{
          echo "There was an error uploading the file, please try again!";
        }
     
     
    } else{
        echo "There was an error uploading the file, please try again!";
    }
     
    }
    else {
    echo "File Upload Failed!<br>";
    if($error != ""){
    echo $error;
    }
    }
}    
?>