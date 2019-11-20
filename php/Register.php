<?php
	include"Database.php"
?>

 <?php

 $name=$_POST["name"];
 $email=strtolower($_POST["email"]);// change to lowercase
 $phone=$_POST["phone"];
 $gender=$_POST["gender"];
 $birthday=$_POST["birthDate"];
 $password=$_POST["password"];
 $question=$_POST["question"];
 $answer=$_POST["answer"];
$profilepicture = addslashes(file_get_contents($_FILES["profilepicture"]["tmp_name"]));
$profilepicture_type = $_FILES["profilepicture"]["type"];
$profilepicture_size = $_FILES["profilepicture"]["size"];
if ($profilepicture_type=="image/jpeg" && $profilepicture_size<100000 ) {
	if(checkAlreadyEmail($email)){
	 	if(checkAlreadyPhone($phone)){
	 		if(insertData($name,$email,$phone,$gender,$birthday,$password,$question,$answer,$profilepicture)){
	 			echo 3;
	 		}
			else {
				echo 4;
			}
	 	}
 }
}
else {
	echo 2;
}

//echo $name."\n".$email."\n".$phone."\n".$gender."\n".$birthday."\n".
//$password."\n".$question."\n".$answer."\n".$profilepicture_type;

 ?>
