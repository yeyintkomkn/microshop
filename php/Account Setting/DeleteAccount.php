
<?php
	session_start();
?>
<?php
	  include"../Database.php"
?>
 <?php

	$LoginID=$_SESSION["loginID"];
	if(DeleteAccount($LoginID) && DeletePost($LoginID) && DeleteWishlistAndLove($LoginID)){
		echo 1;
	}

 ?>
