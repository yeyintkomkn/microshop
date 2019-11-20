var accName=document.getElementById("accName");
var accEmail=document.getElementById("accEmail");
var accPhone=document.getElementById("accPhone");
var img=document.getElementById("proflie_img");
function displayAccountInfo() {
  if(CookieUtil.get("user_type")=="advanceuser"){
    document.getElementById("btnAdvance").style.display="none";
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var data_return=JSON.parse(xmlhttp.responseText);
        //var data_return=xmlhttp.responseText;
        //alert(data_return);
        accName.innerHTML=data_return[0];
        accEmail.innerHTML=data_return[1];
        accPhone.innerHTML=data_return[2];
        img.innerHTML=data_return[3];
      }
  };
  xmlhttp.open("GET","../php/displayAccountInfo.php", true);
  xmlhttp.send();
}

var boolean=false;

function showFormUI(type) {
    var div=document.getElementById(type);
    if(!boolean){
      div.style.display="block";
      boolean=true;
    }
    else {
      hideFormUI(type);
    }
}
function hideFormUI(type) {
  var div=document.getElementById(type);
  div.getElementsByClassName("txt1")[0].value="";
  div.getElementsByClassName("txt2")[0].value="";
  div.getElementsByClassName("error1")[0].innerHTML="";
  div.getElementsByClassName("error2")[0].innerHTML="";
  div.getElementsByClassName("txt1")[0].style.borderColor="blue";
  div.getElementsByClassName("txt2")[0].style.borderColor="blue";
  div.style.display="none";
  boolean=false;
}
function LogOut(){
	var result=window.confirm("Are You Sure to Logout Your Account?");
	if(result == true){
		Ajax_Logout();		//change db active 0
	}
}

function DeleteAccount(){
	var result=window.confirm("Are You Sure to Delete Your Account?");
	if(result == true){
		Ajax_DeleteAccount();
	}
}

function changeAdvanceUser(){
	var result=window.confirm("Are You Sure to Update Your Account?");
		if(result == true){
			Ajax_updateuserType();
		}
}
//-------------------------------------------------------
var btn=document.getElementsByClassName("btn");
var txt1=document.getElementsByClassName("txt1");
var txt2=document.getElementsByClassName("txt2");
var error1=document.getElementsByClassName("error1");
var error2=document.getElementsByClassName("error2");

  for(var i=0;i<btn.length;i++){
    btn[i].onclick=(function(i,txt1,txt2) {     //when click each updateButon
      return function() {
        //alert(txt1[i].value+"\n"+txt2[i].value);
        if(showtxt1_error(i) && showtxt2_error(i)){
          if(i==3 && checktextbox_phone(3)){ //phone
            //this function post data of 2textbox to ChangeAccountSetting.php
            Ajax_ChangeAccountSetting(txt1[i].value,txt2[i].value,i);
          }
          else {
            Ajax_ChangeAccountSetting(txt1[i].value,txt2[i].value,i);
          }
        }
        else {
            showtxt1_error(i);
            showtxt2_error(i);
            if(i==3)
              checktextbox_phone(3);
          }
      }
    })(i,txt1,txt2);

    txt1[i].onkeydown=(function(i) {
      return function(e) {
        showORclearError(e,i,1);
      }
    })(i);
    txt2[i].onkeydown=(function(i) {
      return function(e) {
        showORclearError(e,i,2);
      }
    })(i);
    txt1[i].onchange=(function(i) {
      return function(e) {
        showtxt1_error(i);
      }
    })(i);
    txt2[i].onchange=(function(i) {
      return function(e) {
        showtxt2_error(i);
      }
    })(i);
  }
  txt2[1].onkeyup=(function() { //to convert email to lowercase
    return function() {
      txt2[1].value=txt2[1].value.toLowerCase();
      Ajax_CheckAlready(txt2[1].value,"email");
    }
  })();
  txt2[3].onkeyup=(function() { //to check Already phone
    return function() {
        showtxt2_error(3);
        Ajax_CheckAlready(txt2[3].value,"phone");
    }
  })();

