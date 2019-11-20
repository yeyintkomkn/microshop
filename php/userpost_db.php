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
	else{

	}

/*---------------------------------------------
--------####For User Post Page#####------------
-----------------------------------------------*/
function insertPost($account_id,$category,$name,$price,$code,$description,$gender,$city,$image1,$image2,$image3){
	$conn=$GLOBALS["conn"];
	date_default_timezone_set("Asia/Yangon");
	$sql = "INSERT INTO
			userpost_tb(account_id,category,name,price,code,description,gender,city,image1,image2,image3,posted_date)
			VALUES ('$account_id','$category','$name','$price','$code','$description','$gender','$city','$image1','$image2','$image3','".date('Y-m-d H:i:s')."')";

      if ($conn->query($sql) === true) {
        return true;
      }
      else{
        return false;
      }
      $GLOBALS["conn"]->close();
}

function updatePost($post_id,$account_id,$category,$name,$price,$code,$description,$gender,$city,$image1,$image2,$image3){
	$conn=$GLOBALS["conn"];
	date_default_timezone_set("Asia/Yangon");
	$sql = "UPDATE userpost_tb
			SET category='$category',name='$name',price='$price',code='$code',description='$description',gender='$gender',city='$city',image1='$image1',image2='$image2',image3='$image3'
			WHERE account_id=$account_id
      AND id=$post_id";
      if ($conn->query($sql) === true) {
        return true;
      }
      else{
        return false;
      }
      $GLOBALS["conn"]->close();
}

function DeletePost($post_id){
	$sqli = "DELETE FROM userpost_tb WHERE id=$post_id";
	$result = $GLOBALS["conn"]->query($sqli);
	if ($result == true) {
		return true;
	}
	return false;
	$GLOBALS["conn"]->close();
}

//---------####for display post in home,foryou,myprofile,category####------------
function getallPost($page,$type,$limit){
	$allPost=array();
	$sql="";
	if($page=="home"){
		$sql = "SELECT userpost_tb.id, userpost_tb.account_id, userpost_tb.category,userpost_tb.name,
    						userpost_tb.price, userpost_tb.code, userpost_tb.description,userpost_tb.gender,
    						userpost_tb.posted_date,accountinfo.name As acc_name,accountinfo.phone As acc_phone,accountinfo.id As acc_id
    				FROM userpost_tb,accountinfo
    				WHERE userpost_tb.account_id=accountinfo.id
    				ORDER BY userpost_tb.id DESC
            LIMIT $limit";
	}
	if($page=="foryou"){
		$sql = "SELECT userpost_tb.id, userpost_tb.account_id, userpost_tb.category,userpost_tb.name,
    						userpost_tb.price, userpost_tb.code, userpost_tb.description,userpost_tb.gender,
    						userpost_tb.posted_date,accountinfo.name As acc_name,accountinfo.phone As acc_phone,accountinfo.id As acc_id
    				FROM userpost_tb,accountinfo
    				WHERE userpost_tb.gender='$type'
            OR userpost_tb.gender='both'
    				AND userpost_tb.account_id=accountinfo.id
    				ORDER BY userpost_tb.id DESC
            LIMIT $limit";
	}
	if($page=="category"){
		$sql = "SELECT userpost_tb.id, userpost_tb.account_id, userpost_tb.category,userpost_tb.name,
    						userpost_tb.price, userpost_tb.code, userpost_tb.description,userpost_tb.gender,
    						userpost_tb.posted_date,accountinfo.name As acc_name,accountinfo.phone As acc_phone,accountinfo.id As acc_id
    				FROM userpost_tb,accountinfo
    				WHERE userpost_tb.account_id=accountinfo.id
    				AND userpost_tb.category='$type'
    				ORDER BY userpost_tb.id DESC
            LIMIT $limit";
	}
	if($page=="myprofile"){
		$sql = "SELECT userpost_tb.id, userpost_tb.account_id, userpost_tb.category,userpost_tb.name,
    						userpost_tb.price, userpost_tb.code, userpost_tb.description,userpost_tb.gender,
    						userpost_tb.posted_date,accountinfo.name As acc_name,accountinfo.phone As acc_phone,accountinfo.id As acc_id
    				FROM userpost_tb,accountinfo
    				WHERE account_id='$type'
    				AND userpost_tb.account_id=accountinfo.id
    				ORDER BY userpost_tb.id DESC
            LIMIT $limit";
	}
	if($page=="wishlist"){
		$sql = "SELECT userpost_tb.id, userpost_tb.account_id, userpost_tb.category,userpost_tb.name,
    						userpost_tb.price, userpost_tb.code, userpost_tb.description,userpost_tb.gender,
    						userpost_tb.posted_date,accountinfo.name As acc_name,accountinfo.phone As acc_phone,accountinfo.id As acc_id
    				FROM userpost_tb,onepostdetail_tb,accountinfo
    				WHERE onepostdetail_tb.account_id='$type'
    				AND onepostdetail_tb.action='wishlist'
    				AND userpost_tb.id=onepostdetail_tb.post_id
    				AND userpost_tb.account_id=accountinfo.id
    				ORDER BY onepostdetail_tb.id DESC
            LIMIT $limit";
	}
  if($page=="order"){
		$sql = "SELECT userpost_tb.id, userpost_tb.account_id, userpost_tb.category,userpost_tb.name,
        						userpost_tb.price, userpost_tb.code, userpost_tb.description,userpost_tb.gender,
        						userpost_tb.posted_date,accountinfo.name As acc_name,accountinfo.phone As acc_phone,accountinfo.id As acc_id
            FROM userpost_tb,onepostdetail_tb,accountinfo
            WHERE onepostdetail_tb.post_id=userpost_tb.id
            AND onepostdetail_tb.action='order'
            AND userpost_tb.account_id='$type'
            AND userpost_tb.account_id=accountinfo.id
            ORDER BY onepostdetail_tb.id DESC
            LIMIT $limit";
	}

	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows > 0) {
		$i=0;
		 while($row = $result->fetch_assoc()) {
			// echo "id:".$row["id"];
			$allPost[$i]=$row;
			$i=$i+1;
		}
		//echo $onePost[1]["description"];
		return $allPost;
	}
	$GLOBALS["conn"]->close();
}

