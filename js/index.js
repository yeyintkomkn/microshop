//header text
var headertext1="Online Shopping System";
var headertext2="You Can easily buy or sell item in here...";
var count1=0;var change=0;
var headertext=document.getElementById("headerText");
function headerText(){
	if(change==0){
		var textarray=headertext1.split('');
		headertext.innerHTML+=textarray[count1];
		if(count1<headertext1.length){
			count1++;
		}
		else{
			headertext.innerHTML="";
			headertext.style.left="30%"
			count1=0;
			change=1;
		}
	}
	else{
		var textarray=headertext2.split('');
		headertext.innerHTML+=textarray[count1];
		if(count1<headertext2.length){
			count1++;
		}
		else{
			headertext.innerHTML="";
			headertext.style.left="40%"
			count1=0;
			change=0;
		}
	}
	setTimeout("headerText()",200);
}
headerText();
//setInterval("showText_sequence()",350);
var i=1,j=2;
setInterval(function() {
	if(i>2) i=1;
	var img=document.getElementById("logo1");
	img.src="../picture/logo/girl"+i+".png";
	i++;
},2000);
setInterval(function() {
	if(j>2) j=1;
	var img=document.getElementById("logo2");
	img.src="../picture/logo/girl"+j+".png";
	j++;
},2500);

	/*-----------------
	------Nav----------
	-----------------*/

	var foryou=document.getElementById("foryou");
	var wishlist=document.getElementById("wishlist");
	var profile=document.getElementById("myprofile");
	var post=document.getElementById("post");
	var order=document.getElementById("order");

	var iframe=document.getElementById("iframe");
	var memberFrame=document.getElementById("memberFrame");
	//----onload----------------------
	function checkUserType() {
		document.getElementById("home").style.color="red";

		if(CookieUtil.get("user_type")=="advanceuser"){
			foryou.style.display="block";
			profile.style.display="block";
			post.style.display="block";
			wishlist.style.display="block";
			order.style.display="block";
			memberFrame.src="MyAccount.html";	// to display myacountUI if login after refresh webpage
		}
		else if(CookieUtil.get("user_type")=="normaluser"){
			foryou.style.display="block";
			wishlist.style.display="block";
			post.style.display="none";
			profile.style.display="none";
			order.style.display="none";
			memberFrame.src="MyAccount.html"; // to display myacountUI if login after refresh webpage
		}
		else {
			//alert("no user");
			foryou.style.display="none";
			profile.style.display="none";
			post.style.display="none";
			wishlist.style.display="none";
			order.style.display="none";
		}
	}

	function changeIframe(par){
			iframe.src="displayPost.html";
			switch(par){
				case "home":	iframe.name="home";
								break;
				case "foryou":	iframe.name="foryou";
								break;
				case "profile":iframe.name="myprofile";
								break;
				case "wishlist":iframe.name="wishlist";
								break;
				case "order":iframe.name="order";
								break;
				case "1":		iframe.name="1";
								break;
				case "2":	iframe.name="2";
								break;
				case "3":	iframe.name="3";
								break;
				case "4":iframe.name="4";
								break;
				case "5":iframe.name="5";
								break;
				case "6":iframe.name="6";
								break;
				case "7":	iframe.name="7";
								break;
				case "8":	iframe.name="8";
								break;
				case "9":iframe.name="9";
								break;
				case "10":iframe.name="10";
								break;
				case "11":	iframe.name="11";
								break;
				case "12":	iframe.name="12";
								break;
				case "13":	iframe.name="13";
								break;
				case "14":	iframe.name="14";
								break;
				case "15":iframe.name="15";
								break;
				case "16":	iframe.name="16";
								break;
				case "17":	iframe.name="17";
								break;

		}

	}


	//---------Lightbox---------------------
function displayPost_UI() {
	var postFrame=document.getElementById("post_iframe");
		postFrame.src="post.html";		//show post_UI
		postFrame.name="insert";

	document.getElementById("overlay").style.display="block";
	document.getElementById("post_UI").style.display="block";

}

function hide(){
	document.getElementById("overlay").style.display="none";
	document.getElementById("post_UI").style.display="none";
	document.getElementById("image_lightbox").style.display="none";
	document.getElementById("text").innerHTML='Sell Your Item';	//default text after show update ui
	var post_UI_iframe=document.getElementById("post_iframe");
	//
	if(post_UI_iframe.src!=""){
		var iframe=document.getElementById("iframe");
		// go and refresh otnew page after sell item...
		if(post_UI_iframe.name=="insert"){
			iframe.src="displayPost.html";
			iframe.name="home";
		}
		// refresh myprofile page after update item...
		else if (post_UI_iframe.name=="update") {
			iframe.src="displayPost.html";
			iframe.name="myprofile";
		}
	}
}

/*----**************************************----------------------------
#####for image_lightbox, when click btnleft btnright, change image######
----------this fun is called from displayPost.js ,<input>
----******************************************-------------------------*/
var image_lightbox=document.getElementById("image_lightbox");
var slide=image_lightbox.getElementsByClassName("slide");
function lightbox_btnshift(n) {
	var index=n;	// 1 or -1
	if(slide[0].style.display=="block")
		index+=0;
	if(slide[1].style.display=="block")
		index+=1;
	if(slide[2].style.display=="block")
		index+=2;
	if(index>=slide.length)
		index=0;
	if(index<0)
		index=slide.length-1;
	for(var i=0;i<slide.length;i++){
		slide[i].style.display="none";
	}
	slide[index].style.display="block";

}
//---------------------------------------------------

/*	function displayAbout(){
		document.getElementById("overlay").style.display="block";
		document.getElementById("About_lightbox").style.display="block";
	}
	function hide(){
		document.getElementById("overlay").style.display="none";
		document.getElementById("About_lightbox").style.display="none";
	}
	function post(){
		document.getElementById("overlay").style.display="block";
		document.getElementById("post").style.display="block";
	}


	*/
