<?php 
	session_start();
?>
<?php
	include"onepostdetail_db.php";  
?>


<?php
	$post_id=$_POST["post_id"];	//post id
	$type=$_POST["type"];
	
	
	if($type=="checkAlreadyLove"){
		$loginID=$_SESSION["loginID"];	//get session login id		
		if(checkAlreadyLove($post_id,$loginID)){
			echo 1;		//if already love
		}
	}
	if($type=="getTotalLove"){	//if to get totalLove
		$love=getTotalLove($post_id);
		echo $love;
	}
	
	
	
?>