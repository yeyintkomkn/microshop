<?php
	session_start();
?>
 <?php
	  include"userpost_db.php";
 ?>

 <?php
		$img1 = addslashes(file_get_contents($_FILES["image1"]["tmp_name"]));
		$img1type = $_FILES["image1"]["type"];
		$img1size = $_FILES["image1"]["size"];

		$img2 = addslashes(file_get_contents($_FILES["image2"]["tmp_name"]));
		$img2type = $_FILES["image2"]["type"];
		$img2size = $_FILES["image2"]["size"];

		$img3 = addslashes(file_get_contents($_FILES["image3"]["tmp_name"]));
		$img3type = $_FILES["image3"]["type"];
		$img3size = $_FILES["image3"]["size"];

	$category=$_POST["category"];
	$name=$_POST["name"];
	$price=$_POST["price"];
	$code=$_POST["code"];
	$description=$_POST["description"];
	$city=$_POST["city"];
	if(isset($_POST["gender"])){
		$gender=$_POST["gender"];
	}
	$type=$_POST["type"];	//to determind whether Insert of Update

	//echo $img1;
	if(	($img1type == "image/jpeg" || $img1type == "image/png" || $img1type == "image/gif")
		&& ($img2type == "image/jpeg" || $img2type == "image/png" || $img2type == "image/gif")
		&& ($img3type == "image/jpeg" || $img3type == "image/png" || $img3type == "image/gif") ) {

			if( $img1size<100000 || $img2size<100000 || $img3size<100000 ){
					$loginID=$_SESSION["loginID"];
					if($type=="insert"){
						if(insertPost($loginID,$category,$name,$price,$code,$description,$gender,$city,$img1,$img2,$img3)){	//1 is account_id , I must change it later
							echo "Upload Success";
						}
						else{
							echo "Sorry there was an error uploading your image";
						}
					}
					else if($type=="update"){
						$post_id=$_POST["post_id"];
						if(updatePost($post_id,$loginID,$category,$name,$price,$code,$description,$gender,$city,$img1,$img2,$img3)){	//1 is account_id , I must change it later
							echo "Update Success";
						}
						else{
							echo "Sorry there was an error in Updateing";
						}
					}
			}
			else{
				echo "Sorry, your file is too large";
			}

	}
	else{
		echo "Sorry, only JPG, JPEG & GIF files are allowed.";
	}


	//echo "Name=".$name."	Price=".$price."	Code=".$code."	Description=".$description;
	//echo $type;
 ?>
