<?php
	include "userpost_db.php";
	include "onepostdetail_db.php";
?>

<?php
	$post_id=$_POST["id"];
	// DeletePost() is delete data from userpost_db and DeleteallPost() is delete data from onepostdetail_db
	if(DeletePost($post_id) && DeleteallPost($post_id)){
		echo 1;
	}

	else{
		echo 2;
	}
?>
