	var domEmail=document.getElementById("email");
	var domPassword=document.getElementById("password");

	var emailError=document.getElementById("emailError");
	var passwordError=document.getElementById("passwordError");

	var emailFormat=/[a-z 0-9]{1,}@[a-z]{1,}\.com/;

	//-----get elements from index.html to display foryou,wishlist after login-----------
	var foryou=parent.document.getElementById("foryou");
	var profile=parent.document.getElementById("myprofile");
	var post=parent.document.getElementById("post");
	var wishlist=parent.document.getElementById("wishlist");
	var order=parent.document.getElementById("order");
		//-------to hide after logout----------
		foryou.style.display="none";
		profile.style.display="none";
		post.style.display="none";
		wishlist.style.display="none";
		order.style.display="none";
		//-----------------------
	var iframe=parent.document.getElementById("iframe");
		iframe.src="displayPost.html";
		iframe.name="home";


	domEmail.onkeydown=function(e){
		checkShoworClear_error("emailError","email",e);
	};
	domPassword.onkeydown=function(e){
		checkShoworClear_error("passwordError","password",e);
	};
	domEmail.onkeyup=function(e){
		var email=document.getElementById("email");
		email.value=email.value.toLowerCase();
	};
	domEmail.onchange=function(e){
		show_error("emailError","email");
	};
	domPassword.onchange=function(e){
		show_error("passwordError","password");
	};

	function checkShoworClear_error(errorText,type,e){
		var charCode;
		if(e && e.which){
			charCode=e.which;
		}
		else if(window.event){
			e=window.event;
			charCode=e.keyCode;
		}
		if(charCode ==9 || charCode==13){	//if you press Tab or Enter key
			if(show_error(errorText,type)){	//if no errors
				if (type=="email" && charCode==13 ) {
					document.getElementById("password").focus();
				}
				if (type=="password" && charCode==13 ) {
					document.getElementById("focus").focus();
				}
			}
		}
		else if(charCode!=9){	// clear errors
			document.getElementById(errorText).innerHTML="";
			document.getElementById(type).style.borderColor="blue";
		}
	}

	function show_error(errorText,type){
		var boo=true;
		var txtdata=document.getElementById(type).value;
		if(txtdata==""){
			document.getElementById(errorText).innerHTML="Please Enter "+type;
			document.getElementById(type).style.borderColor="red";
			boo=false;
		}
		else if(type=="email"){
			if(!emailFormat.test(txtdata)){
				document.getElementById(errorText).innerHTML="Please Enter Vaild Eamil...";
				document.getElementById(type).style.borderColor="red";
				boo=false;
			}
		}
		else if(type=="password"){
			if(txtdata.length<8){
				document.getElementById(errorText).innerHTML="Your Password is Incorrect ....";
				document.getElementById(type).style.borderColor="red";
				boo=false;
			}
		}
		return boo;
	}

	function checkValidation(){
		email=domEmail.value;
		password=domPassword.value;
		if(show_error("emailError","email") && show_error("passwordError","password")){
			ajaxpost(email,password);
		}
		else{
			show_error("emailError","email");
			show_error("passwordError","password");
		}
	}


	//----------this fun post emial&pass to Login.php and check with database ------------
	function ajaxpost(email,password){
		var request=new XMLHttpRequest();
		var url="../php/Login.php";
		var send_data="email="+email+"&password="+password;
		request.open("POST",url,true);
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		request.onreadystatechange=function(){
			if(request.readyState ==4 && request.status ==200){
				var data_return=request.responseText;
				//alert(data_return);
				if(data_return==1){			//if email inncorrect
					emailError.innerHTML="The email you entered doesn't appear  belong to an account.Please check your email address and try again. ";
					document.getElementById("email").style.borderColor="red";
				}
				else if(data_return==2){	// if password incorrect
					passwordError.innerHTML="The password that you've entered is incorrect.Please try again.";
					document.getElementById("password").style.borderColor="red";
				}
				else if(data_return==31){	//if email & password is correct and user_type is advance
					window.open("../html/MyAccount.html","_self");	// don't use window.location() because firefox browser error,
					CookieUtil.set("user_type","advanceuser");
					//alert(CookieUtil.get("user_type"));
						//to reload homepage to show alerady love & wishlist
						var iframe=parent.document.getElementById("iframe");
							iframe.src="displayPost.html";
							iframe.name="home";
						parent.document.getElementById('home').style.color="red";
						parent.document.getElementById('category').style.color="blue";
						foryou.style.display="block";
						profile.style.display="block";
						post.style.display="block";
						wishlist.style.display="block";
						order.style.display="block";
				}
				else if(data_return==32){	//if email & password is correct and user_type is normal
					window.open("../html/MyAccount.html","_self");
					CookieUtil.set("user_type","normaluser");
					//alert(CookieUtil.get("user_type"));
						//to reload homepage to show alerady love & wishlist
						var iframe=parent.document.getElementById("iframe");
							iframe.src="displayPost.html";
							iframe.name="home";

						foryou.style.display="block";
						wishlist.style.display="block";
						profile.style.display="none";
						post.style.display="none";
						order.style.display="none";
				}
				else{
					alert("Program Error......");
				}
			}
		}
		request.send(send_data);
	}
