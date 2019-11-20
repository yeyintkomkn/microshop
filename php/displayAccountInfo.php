<?php
	session_start();
?>
<?php
	  include "Database.php";
?>
<?php
  $loginID=$_SESSION["loginID"];// get session LoginID
  $arrAcc_Info = array();
  $arrAcc_Info[0]=getName($loginID);
  $arrAcc_Info[1]=getEmail($loginID);
  $arrAcc_Info[2]=getPhone($loginID);

	$photo=getProfilePicture($loginID);
	$arrAcc_Info[3]='<img src="data:image/jpeg;base64,'.base64_encode($photo).'"/>';
	echo json_encode($arrAcc_Info);
  //print_r($arrAcc_Info);
 ?>
