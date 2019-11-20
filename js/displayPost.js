	var ul=document.getElementById("mylist");
	var div=document.getElementById("status");

	var profilePicture=document.getElementById("profilePicture");
	var accName=document.getElementById("accName");
	var date=document.getElementById("date");


	var accPhone=document.getElementById("output_phone");
	var name1=document.getElementById("output_name");
	var gender=document.getElementById("output_gender");
	var price=document.getElementById("output_price");
	var code=document.getElementById("output_code");
	var description=document.getElementById("aa");
	var Love=document.getElementById("totalLove");
	var image=document.getElementById("image");

	var fragment=document.createDocumentFragment();
	var allList=ul.getElementsByClassName("each_li");	//if use getElementsByTagName("li"), will contain li from onepost_UI

	var btnLove=document.getElementById("btnLove");
	var btnOrder=document.getElementById("btnOrder");
	var btnWishList=document.getElementById("btnWishList");

	var btnUpdate=document.getElementById("btnUpdate");
	var btnDelete=document.getElementById("btnDelete");
		btnUpdate.style.display="none";
		btnDelete.style.display="none";

	var c_name=document.getElementById("c_name");
	var c_email=document.getElementById("c_email");
	var c_phone=document.getElementById("c_phone");


	var image_lightbox=parent.document.getElementById("image_lightbox");
	var overlay=parent.document.getElementById("overlay");
			overlay.style.height="100%";
	var lightbox_btnleft=image_lightbox.getElementsByClassName("lightbox_btn")[1];
	var lightbox_btnright=image_lightbox.getElementsByClassName("lightbox_btn")[2];


	var iframeName=parent.document.getElementById("iframe").name;
	var limit=5;
	var accId=0; //to send php to show otherprofile

//show  current page
parent.document.getElementById("home").style.color="blue";
parent.document.getElementById("foryou").style.color="blue";
parent.document.getElementById("wishlist").style.color="blue";
parent.document.getElementById("myprofile").style.color="blue";
parent.document.getElementById("order").style.color="blue";
parent.document.getElementById("category").style.color="blue";
	if(iframeName.length>2){
		parent.document.getElementById(iframeName).style.color="red";
	}
	else {
		parent.document.getElementById("category").style.color="red";
	}
//-----get data form database--------
function connect_DB(){
	var send_data="page="+iframeName+"&&limit="+limit;
		if(iframeName=="myprofile"){
			btnUpdate.style.display="inline";	//show update and delete button
			btnDelete.style.display="inline";
		}
		if(iframeName=="order"){
			document.getElementById("float_customerInfo").style.display="block";
		}
		if(iframeName=="otherprofile"){
			send_data="page="+iframeName+"&&limit="+limit+"&&accId="+accId;
		}
	//alert(send_data);
	var request=new XMLHttpRequest();
	var url="../php/displayPost.php";
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState ==4 && request.status ==200){
			//alert(request.responseText);
			var data_return=JSON.parse(request.responseText);//this is multidi array
			getPhoto(send_data,data_return);
			//alert(data_return.length);
		}
	}
	request.send(send_data);
}

//-----get Photo from database--------
function getPhoto(send_data,data_return){
			var request=new XMLHttpRequest();
			var url="../php/displayPhoto.php";
			request.open("POST",url,true);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onreadystatechange=function(){
				if(request.readyState ==4 && request.status ==200){
					var photo=JSON.parse(request.responseText);//this is multi array
					//var photo=request.responseText;
					displayData(data_return,photo);
					//alert(photo.);
				}
			}
			request.send(send_data);
}

