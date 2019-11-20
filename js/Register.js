
	var domName=document.getElementById("name");
	var domEmail=document.getElementById("email");
	var domPhone=document.getElementById("phone");
	var domPassword=document.getElementById("password");
	var domConfirmPassword=document.getElementById("confirmpassword");
	var dombirthDate=document.getElementById("date");
	var domQuestion=document.getElementById("question");
	var domAnswer=document.getElementById("answer");

	//to allow user's age between 16 year and 150 year.
	var date=new Date();
	var maxYear=date.getFullYear()-16;
	var minYear=date.getFullYear()-150;
		dombirthDate.max=maxYear+"-01-01";
		dombirthDate.min=minYear+"-01-01";

	var emailFormat=/[a-z 0-9]{1,}@[a-z]{1,}\.com/;
	var phoneFormat=/09[0-9]{9}/;
	var invalidphoneFormat=/[a-z A-Z]{1,}/;


	var name,email,phone,password,confirmpassword,gender,birthDate,question,answer;


	/*---------------------------------------------------------------------------------------
	##### This functions work when user Click 'Tab' and 'Enter' after writing in textbox######
	-----------------------------------------------------------------------------------------*/
	domName.onkeydown=function(e){
		checkError("nameError","name",e)
	};

	domEmail.onkeydown=function(e){
		checkError("emailError","email",e)
	};

	domPhone.onkeydown=function(e){
		checkError("phoneError","phone",e)
	};

	domPassword.onkeydown=function(e){
		checkError("passwordError","password",e)
	};
	domConfirmPassword.onkeydown=function(e){
		checkError("confirmpasswordError","confirmpassword",e)
	};
	domQuestion.onkeydown=function(e){
		checkError("","question",e)
	};
	domAnswer.onkeydown=function(e){
		checkError("ansError","answer",e)
	};

	/*--------------------------------------------------------------------------
	---------This function are work when user start write any key in textbox----
	----------------------------------------------------------------------------*/

	domName.onkeyup=function(e){
		clearError("nameError","name")
	};

	domEmail.onkeyup=function(e){
		clearError("emailError","email")
	};

	domPhone.onkeyup=function(e){
		clearError("phoneError","phone")
	};

	domPassword.onkeyup=function(e){
		clearError("passwordError","password")
	};
	domConfirmPassword.onkeyup=function(e){
		clearError("confirmpasswordError","confirmpassword")
	};
	domAnswer.onkeyup=function(e){
		clearError("ansError","answer")
	};

	/*----------------------------------------
	---------------------on change------------
	-------------------------------------------*/
	domEmail.onchange=function(){
		show_error("emailError","email")
	}
	domPhone.onchange=function(){
		show_error("phoneError","phone")
	}
	dombirthDate.onchange=function(){
		document.getElementById("dateError").innerHTML="";
		dombirthDate.style.borderColor="blue";
	}

	domPassword.onchange=function(){
		show_error("passwordError","password")
	}
	domConfirmPassword.onchange=function(){
		show_error("confirmpasswordError","confirmpassword")
		checkConPassword();
	}

	//-------------------------------------------

	function clearError(errorText,defaultborder){
		document.getElementById(errorText).innerHTML="";
		document.getElementById(defaultborder).style.borderColor="blue";

		if(defaultborder=="email"){
			var email=document.getElementById("email");
			email.value=email.value.toLowerCase();
			Ajax_CheckAlready(email.value,"email");
		}
		if(defaultborder=="phone"){
			var phone=document.getElementById("phone");
			if(invalidphoneFormat.test(phone.value)){
				document.getElementById(errorText).innerHTML="Please Enter Vaild PhoneNo...";
				document.getElementById(defaultborder).style.borderColor="red";
			}
			else {
				//document.getElementById(errorText).innerHTML="OK";
				Ajax_CheckAlready(phone.value,"phone");
			}
		}
	}

	function checkError(errorText,text,e){
		var charCode;
		if(e && e.which){
			charCode=e.which;
		}
		else if(window.event){	//for IE
			e=window.event;
			charCode=e.keyCode;
		}
		if(charCode ==9){	//if you press Tab
			show_error(errorText,text);
		}
		/*if(text=="confirmpassword" && charCode==13){ //in confirmpassword textbox ,when user click enter,auto action Register
				document.getElementById("focus").focus();
		}*/
		if(charCode==13){
			show_error(errorText,text);
			if(text=="name")
				document.getElementById("email").focus();
			if(text=="email")
				document.getElementById("phone").focus();
			if(text=="phone")
				document.getElementById("date").focus();
			if(text=="password")
				document.getElementById("confirmpassword").focus();
			if(text=="confirmpassword")
				document.getElementById("question").focus();
				//document.getElementById("regBtn").focus();
			if(text=="question")
				document.getElementById("answer").focus();
			if(text=="answer")
				document.getElementById("profilepicture").focus();
		}
	}

	function show_error(errorText,text){
		var boo=true;
		var textbox=document.getElementById(text).value;
			if(textbox==""){
				document.getElementById(errorText).innerHTML="Please Enter "+text;
				document.getElementById(text).style.borderColor="red";
				boo=false;
			}
			else if(text=="email"){
				if(emailFormat.test(textbox)===false){
					document.getElementById(errorText).innerHTML="Please Enter Vaild Eamil Address";
					document.getElementById(text).style.borderColor="red";
					boo=false;
				}
				else{
						// check email is Already exit or not
				}
			}
			else if(text=="password" || text=="confirmpassword"){
				if(textbox.length<8){
					document.getElementById(errorText).innerHTML="At least 8 character for security...";
					document.getElementById(text).style.borderColor="red";
					boo=false;
				}
			}
			else if(text=="phone"){
				if(phoneFormat.test(textbox)===false){
					document.getElementById(errorText).innerHTML="Please Enter Valid Phone Number";
					document.getElementById(text).style.borderColor="red";
					boo=false;
				}
			}
			return boo;
	}

	function checkConPassword(){
		confirmpassword=domConfirmPassword.value;
		password=domPassword.value;
		if(confirmpassword==password){
			return true;
		}
		else{
			document.getElementById("confirmpasswordError").innerHTML="These passwords don't match.Try again?";
			document.getElementById("confirmpassword").style.borderColor="red";
			return false;
		}
	}

	function checkValidation(){
		var fileSelected=document.getElementById("profilepicture").files;
			if(show_error("nameError","name") && show_error("emailError","email") && show_error("phoneError","phone") && show_error("dateError","date")&&
				show_error("passwordError","password") && show_error("confirmpasswordError","confirmpassword") && checkConPassword() && show_error("ansError","answer")
				&& fileSelected.length>0){
				//alert("Name="+name+"\nEmail="+email+"\nPhone="+phone+"\nPassword="+password+"\nbirthDate="+birthDate+"\nGender="+gender);
				AjaxRegisterPost();	// this fun send data to Register.php and store data in database

			}
			else {	//show error
					show_error("nameError","name");
					show_error("emailError","email");
					show_error("phoneError","phone");
					show_error("dateError","date");
					show_error("passwordError","password");
					show_error("confirmpasswordError","confirmpassword");
					checkConPassword();
					show_error("ansError","answer");
					if(fileSelected.length==0){
						document.getElementById("errorImage1").innerHTML="Please Select profilePicture"
					}
			}
	}
	//show SelectImage as priview
	function displaySelectedPhoto(){
		document.getElementById("errorImage1").innerHTML="";//clear error text
		var fileSelected=document.getElementById("profilepicture").files;
		if(fileSelected.length>0){
			var fileToLoad=fileSelected[0];
			if(fileToLoad.type.match("image.*")){
				var fileReader=new FileReader();
				fileReader.onload=function(fileLoadedEvent){
					var img=document.getElementById("showPP");
					img.style="border: 2px solid blue";
					img.src=fileLoadedEvent.target.result;
				};
				fileReader.readAsDataURL(fileToLoad);
			}
		}
	}

