
	var domcategory=document.getElementById("category");
	var domname=document.getElementById("name");
	var domprice=document.getElementById("price");
	var domcode=document.getElementById("code");
	var domdescription=document.getElementById("description");
	var domcity=document.getElementById("city");

	var name,price,code,description,city,gender,category,image1,image2,image3;
	//------------- to determind whether to insert or to update -----------
	var iframeName=parent.document.getElementById("post_iframe").name;
	var post_id=parent.document.getElementById("post_iframe").post_id;//if update

	//---------------------------------------
function getData(){
	if(iframeName=="update"){
		document.getElementById("btn").value="Update Now";
		var send_data="post_id="+parseInt(post_id);
		var request=new XMLHttpRequest();
		var url="../php/getOnePost.php";
		request.open("POST",url,true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		request.onreadystatechange=function(){
			if(request.readyState ==4 && request.status ==200){
				///alert(request.responseText);
				var data_return=JSON.parse(request.responseText);
				setFormData(data_return);
				//alert(data_return.name);
			}
		}
		request.send(send_data);
	}
}

function setFormData(data_return){
	domcategory.value=data_return.category;
	domname.value=data_return.name;
	domprice.value=data_return.price;
	domcode.value=data_return.code;
	domdescription.value=data_return.description;
	domcity.value=data_return.city;

	var radio=document.getElementsByName("gender");
	switch (data_return.gender) {
		case "male":radio[0].checked="checked";
								break;
		case "female":radio[1].checked="checked";
								break;
		case "both":radio[2].checked="checked";
							break;
	}
	document.getElementById("forImg").innerHTML=data_return.image1+data_return.image2+data_return.image3;

}

	/*---------------------------------------------------------------------------------------
	##### This functions work when user Click 'Tab' and 'Enter' after writing in textbox######
	-----------------------------------------------------------------------------------------*/
	domname.onkeydown=function(e){
		checkError("errorName","name",e)
	};

	domprice.onkeydown=function(e){
		checkError("errorPrice","price",e)
	};

	domcode.onkeydown=function(e){
		checkError("errorCode","code",e)
	};

	domdescription.onkeydown=function(e){
		checkError("errorDescription","description",e)
	};

	/*--------------------------------------------------------------------------
	---------This function are work when user start write any key in textbox----
	----------------------------------------------------------------------------*/
	domname.onkeyup=function(){
		clearError("errorName","name")
	};

	domprice.onkeyup=function(){
		clearError("errorPrice","price")
	};

	domcode.onkeyup=function(){
		clearError("errorCode","code")
	};

	domdescription.onkeyup=function(){
		clearError("errorDescription","description")
	};

	domprice.onchange=function(){
		show_error("errorPrice","price")
	};

	//-------This function display selected photo into <img></img>-------------
	function displaySelectedPhoto(selectedImageID,errorText){
		document.getElementById(errorText).innerHTML="";
		var fileSelected=document.getElementById(selectedImageID).files;
		//alert(fileSelected.length);
		if(fileSelected.length>0){
			var fileToLoad=fileSelected[0];
			if(fileToLoad.type.match("image.*")){
				var fileReader=new FileReader();
				fileReader.onload=function(fileLoadedEvent){
					var imgTag=document.getElementsByClassName("img");
					switch (selectedImageID) {
						case "image1":imgTag[0].src=fileLoadedEvent.target.result;
													document.getElementById("errorImage1").innerHTML="&nbsp;";
													break;
						case "image2":imgTag[1].src=fileLoadedEvent.target.result;
													document.getElementById("errorImage2").innerHTML="&nbsp;";
													break;
						case "image3":imgTag[2].src=fileLoadedEvent.target.result;
													document.getElementById("errorImage3").innerHTML="&nbsp;";
													break;
					}
				};
				fileReader.readAsDataURL(fileToLoad);
			}
		}
	}

	//------to clear error if no error--------------
	function clearError(errorText,text){
		document.getElementById(errorText).innerHTML="";
		document.getElementById(text).style.borderColor="blue";
	}

	//-------check error and show error to user-----
	function checkError(errorText,text,e){
		var charCode;
		if(e && e.which){
			charCode=e.which;
		}
		else if(window.event){
			e=window.event;
			charCode=e.keyCode;
		}
		if(charCode ==9){	//if you press Tab or Enter
		//alert("OK");
			show_error(errorText,text);
		}
	}

	function show_error(errorText,text) {
		var boo=true;
		var textbox=document.getElementById(text).value;
		document.getElementById(errorText).innerHTML="&nbsp;";
		if(textbox==""){
			document.getElementById(errorText).innerHTML="Please Enter "+text;
			document.getElementById(text).style.borderColor="red";
			boo=false;
		}
		else if(text=="price"){
			var priceFormat=/[a-z A-Z]{1,}/;
			if(priceFormat.test(textbox)===true){
				document.getElementById(errorText).innerHTML="Please Enter only Number";
				document.getElementById("price").style.borderColor="red";
				boo=false;
			}
		}
		return boo;
	}

	function checkValidation(){
		if(show_error("errorName","name") && show_error("errorPrice","price") && show_error("errorCode","code") &&
		 	show_error("errorDescription","description") && show_errorImage(0,"errorImage1") && show_errorImage(1,"errorImage2") && show_errorImage(2,"errorImage3")){
				 getFormdata();
				 console.log(image1);
				 //alert(image1);
				ajax_sell_update(image1,image2,image3,name,price,code,description,category,city,gender);
			}
		else {
			show_error("errorName","name");
			show_error("errorPrice","price");
			show_error("errorCode","code");
			show_error("errorDescription","description");
			show_errorImage(0,"errorImage1");
			show_errorImage(1,"errorImage2");
			show_errorImage(2,"errorImage3");
		}
	}
function show_errorImage(i,errorMessage) {
	var boo=true;
	var img=document.getElementsByClassName("img");
		if(img[i].src==""){
			document.getElementById(errorMessage).innerHTML="Please Select Photo";
			boo=false;
		}
		return boo;
}

function getFormdata() {
	 category=domcategory.value;
	 name=domname.value;
	 price=domprice.value;
	 code=domcode.value;
	 description=domdescription.value;
	 city=domcity.value;

	 var rdo=document.getElementsByName("gender");
	 if(rdo[0].checked)
	 	gender="male";
	 if(rdo[1].checked)
	 	gender="female";
	 if(rdo[2].checked)
	 	gender="both";

	var img=document.getElementsByClassName("img");
	var file=document.getElementsByClassName("imgfile");
	if(file[0].value)
		image1=file[0].files[0];
	else
		image1=base64toObject(img[0].src);
	if(file[1].value)
		image2=file[1].files[0];
	else
		image2=base64toObject(img[1].src);
	if(file[2].value)
		image3=file[2].files[0];
	else
		image3=base64toObject(img[2].src);
}

function base64toObject(dataURI) {
	/*var png=img.split(',')[1];
	var mimeString=img.split(',')[0].split(':')[1].split(';')[0];
	var blob=new Blob([window.atob(png)],{type:'image/png',encoding:'utf-8'});

	//var file=new File([blob],"file.png",{type:contentType,lastModified:Date.now})
	blob.lastModifiedDate=new Date();
	blob.name="aa.png";
	return blob;*/
	// convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ia], { type: mimeString ,encoding:'utf-8'});

    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    blob.lastModifiedDate = new Date();
    blob.name = "a.png";
    //Cast to a File() type

    return blob;
}

	function ajax_sell_update(image1,image2,image3,name,price,code,description,category,city,gender){
			var form=document.getElementById("postForm");
			var data=new FormData();
				data.append("image1",image1);
				data.append("image2",image2);
				data.append("image3",image3);
				data.append("name",name);
				data.append("price",price);
				data.append("code",code);
				data.append("description",description);
				data.append("category",category);
				data.append("city",city);
				data.append("gender",gender);
				data.append("type",iframeName);////to determind whether Insert of Update
				data.append("post_id",post_id);
			var request=new XMLHttpRequest();
			var url="../php/post.php";

			request.open("POST",url,true);
			//request.setRequestHeader("Content-Type","multipart/form-data");//must not content-type
			request.send(data);
			request.onreadystatechange=function(){
				if(request.readyState == 4 && request.status ==200){
					var data_return=request.responseText;
					alert(data_return);
				}
			}

	}