//----Show image and data in html design---------
function displayData(data_return,photo,send_data){
	if(data_return!=null){
		for(var i=0;i<data_return.length;i++){
				//---set data-------------**
				profilePicture.innerHTML=photo[i][3];
				accName.innerHTML=data_return[i].acc_name;
				displayDate(data_return,i);

				name1.innerHTML=data_return[i].name;
				gender.innerHTML="for "+data_return[i].gender;
				price.innerHTML=data_return[i].price+"	Kyats";
				code.innerHTML=data_return[i].code;
				accPhone.innerHTML=data_return[i].acc_phone;
				description.innerHTML=data_return[i].description;
				// display photo and left-right btn
				image.innerHTML=photo[i][0]+photo[i][1]+photo[i][2]+
				'<input type="button" class="btn" id="btnleft" value="&#10094">'+
				'<input type="button" class="btn" id="btnright" value="&#10095">';

				if(iframeName=="order"){
					c_name.innerHTML=data_return[i].customer_name;
					c_email.innerHTML=data_return[i].customer_email;
					c_phone.innerHTML=data_return[i].customer_phone;
				}
				//-------------------------**
			var	li=document.createElement("li");
					li.className="each_li";
			li.innerHTML=div.outerHTML;
			//fragment.appendChild(li);
			ul.appendChild(li);
		}
		div.style.display="none";
		//allList[0].innerHTML="";// to clear html design format
		//ul.appendChild(fragment);
	}
	else{
		div.innerHTML="<br>Sorry, No Data Now";
	}

	//-------------#### Each Post Event####---------------------
	for(var j=0;j<data_return.length;j++){
		var accName_Profile=allList[j].firstElementChild.getElementsByTagName("div")[0].getElementsByTagName("snap")[1];
		var btn=allList[j].getElementsByTagName("div")[0].getElementsByTagName("div")[3].getElementsByTagName("input");
		var index=0;
		var slide=allList[j].firstElementChild.getElementsByTagName("div")[1].getElementsByClassName("slide");
		var btnleft=allList[j].firstElementChild.getElementsByTagName("div")[1].getElementsByClassName("btn")[0];
		var btnright=allList[j].firstElementChild.getElementsByTagName("div")[1].getElementsByClassName("btn")[1];

		accName_Profile.onclick=(function (j) {
			return function () {
				goProfile(data_return[j].acc_id);
			}
		})(j);

		showImage(index,slide);

		//------for click ecah img ,display with lightbox-------//
		for(var i=0;i<slide.length;i++){
			slide[i].onclick=(function(j,i,photo){
				return function(){
					overlay.style.display="block";
					image_lightbox.style.display="block";
					image_lightbox.innerHTML='<input type="button" class="lightbox_btn" id="lightbox_btnclose" value="&times;" onclick="hide()">'+
																	 '<input type="button" class="lightbox_btn" id="lightbox_btnleft" value="&#10094" onclick="lightbox_btnshift(1)">'+
																	 '<input type="button" class="lightbox_btn" id="lightbox_btnright" value="&#10095" onclick="lightbox_btnshift(-1)">';
					var lightbox_price=allList[j].firstElementChild.getElementsByTagName("div")[2].getElementsByTagName("snap")[2];//get pric of clicked post to display in lightbox which locate in index.html
					var lightbox_phone=allList[j].firstElementChild.getElementsByTagName("div")[2].getElementsByTagName("snap")[4];
					var desc='<div id="desc"><h3 class="price">/price/<br><snap id="price">'+lightbox_price.innerText+'</snap></h3><h3 class="phone">/Contact/<br><snap id="phone">'+lightbox_phone.innerHTML+'</snap></h3></div>';
					image_lightbox.innerHTML+=photo[j][0]+photo[j][1]+photo[j][2]+desc;
					var allimg=image_lightbox.getElementsByClassName("slide");
					allimg[0].style.display="none";
					allimg[1].style.display="none";
					allimg[2].style.display="none";
					allimg[i].style.display="block";
				}
			})(j,i,photo);
		}

		//-----auto slide-------
		setInterval(function(slide,index) {
			return function() {
				index++;
				if(index>=slide.length)
						index=0;
				for(var i=0;i<slide.length;i++){
					slide[i].style.display="none";
				}
				slide[index].style.display="block";

			}
		}(slide,index),8000);

		btnleft.onclick=(function(j,slide){
			return function(){
				index=index-1;
				if(index<0){
					index=slide.length-1;
				}
				showImage(index,slide);
			}
		})(j,slide);
		btnright.onclick=(function(j,slide){
			return function(){
				index=index+1;
				if(index>=slide.length){
					index=0;
				}
				showImage(index,slide);
			}
		})(j,slide);

		displayTotalLove(data_return[j].id,j);
		displayAlreadyLove(data_return[j].id,j,btn);
		displayAlreadyOrder(data_return[j].id,j,btn);
		displayAlreadyWistList(data_return[j].id,j,btn);

		btn[0].onclick=(function(j,btn){	//btn[0] is loveButton
			return function(){
				var id=data_return[j].id;	//get id of post
				if(btn[0].style.backgroundColor=="lightpink")
					btn[0].style.backgroundColor="white";
				else
					btn[0].style.backgroundColor="lightpink";
				if(CookieUtil.get("user_type")=="advanceuser" || CookieUtil.get("user_type")=="normaluser" )
					ajax_increaseLove(id,j,btn);
				else {
					alert("Please Login First to use Love Feature");
					btn[0].style.backgroundColor="white";
				}
			}
		})(j,btn);	//I can use only nameless function to get event of love_btn click

		btn[1].onclick=(function(j,btn){	//btn[1] is Orderbtn
			return function(){
				if(btn[1].style.backgroundColor=="lightpink"){
					alert("You have been alerady order");
				}
				else if(CookieUtil.get("user_type")=="advanceuser" || CookieUtil.get("user_type")=="normaluser"){
					var isorder=window.confirm("Are Your Sure to Order this Item");
					if (isorder) {
						btn[1].style.backgroundColor="lightpink";
						var id=data_return[j].id;	//get id of post
						ajax_order(id,j,btn);
					}
					else {
						btn[1].style.backgroundColor="white";
					}
				}
				else {
					alert("Please Logi First to use order Feature");
				}

			}
		})(j,btn);

		btn[2].onclick=(function(j,btn){	//btn[2] is wistList
			return function(){
				var id=data_return[j].id;	//get id of post
				if(btn[2].style.backgroundColor=="lightpink")
					btn[2].style.backgroundColor="white";
				else
					btn[2].style.backgroundColor="lightpink";
				if(CookieUtil.get("user_type")=="advanceuser" || CookieUtil.get("user_type")=="normaluser" )
					ajax_addtoWisthList(id,j,btn);
				else {
					alert("Please Login First to use WishList Feature");
					btn[2].style.backgroundColor="white";
				}
			}
		})(j,btn);

		btn[3].onclick=(function(j){	//btn[2] is btnUpdate
			return function(){
				var post_id=data_return[j].id;	//get id of post
				//show updateform_ui by change post_ui
				var postFrame=parent.document.getElementById("post_iframe");
					postFrame.src="post.html";
					postFrame.name="update";
					postFrame.post_id=parseInt(post_id);
				parent.document.getElementById("text").innerHTML='Update Your Item';
				parent.document.getElementById("overlay").style.display="block";
				parent.document.getElementById("post_UI").style.display="block";
			}
		})(j);

		btn[4].onclick=(function(j){	//btn[4] is btnDelete
			return function(){
				var result=window.confirm("Are You Sure to Delete Your Post?");
				if(result == true){
					var id=data_return[j].id;	//get id of post
					ajax_deletePost(id,j);
				}
			}
		})(j);
	}

}

