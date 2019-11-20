<?php
	session_start();
?>
<?php
	  include "Database.php";
?>
<?php
  $loginID=$_SESSION["loginID"];
  $password=$_POST["password"];
  $type=$_POST["type"];
  if($password==getPassword($loginID)){
    if ($type==0){      //changePassword
      $newpassword=$_POST["par2"];
      if(updatePassword($loginID,$newpassword)){
  			echo 1;
  		}
    }
    if ($type==1){  //chagneEmail
      $newemail=$_POST["par2"];
      if(checkAlreadyEmail($newemail)){
  			if(updateEmail($loginID,$newemail)){
  				echo 1; //OK
  			}
  		}
    }
    if ($type==2){  //ChangeUserName
      $newname=$_POST["par2"];
      if(updateName($loginID,$newname)){
  			echo 1;
  		}
    }
    if ($type==3){  //changephone
      $newphone=$_POST["par2"];
      if(checkAlreadyPhone($newphone)){
  			if(updatePhone($loginID,$newphone)){
  				echo 1;
  			}
  		}
    }
  }
  else {
    echo 2; //incorrect Password
  }



 ?>
