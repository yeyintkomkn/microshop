<?php
	include"../Database.php"
?>

<?php
	$type=$_POST["type"];
	if($type==="phone"){
		$phone=$_POST["phone"];// change to lowercase
		if(checkAlreadyPhone($phone)=== false){
			echo 1;// phone already exact
		}
	}
	if ($type==="email") {
		$email=strtolower($_POST["email"]);// change to lowercase
		if(checkAlreadyEmail($email)=== false){
			echo 2;// email already exact
		}
	}

?>