// this function check&&show error when user enter tab key and clear error when user enter any char
  function showORclearError(e,i,type) {
    var charCode;
  	if(e && e.which){
  		charCode=e.which;
  	}
  	else if(window.event){
  		e=window.event;
  		charCode=e.keyCode;
  	}
    if(charCode==9 || charCode==13){
      if(type==1){
        if(showtxt1_error(i) && charCode==13)
          txt2[i].focus();
      }
      if(type==2){
        if(i==3) checktextbox_phone(3);
        if(showtxt2_error(i) && charCode==13)
          btn[i].focus();
      }
    }
    else if(charCode!=9){ //to clear error text
      clear_error(type,i);
    }
  }
  function checktextbox_phone(i) {
    var boo=true;
    if(txt2[i].value==""){
      txt2[i].style.borderColor="red";
      error2[i].innerHTML="Please Enter PhoneNumber";
      boo=false;
    }
    else if(txt2[i].value.length<8){
      txt2[i].style.borderColor="red";
      error2[i].innerHTML="Please Enter Valid PhoneNumber";
      boo=false;
    }
    return boo;
  }

  function showtxt2_error(i) {
    var boo=true;
    if(i==0){ //if password textbox
      if(txt2[i].value.length<8){
        txt2[i].style.borderColor="red";
        error2[i].innerHTML="At least 8 character for security";
        boo=false;
      }
    }
    if(i==1){ //if email textbox
      var emailFormat=/[a-z 0-9]{1,}@[a-z]{1,}\.com/;
      if(!emailFormat.test(txt2[i].value)){
        txt2[i].style.borderColor="red";
        error2[i].innerHTML="Your EmailAddress is Invalid";
        boo=false;
      }
    }
    if (i==2) {
      if(txt2[i].value==""){
        txt2[i].style.borderColor="red";
        error2[i].innerHTML="Please Enter New UserName";
        boo=false;
      }
    }
    if(i==3){ //if phone textbox
      var phoneFormat=/09[0-9]{9}/;
      var invalidphoneFormat=/[a-z A-Z]{1,}/;

       if(invalidphoneFormat.test(txt2[i].value)){
        txt2[i].style.borderColor="red";
        error2[i].innerHTML="Your PhoneNumber is Invalid Number";
        boo=false;
      }
    }
    return boo;
  }

  function showtxt1_error(i) {
    var boo=true;
    if(txt1[i].value.length<8){
      txt1[i].style.borderColor="red";
      error1[i].innerHTML="Your Password is Incorrect.";
      boo=false;
    }
    return boo;
  }

  function clear_error(type,i) {
    if(type==1){
      txt1[i].style.borderColor="blue";
      error1[i].innerHTML="";
    }
    if(type==2){
      txt2[i].style.borderColor="blue";
      error2[i].innerHTML="";
    }
  }

/*------------------------
--------AjaxFunction------
--------------------------*/
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
        txt2[3].style.borderColor="red";
        error2[3].innerHTML="This PhoneNumber is Already Exist....";
      }
      if(data_return==2){
        txt2[1].style.borderColor="red";
        error2[1].innerHTML="This EmailAddress is Already Exist....";
      }
    }
  }
  request.send(send_data);
}

function Ajax_ChangeAccountSetting(par1,par2,i){
		var request=new XMLHttpRequest();
		var url="../php/ChangeAccountSetting.php";
		var send_data="password="+par1+"&&par2="+par2+"&&type="+i;

		request.open("POST",url,true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		request.onreadystatechange=function(){
			if(request.readyState ==4 && request.status ==200){
				var return_data=request.responseText;
				//alert(return_data);
        if(return_data==2){   //if Incorrect passwords
          txt1[i].style.borderColor="red";
          error1[i].innerHTML="Your Password is Incorrect.";
        }
        else if(return_data==1){ //if Success
          alert("Success Update");
          switch (i) {
            case 0:hideFormUI("Password");
              break;
            case 1:hideFormUI("Email");
              break;
            case 2:hideFormUI("UserName");
              break;
            case 3:hideFormUI("Phone");
              break;
          }
        }
        else {
          alert("Update Fail!, Please Fill Form Carefully");
        }
			}
		}
		request.send(send_data);
	}

function Ajax_Logout() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var data_return=xmlhttp.responseText;
			if(data_return==1){
				window.open("../html/login.html","_self");
        CookieUtil.unset("user_type");
			}
		}
    };
    xmlhttp.open("GET","../php/Account Setting/Logout.php", true);
    xmlhttp.send();
}

function Ajax_DeleteAccount() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var data_return=xmlhttp.responseText;
  			if(data_return==1){
  				window.open("../html/login.html","_self");
          CookieUtil.unset("user_type");
  			}
		   }
    };
    xmlhttp.open("GET","../php/Account Setting/DeleteAccount.php", true);
    xmlhttp.send();
}

function Ajax_updateuserType() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var data_return=xmlhttp.responseText;
					if(data_return==1){
						//var btnAdvance=document.getElementById("btnAdvance");
						var profile=parent.document.getElementById("profile");
						var post=parent.document.getElementById("post");
						var foryou=parent.document.getElementById("foryou");
						var wishlist=parent.document.getElementById("wishlist");
            var orderlist=parent.document.getElementById("order");
							alert("Success,You Can Sell Your Product");
                CookieUtil.unset("user_type");
                CookieUtil.set("user_type","advanceuser");
							foryou.style.display="block";
							wishlist.style.display="block";
							profile.style.display="block";
							post.style.display="block";
              orderlist.style.display="block";

							document.getElementById("btnAdvance").style.display="none";
					}
			}
    };
    xmlhttp.open("POST","../php/Account Setting/UpdateUserType.php", true);
    xmlhttp.send();
}