function nextPost() {
	ul.innerHTML="";
	div.style.display="block";
	limit+=3;
	connect_DB();
}

function goProfile(id) {
	iframeName="otherprofile";
	accId=id;
	connect_DB();
	//alert(id);
}

function displayDate(data_return,i){
	//-----get current date---
	var currentDate=new Date();
	var year=currentDate.getFullYear();
	var month=currentDate.getMonth()+1;
	var day=currentDate.getDate();
	var hour=currentDate.getHours();
	var minute=currentDate.getMinutes();
	var second=currentDate.getSeconds();

	//----get date from database----
	var dbyear=data_return[i].posted_date.slice(0,4);
	var dbmonth=data_return[i].posted_date.slice(5,7);
	var dbday=data_return[i].posted_date.slice(8,10);
	var dbhour=data_return[i].posted_date.slice(11,13);
	var dbminute=data_return[i].posted_date.slice(14,16);
	var dbsecond=data_return[i].posted_date.slice(17,19);

	if(year-dbyear==0){

		if(month-dbmonth==0){

			if(day-dbday==0){

				if(hour-dbhour==0){

					if(minute-dbminute==0){
						date.innerHTML="Just Now";
					}
					else
						date.innerHTML="Last "+(minute-dbminute)+" minutes ago";
				}
				else
					date.innerHTML="Last "+(hour-dbhour) +" hours ago";
			}
			else
				date.innerHTML=monthName(dbmonth)+" "+dbday+" at "+"<i>"+showTime(dbhour,dbminute)+"</i>";
		}
		else
			date.innerHTML=monthName(dbmonth)+" "+dbday+" at "+"<i>"+showTime(dbhour,dbminute)+"</i>";
	}
	else
		date.innerHTML=dbday+"-"+dbmonth+"-"+dbyear;
}

