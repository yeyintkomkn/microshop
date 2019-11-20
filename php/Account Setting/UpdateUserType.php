
<?php 
	session_start();
?>
<?php
	  include"../Database.php"
?>
 <?php 
 
	$LoginID=$_SESSION["loginID"];
	if(updateuser_type($LoginID)){
		echo 1;
	}
	
 ?>