//---------####for display Photo in home,foryou,myprofile,category####------------
function getPhoto($page,$type,$limit){
	$allPost=array();
	$sql="";
	if($page=="home"){
		$sql = "SELECT userpost_tb.image1,userpost_tb.image2,userpost_tb.image3,userpost_tb.account_id,
						accountinfo.profile_photo As profile_photo
				FROM userpost_tb,accountinfo
				WHERE userpost_tb.account_id=accountinfo.id
				ORDER BY userpost_tb.id DESC
        LIMIT $limit";
	}
	if($page=="foryou"){
		$sql = "SELECT userpost_tb.image1,userpost_tb.image2,userpost_tb.image3,userpost_tb.account_id,
						accountinfo.profile_photo As profile_photo
				FROM userpost_tb,accountinfo
				WHERE userpost_tb.gender='$type'
        OR userpost_tb.gender='both'
				AND userpost_tb.account_id=accountinfo.id
				ORDER BY userpost_tb.id DESC
        LIMIT $limit";
	}
	if($page=="category"){
		$sql = "SELECT userpost_tb.image1,userpost_tb.image2,userpost_tb.image3,userpost_tb.account_id,
						accountinfo.profile_photo As profile_photo
				FROM userpost_tb,accountinfo
				WHERE userpost_tb.account_id=accountinfo.id
				AND userpost_tb.category='$type'
				ORDER BY userpost_tb.id DESC
        LIMIT $limit";
	}
	if($page=="myprofile"){
		$sql = "SELECT userpost_tb.image1,userpost_tb.image2,userpost_tb.image3,userpost_tb.account_id,
						accountinfo.profile_photo As profile_photo
				FROM userpost_tb,accountinfo
				WHERE userpost_tb.account_id='$type'
				AND userpost_tb.account_id=accountinfo.id
				ORDER BY userpost_tb.id DESC
        LIMIT $limit";
	}
	if($page=="wishlist"){
		$sql = "SELECT userpost_tb.image1,userpost_tb.image2,userpost_tb.image3,userpost_tb.account_id,
						accountinfo.profile_photo As profile_photo
				FROM userpost_tb,onepostdetail_tb,accountinfo
				WHERE onepostdetail_tb.account_id='$type'
				AND onepostdetail_tb.action='wishlist'
				AND userpost_tb.id=onepostdetail_tb.post_id
				AND userpost_tb.account_id=accountinfo.id
				ORDER BY onepostdetail_tb.id DESC
        LIMIT $limit";
	}
  if($page=="order"){
		$sql = "SELECT userpost_tb.image1,userpost_tb.image2,userpost_tb.image3,userpost_tb.account_id,
						  accountinfo.profile_photo As profile_photo
            FROM userpost_tb,onepostdetail_tb,accountinfo
            WHERE onepostdetail_tb.post_id=userpost_tb.id
            AND onepostdetail_tb.action='order'
            AND userpost_tb.account_id='$type'
            AND userpost_tb.account_id=accountinfo.id
            ORDER BY onepostdetail_tb.id DESC
            LIMIT $limit";
	}

	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows > 0) {
		$i=0;
		 while($row = $result->fetch_assoc()) {
			// echo "id:".$row["id"];
			$allPost[$i]=$row;
			$i=$i+1;
		}
		//echo $onePost[1]["description"];
		return $allPost;
	}
	$GLOBALS["conn"]->close();
}

function getcustomer_info($loginID){
  $multiarr=array();
  $sql = "SELECT accountinfo.name As customer_name,accountinfo.email As customer_email,accountinfo.phone As customer_phone
            FROM userpost_tb,onepostdetail_tb,accountinfo
            WHERE onepostdetail_tb.post_id=userpost_tb.id
            AND onepostdetail_tb.action='order'
            AND userpost_tb.account_id=$loginID
            AND onepostdetail_tb.account_id=accountinfo.id
            ORDER BY onepostdetail_tb.id DESC";
  $result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows > 0) {
		$i=0;
		 while($row = $result->fetch_assoc()) {
			// echo "id:".$row["id"];
			$multiarr[$i]=$row;
			$i=$i+1;
		}
		//echo $onePost[1]["description"];
		return $multiarr;
	}
	$GLOBALS["conn"]->close();
}

function getLoginGender($LoginId){
	$sql = "SELECT gender FROM accountinfo WHERE id='$LoginId'";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row["gender"];
	}
	$GLOBALS["conn"]->close();
}

//this function is used in update form
function getOnePost_data($post_id){
	$sql = "SELECT category,name,price,code,description,gender,city
          FROM userpost_tb
          WHERE id=$post_id ";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row;
    //$array = array('name' => 'AA', 'age'=>23);
  //  return $array;
	}
	$GLOBALS["conn"]->close();
}
function getOnePost_image($post_id){
	$sql = "SELECT image1,image2,image3
          FROM userpost_tb
          WHERE id=$post_id ";
	$result = $GLOBALS["conn"]->query($sql);
	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
			return $row;
	}
	$GLOBALS["conn"]->close();
}

?>
