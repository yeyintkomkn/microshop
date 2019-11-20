
<?php
	  include"Database.php";
?>
 <?php 
	//start
	session_start();
	?>
 
 <?php 
	$email=strtolower($_POST["email"]);
	$password=$_POST["password"];
	//echo $email;
	if($LoginID=checkAccountDB($email,$password)){
		$_SESSION["loginID"]=$LoginID;// to get id other php file
		updateActive($LoginID,1);
		
		$type=checkUserType($LoginID);
		if($type=="advance"){
			echo 1;
		}
		else if($type=="normal"){
			echo 2;
		}
	}
 ?>
