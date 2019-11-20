<?php
  include "userpost_db.php";
 ?>

<?php

 $post_id=$_POST["post_id"];
 $onePost_data=getOnePost_data($post_id);   //get one row frrom userpost_tb
 $onePost_image=getOnePost_image($post_id);

$imgArr = array('image1' => '<img id="img1" class="img" src="data:image/jpeg;base64,'.base64_encode($onePost_image["image1"]).'"/>',
                'image2' => '<img id="img1" class="img" src="data:image/jpeg;base64,'.base64_encode($onePost_image["image2"]).'"/>',
                'image3' => '<img id="img1" class="img" src="data:image/jpeg;base64,'.base64_encode($onePost_image["image3"]).'"/>');

  $onePostarr=array_merge($onePost_data,$imgArr);
 echo json_encode($onePostarr);
// echo print_r($imgArr);
?>
