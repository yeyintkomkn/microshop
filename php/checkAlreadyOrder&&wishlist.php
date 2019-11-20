<?php
	session_start();
?>
<?php
	include"onepostdetail_db.php";
?>


<?php
	$post_id=$_POST["post_id"];	//post id
	$loginID=$_SESSION["loginID"];	//get session login id
	$type=$_POST["type"];
	
	if($type=="checkAlreadyOrder"){
		if(checkAlreadyOrder($post_id,$loginID)){
		echo 1;		//if already order
		}
	}
	if($type=="checkAlreadyWishList"){
		if(checkAlreadyWishList($post_id,$loginID)){
		echo 1;		//if already love
		}
	}
	
	

?>
