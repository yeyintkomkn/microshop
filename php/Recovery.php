
<?php
	  include"Database.php";
?>
<?php
	$email=strtolower($_POST["email"]);
	$question=$_POST["question"];
	$answer=$_POST["answer"];

  if(!checkAlreadyEmail($email)){
    $id=getId($email);
    if($question==getQuestion($id) && $answer==getAnswer($id)){
      $password=getPassword($id);
			echo $password;
    }
    else {
      echo 2;
    }
  }
  else{
    echo 1;
  }
  //echo $email."\n".$question."\n".$answer;
?>