//--------to change Name of Month----------
function monthName(month){
	if(month==1)
		return "January";
	if(month==2)
		return "February";
	if(month==3)
		return "March";
	if(month==4)
		return "Apiral";
	if(month==5)
		return "May";
	if(month==6)
		return "June";
	if(month==7)
		return "July";
	if(month==8)
		return "August";
	if(month==9)
		return "September";
	if(month==10)
		return "October";
	if(month==11)
		return "November";
	if(month==12)
		return "December";
}

function showTime(dbhour,dbminute){
	if(dbhour<12)
		return dbhour+":"+dbminute+" am";

	else if(dbhour==12)
		return dbhour+":"+dbminute+" pm";

	else if(dbhour>12 && dbhour<24)
		return (dbhour-12)+":"+dbminute+" pm";

	else if(dbhour==24)
		return 12+":"+dbminute+" am";
}

function showImage(index,slide){
	for(var i=0;i<slide.length;i++){
		slide[i].style.display="none";
	}
	slide[index].style.display="block";
}

function ajax_increaseLove(id,j,btn){
	var request=new XMLHttpRequest();
	var url="../php/Love_Order_Wishlist_controller.php";
	var send_data="id="+id+"&&type=love";
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState ==4 && request.status ==200){
			var data_return=request.responseText;
			//alert(data_return);
				allList[j].firstElementChild.getElementsByTagName('div')[3].getElementsByTagName("snap")[0].innerHTML=data_return;	//show total no of love
				//btn.style.backgroundColor="lightpink";
		}
	}
	request.send(send_data);
}

function ajax_order(id,j,btn){
	var request=new XMLHttpRequest();
	var url="../php/Love_Order_Wishlist_controller.php";
	var send_data="id="+id+"&&type=order";
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState ==4 && request.status ==200){
			var data_return=request.responseText;
			//alert(data_return);
				alert(data_return);
		}
	}
	request.send(send_data);
}


function ajax_addtoWisthList(id,j,btn){
	var request=new XMLHttpRequest();
	var url="../php/Love_Order_Wishlist_controller.php";
	var send_data="id="+id+"&&type=wishlist";
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState ==4 && request.status ==200){
			var data_return=request.responseText;
			//alert(data_return);
		}
	}
	request.send(send_data);
}

function ajax_deletePost(id,j){
	var request=new XMLHttpRequest();
	var url="../php/DeletePost.php";
	var send_data="id="+id;
	//alert(send_data);
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState ==4 && request.status ==200){
			var data_return=request.responseText;
		//	alert(data_return);
			if(data_return==1){
				alert("Success Delete Post");
				window.location.reload();
			}
			else{
				alert("Program Error Deleting Post");
			}

		}
	}
	request.send(send_data);
}

function displayAlreadyLove(id,j,btn){
	var request=new XMLHttpRequest();
	var url="../php/checkAlreadyLove.php";
	var send_data="post_id="+id+"&&type="+"checkAlreadyLove";
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState ==4 && request.status ==200){
			var data_return=request.responseText;
			if(data_return==1){		//if already love
				btn[0].style.backgroundColor="lightpink";
			}

		}
	}
	request.send(send_data);
}

function displayAlreadyOrder(id,j,btn){
	var request=new XMLHttpRequest();
	var url="../php/checkAlreadyOrder&&wishlist.php";
	var send_data="post_id="+id+"&&type=checkAlreadyOrder";
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState ==4 && request.status ==200){
			var data_return=request.responseText;
			if(data_return==1){		//if already Order
				btn[1].style.backgroundColor="lightpink";
			}
		}
	}
	request.send(send_data);
}

function displayAlreadyWistList(id,j,btn){
	var request=new XMLHttpRequest();
	var url="../php/checkAlreadyOrder&&wishlist.php";
	var send_data="post_id="+id+"&&type=checkAlreadyWishList";
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState ==4 && request.status ==200){
			var data_return=request.responseText;
			if(data_return==1){		//if already wishlist
				btn[2].style.backgroundColor="lightpink";
			}

		}
	}
	request.send(send_data);
}

function displayTotalLove(id,j){
	var request=new XMLHttpRequest();
	var url="../php/checkAlreadyLove.php";
	var send_data="post_id="+id+"&&type="+"getTotalLove";
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	request.onreadystatechange=function(){
		if(request.readyState ==4 && request.status ==200){
			var data_return=request.responseText;
			//allList[j].firstElementChild.getElementsByTagName("snap")[9].innerHTML=data_return;
			allList[j].firstElementChild.getElementsByTagName("div")[3].getElementsByTagName("snap")[0].innerHTML=data_return;
		}
	}
	request.send(send_data);
}
