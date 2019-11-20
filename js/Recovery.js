var domEmail=document.getElementById("email");
var domquestion=document.getElementById("question");
var domanswer=document.getElementById("answer");
var emailError=document.getElementById("emailError");
var answerError=document.getElementById("answerError");

function checkValidation(){
  if(show_error("emailError","email") && show_error("answerError","answer")){
    ajax_checkdata(domEmail.value,domquestion.value,domanswer.value);
  }
  else{
    show_error("emailError","email");
    show_error("answerError","answer");
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
    var emailFormat=/[a-z 0-9]{1,}@[a-z]{1,}\.com/;
    if(!emailFormat.test(txtdata)){
      document.getElementById(errorText).innerHTML="Please Enter Vaild Eamil...";
      document.getElementById(type).style.borderColor="red";
      boo=false;
    }
  }
  return boo;
}

domEmail.onchange=function(){
  show_error("emailError","email");
};
domEmail.onkeyup=function(){
  var email=document.getElementById("email");
  email.value=email.value.toLowerCase();
};
domEmail.onkeydown=function(e){
  document.getElementById("emailError").innerHTML="";
  document.getElementById("email").style.borderColor="blue";
};
domanswer.onkeydown=function(e){
  document.getElementById("answerError").innerHTML="";
  document.getElementById("answer").style.borderColor="blue";
  document.getElementById("question").style.borderColor="blue";
};
domquestion.onchange=function() {
  document.getElementById("question").style.borderColor="blue";
  document.getElementById("answer").style.borderColor="blue";
};


function ajax_checkdata(email,question,answer){
  var request=new XMLHttpRequest();
  var url="../php/Recovery.php";
  var send_data="email="+email+"&question="+question+"&&answer="+answer;
  request.open("POST",url,true);
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  request.onreadystatechange=function(){
    if(request.readyState ==4 && request.status ==200){
      var data_return=request.responseText;
    //  alert(data_return);
      if(data_return==1){
        document.getElementById("emailError").innerHTML="The email you entered doesn't appear belong to an account.Please check your email address and try again.";
        document.getElementById("email").style.borderColor="red";
      }
      else if(data_return==2){
        document.getElementById("answerError").innerHTML="Question or Answer is incorrect Please select correct question and anser carefully";
        document.getElementById("answer").style.borderColor="red";
        document.getElementById("question").style.borderColor="red";
      }
      else {
        window.open("../html/login.html","_self");
        alert("Your Password is "+data_return+"\n You Can SignIn Your Account with this Password");

      }
    }
  }
  request.send(send_data);
}
