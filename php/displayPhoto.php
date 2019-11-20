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
		$arr=getPhoto("home","all",$limit);
	}
	else if($pageType=="foryou"){
		$arr=getPhoto("foryou","male",$limit);
	}
	else if($pageType=="myprofile"){
		$loginID=$_SESSION["loginID"];
		$arr=getPhoto("myprofile",$loginID,$limit);
	}
	else if($pageType=="otherprofile"){
		$accid=$_POST["accId"];
		$arr=getPhoto("myprofile",$accid,$limit);
	}
	else if($pageType=="wishlist"){
		$loginID=$_SESSION["loginID"];
		$arr=getPhoto("wishlist",$loginID,$limit);
	}
	else if($pageType=="order"){
		$loginID=$_SESSION["loginID"];
		$arr=getPhoto("order",$loginID,$limit);
	}
	else{
		$arr=getPhoto("category",$pageType,$limit);
	}

	$photoArr=array();
	for($i=0;$i<count($arr);$i++){
		$photoForOnePost=array();
		$photoForOnePost[0]='<img class="slide" src="data:image/jpeg;base64,'.base64_encode($arr[$i]["image1"]).'"/>';
		$photoForOnePost[1]='<img class="slide" src="data:image/jpeg;base64,'.base64_encode($arr[$i]["image2"]).'"/>';
		$photoForOnePost[2]='<img class="slide" src="data:image/jpeg;base64,'.base64_encode($arr[$i]["image3"]).'"/>';

		$photoForOnePost[3]='<img src="data:image/jpeg;base64,'.base64_encode($arr[$i]["profile_photo"]).'"/>';

		$photoArr[$i]=$photoForOnePost;
	}

	echo json_encode($photoArr);
	//echo count($arr);

?>