//------------------------------------------------------------------------------
//this function check email and phoneno that is alerady exist or not
	function Ajax_CheckAlready(data,type){
		var request=new XMLHttpRequest();
		var url="../php/Account Setting/CheckAlready.php";
		if(type==="email")
			var send_data="email="+data+"&&type="+type;
		if(type==="phone")
			var send_data="phone="+data+"&&type="+type;

		request.open("POST",url,true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		request.onreadystatechange=function(){
			if(request.readyState ==4 && request.status ==200){
				var data_return=request.responseText;
				//alert(data_return);
				if(data_return==1){
					document.getElementById("phoneError").innerHTML="This PhoneNumber is Already Exist....";
					domPhone.style.borderColor="red";
				}
				if(data_return==2){
					document.getElementById("emailError").innerHTML="This EmailAddress is Already Exist....";
					domEmail.style.borderColor="red";
				}
			}
		}
		request.send(send_data);
	}

	function AjaxRegisterPost(){
		var request=new XMLHttpRequest();
		var url="../php/Register.php";
		//registerForm
		var form=document.getElementById("aaa");
		var data=new FormData(form);
		request.open("POST",url,true);
		//request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		request.onreadystatechange=function(){
			if(request.readyState ==4 && request.status ==200){
				var data_return=request.responseText;
				//alert(data_return);
				if(data_return==3){
					alert("Success Account Creation");
					window.open("../html/login.html","_self");
				}
				else if(data_return==2){
					alert("Your profilepicture's Size is too Large")
				}
				else if(data_return==4)
					alert("Fail Success Account Creation");
			}
		}
		request.send(data);
	}
