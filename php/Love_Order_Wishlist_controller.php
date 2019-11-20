<?php
	session_start();
?>
<?php
	include"onepostdetail_db.php";

?>


<?php
	$post_id=$_POST["id"];			//post id
	$loginID=$_SESSION["loginID"];
	$type=$_POST["type"];
	if($type=="wishlist"){
		if(checkAlreadyWishList($post_id,$loginID)){	//if already wishlist
			if(deleteWishList($post_id,$loginID)){
				echo "DeleteWishlist";
			}
		}
		else{
			if(insertWishList($post_id,$loginID)){	//in onepostdetail-db
				echo "SuccessWishList";
			}
		}
	}
	if($type=="love"){
		if(checkAlreadyLove($post_id,$loginID)){
			if(deleteLove($post_id,$loginID)){	//if unlove,delete record from databse
				$love=getTotalLove($post_id);
				echo $love;

			}
		}
		else{
			if(insertLove($post_id,$loginID)){	//if insertLove success
				$love=getTotalLove($post_id);
				echo $love;
			}
		}
	}
	if($type=="order"){
		if(checkAlreadyOrder($post_id,$loginID)){	//if already Order
				echo "You have aleredy order this item";
		}
		else {
			if(insertOrder($post_id,$loginID)){	//in onepostdetail-db
				echo "SuccessOrder";
			}
		}
	}
	

?>
