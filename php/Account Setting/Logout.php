
<?php 
	session_start();
?>
<?php
	  include"../Database.php"
?>
 <?php 
 
	$LoginID=$_SESSION["loginID"];
	if(updateActive($LoginID,0)){
		session_unset();
		session_destroy();
		echo 1;
	}
	
 ?>
