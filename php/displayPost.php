 <?php
	session_start();
?>
<?php
	include"userpost_db.php";
?>


<?php
	$pageType=$_POST["page"];
	$limit=$_POST["limit"];

	if($pageType=="home"){
		$arr=getallPost("home","all",$limit);
	}
	else if($pageType=="foryou"){
		$loginID=$_SESSION["loginID"];	//get session login id
		$gender=getLoginGender($loginID);// get gender of login user
		$arr=getallPost("foryou",$gender,$limit);
	}
	else if($pageType=="myprofile"){
		$loginID=$_SESSION["loginID"];
		$arr=getallPost("myprofile",$loginID,$limit);
	}
  else if($pageType=="otherprofile"){
		$accid=$_POST["accId"];
		$arr=getallPost("myprofile",$accid,$limit);
	}
	else if($pageType=="wishlist"){
		$loginID=$_SESSION["loginID"];
		$arr=getallPost("wishlist",$loginID,$limit);
	}
	else if($pageType=="order"){
		$loginID=$_SESSION["loginID"];
		$p_info=getallPost("order",$loginID,$limit);		//get post_item data
		$c_info=getcustomer_info($loginID);			//get name,email,phone of ordered customer to contact
		//concating  2 arr into 1 arr
		for($i=0;$i<count($p_info);$i++){
			$arr[$i]=array_merge($p_info[$i],$c_info[$i]);
		}
		//print_r($arr);
	}
	else{
		$arr=getallPost("category",$pageType,$limit);
	}
	//echo count($arr);
	echo json_encode($arr);
	//print_r($arr);

?>
