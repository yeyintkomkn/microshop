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


/*--------------------------*/
/*--------##Login##---------*/
/*--------------------------*/
function checkAccountDB($email,$password){
	##$conn=$GLOBALS["conn"];
	$sql = "SELECT * FROM accountinfo WHERE email='$email'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			if($row["email"]==$email && $row["password"]==$password){
				echo 3;
				return $row["id"];
				return true;
			}
			else{
				echo 2;
				//echo "The password that you've entered is incorrect.Please try again.";
				return false;
			}
	}
	else {
		echo 1;
		//echo "The email you entered doesn't appear to belong to an account.Please check your email address and try again.";
		return false;
	}
	$GLOBALS["conn"]->close();
}

//use both login and logout
function updateActive($LoginId,$Active){
	$sqli = "UPDATE accountinfo
			SET active=$Active
			WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sqli);
	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

//i forget this fun where i used
function getActive($LoginId){
	$sql = "SELECT active FROM accountinfo WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["active"];
	}
	$GLOBALS["conn"]->close();
}

//this fun is called from login.php
function checkUserType($LoginId){
	$sql = "SELECT user_type FROM accountinfo WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["user_type"];
	}
	$GLOBALS["conn"]->close();
}

//update advance user to sell item
function updateuser_type($LoginId){
	$sqli = "UPDATE accountinfo
			SET user_type='advance'
			WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sqli);
	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

/*----------------------------*/
/*----##Account Setting##-----*/
/*----------------------------*/
function getEmail($LoginId){
	$sql = "SELECT email FROM accountinfo WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["email"];
	}
	$GLOBALS["conn"]->close();
}

function getPassword($LoginId){
	$sql = "SELECT password FROM accountinfo WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["password"];
	}
	$GLOBALS["conn"]->close();
}

function getName($LoginId){
	$sql = "SELECT name FROM accountinfo WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["name"];
	}
	$GLOBALS["conn"]->close();
}

function getPhone($LoginId){
	$sql = "SELECT phone FROM accountinfo WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["phone"];
	}
	$GLOBALS["conn"]->close();
}

function getProfilePicture($LoginId){
	$sql = "SELECT profile_photo FROM accountinfo WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["profile_photo"];
	}
	$GLOBALS["conn"]->close();
}



function updateEmail($LoginId,$newemail){
	$sql = "UPDATE accountinfo
			SET email='$newemail'
			WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

function updatePassword($LoginId,$newpassword){
	$sql = "UPDATE accountinfo
			SET password='$newpassword'
			WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

function updateName($LoginId,$newname){
	$sql = "UPDATE accountinfo
			SET name='$newname'
			WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

function updatePhone($LoginId,$newphone){
	$sql = "UPDATE accountinfo
			SET phone='$newphone'
			WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

function DeleteAccount($LoginId){
	$sqli = "DELETE
           FROM accountinfo
           WHERE id=$LoginId";
	$result = $GLOBALS["conn"]->query($sqli);

	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

function DeletePost($LoginId){
	$sqli = "DELETE
           FROM userpost_tb
           WHERE userpost_tb.account_id=$LoginId";
	$result = $GLOBALS["conn"]->query($sqli);
	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

function DeleteWishlistAndLove($LoginId){
	$sqli = "DELETE
           FROM onepostdetail_tb
           WHERE onepostdetail_tb.account_id=$LoginId";
           /*AND onepostdetail_tb.post_id=(SELECT userpost_tb.id
                                         FROM userpost_tb
                                         WHERE userpost_tb.account_id=$LoginId)*/
	$result = $GLOBALS["conn"]->query($sqli);
	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}


/*---------------------*/
/*----##Register##-----*/
/*---------------------*/

// use in register and change-email and Recovery
function checkAlreadyEmail($newemail){
	$sql = "SELECT * FROM accountinfo WHERE email='$newemail'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 0) {
			return true;	// no email
	}
	else{
		return false;
	}
	$GLOBALS["conn"]->close();
}

//use both register and change-phone
function checkAlreadyPhone($newphone){
	$sql = "SELECT * FROM accountinfo WHERE phone='$newphone'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 0) {
		return true;
	}
	else{
		return false;
	}
	$GLOBALS["conn"]->close();
}


function insertData($name,$email,$phone,$gender,$birthday,$password,$question,$answer,$profilepicture){
	$conn=$GLOBALS["conn"];
	$sql = "INSERT INTO
      accountinfo (name,email,phone,password,gender,birthday,profile_photo,Question,Answer)
			VALUES ('$name','$email','$phone','$password','$gender','$birthday','$profilepicture','$question','$answer')";

	if ($conn->query($sql) === true) {
		return true;
	}
	else{
		return false;
	}

	$GLOBALS["conn"]->close();
}

//this fun is called form Recovery.php
function getId($email){
	$sql = "SELECT id FROM accountinfo WHERE email='$email'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["id"];
	}
	$GLOBALS["conn"]->close();
}

//this fun is called form Recovery.php
function getQuestion($id){
  $sql = "SELECT Question FROM accountinfo WHERE id='$id'";
  $result = $GLOBALS["conn"]->query($sql);
  if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
      return $row["Question"];
  }
  $GLOBALS["conn"]->close();
}

//this fun is called form Recovery.php
function getAnswer($id){
  $sql = "SELECT Answer FROM accountinfo WHERE id='$id'";
  $result = $GLOBALS["conn"]->query($sql);
  if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
      return $row["Answer"];
  }
  $GLOBALS["conn"]->close();
}


// i forget this fun where i called
function checkEmailPhoneDB($email){
	$sql = "SELECT email FROM accountinfo WHERE email='$email'";
	$result = $GLOBALS["conn"]->query($sql);
		if ($result->num_rows >= 1) {
			return false;
		}
		else
			return true;
}



?>
