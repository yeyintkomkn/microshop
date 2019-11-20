<?php

 $servername = "localhost";
 $username = "root";
 $password = "";
 $dbname = "microshop";

//----------###### Create connection#####------------
	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

//----------###Love##----------------------------------
function checkAlreadyLove($post_id,$account_id){
	$sql = "SELECT account_id
			FROM onepostdetail_tb
			WHERE post_id='$post_id'
			AND action='love'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			if($row["account_id"]==$account_id)
				return true;
		}
		return false;
	}
	else{
		return false;
	}
	$GLOBALS["conn"]->close();
}

function insertLove($post_id,$account_id){
	$conn=$GLOBALS["conn"];
	$sql = "INSERT INTO onepostdetail_tb(account_id,post_id,action)
			VALUES('$account_id','$post_id','love')";

	if ($conn->query($sql) === true) {
		return true;
	}
	else{
		return false;
	}

	$conn->close();
}

//----if unlove-------
function deleteLove($post_id,$account_id){
	$conn=$GLOBALS["conn"];
	$sql = "DELETE
			FROM onepostdetail_tb
			WHERE post_id='$post_id'
			AND account_id='$account_id'
			AND action='love'";

	if ($conn->query($sql) === true) {
		return true;
	}
	return false;

	$conn->close();
}

function getTotalLove($id){
	$sql = "SELECT COUNT(account_id) As love
			FROM onepostdetail_tb
			WHERE post_id='$id'
			AND action='love'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["love"];
	}
	$GLOBALS["conn"]->close();
}
//--------------------------------------------------------
//----------------###Order###-------------------------
function checkAlreadyOrder($post_id,$account_id){
	$sql = "SELECT account_id
			FROM onepostdetail_tb
			WHERE post_id='$post_id'
			AND action='order'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			if($row["account_id"]==$account_id)
				return true;
		}
		return false;
	}
	else{
		return false;
	}
	$GLOBALS["conn"]->close();
}


function insertOrder($post_id,$account_id){
	$conn=$GLOBALS["conn"];
	$sql = "INSERT INTO onepostdetail_tb(account_id,post_id,action)
			VALUES('$account_id','$post_id','order')";

	if ($conn->query($sql) === true) {
		return true;
	}
	else{
		return false;
	}

	$conn->close();
}

//----------------###WishList###-------------------------
function checkAlreadyWishList($post_id,$account_id){
	$sql = "SELECT account_id
			FROM onepostdetail_tb
			WHERE post_id='$post_id'
			AND action='wishlist'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			if($row["account_id"]==$account_id)
				return true;
		}
		return false;
	}
	else{
		return false;
	}
	$GLOBALS["conn"]->close();
}


function insertWishList($post_id,$account_id){
	$conn=$GLOBALS["conn"];
	$sql = "INSERT INTO onepostdetail_tb(account_id,post_id,action)
			VALUES('$account_id','$post_id','wishlist')";

	if ($conn->query($sql) === true) {
		return true;
	}
	else{
		return false;
	}

	$conn->close();
}

//----if unsave-------
function deleteWishList($post_id,$account_id){
	$conn=$GLOBALS["conn"];
	$sql = "DELETE
			FROM onepostdetail_tb
			WHERE post_id='$post_id'
			AND account_id='$account_id'
			AND action='wishlist'";

	if ($conn->query($sql) === true) {
		return true;
	}
	return false;

	$conn->close();
}
//----if delete post from seller-------
function DeleteallPost($post_id){
	$sqli = "DELETE FROM onepostdetail_tb WHERE post_id='$post_id'";
	$result = $GLOBALS["conn"]->query($sqli);

	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

?>
