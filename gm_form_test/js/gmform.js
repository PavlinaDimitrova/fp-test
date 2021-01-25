let map;
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("name").onfocusout = function(){$("#namevalidation").remove();validateName();};
	document.getElementById("address").onfocusout = function(){$("#addressvalidation").remove();validateAddress();};
	document.getElementById("tel").onfocusout = function(){$("#telvalidation").remove();validatePhone();};
	document.getElementById("email").onfocusout = function(){$("#emailvalidation").remove();validateemail();};
	document.getElementById("web").onfocusout = function(){$("#webvalidation").remove();validateWeb();};
    document.getElementById("gmform").onsubmit = function() {
    document.querySelectorAll(".validation").forEach(element => element.remove());
		if(validateName()==false || validateAddress()==false || validateemail()==false || validatePhone()==false || validateWeb()==false){
	    event.preventDefault();
		}else{
			if (localStorage.getItem(document.getElementById("email").value)) {
			   document.getElementById("email").insertAdjacentHTML('afterend', "<p id='emailvalidation' class='validation'>This email address already exists!</p>");
        		document.getElementById("email").focus();
        		event.preventDefault();
			} else {
			    var myForm = [];
				 $('.ls').each(function(){myForm.push(JSON.stringify($(this).val())) ;});
				localStorage.setItem(document.getElementById("email").value,myForm);			
				event.preventDefault();
			}
		}	
};});

function validateName(){
	if(document.getElementById("name").value==''){
		document.getElementById("name").insertAdjacentHTML('afterend', "<p id='namevalidation' class='validation'>Please insert name!</p>");
        document.getElementById("name").focus();
        return false;
	}else if (!/^[a-zA-Z а-яА-Я]*$/g.test(document.getElementById("name").value)) {
		document.getElementById("name").insertAdjacentHTML('afterend', "<p id='namevalidation' class='validation'>Invalid characters in the name! Only letters allowed!</p>");
        document.getElementById("name").focus();
        return false;
}}
function validateAddress(){
	if (document.getElementById("namevalidation")){document.getElementById("namevalidation").remove();}
	if(document.getElementById("address").value==''){
		document.getElementById("address").insertAdjacentHTML('afterend', "<p id='addressvalidation' class='validation'>Please enter address!</p>");       
        document.getElementById("address").focus();
        return false;
	}else if (!/^[a-zA-Z а-яА-Я0-9,.№/'"]*$/g.test(document.getElementById("address").value)) {
        document.getElementById("address").insertAdjacentHTML('afterend', "<p id='addressvalidation' class='validation'>Invalid characters in the address!</p>");
        document.getElementById("address").focus();
        return false;
 }}
function validatePhone(){
	if(document.getElementById("tel").value==''){
		document.getElementById("tel").insertAdjacentHTML('afterend', "<p id='telvalidation' class='validation'>Please enter telephone number!</p>");
        document.getElementById("tel").focus();
        return false;
	}else if (!/^[+0-9 ]*$/g.test(document.getElementById("tel").value)) {
        document.getElementById("tel").insertAdjacentHTML('afterend', "<p id='telvalidation' class='validation'>Invalid characters in the telephone!</p>");
        document.getElementById("tel").focus();
        return false;
}}
function validateemail(){
		if(document.getElementById("email").value==''){
		document.getElementById("email").insertAdjacentHTML('afterend', "<p id='emailvalidation' class='validation'>Please enter email address!</p>");
        document.getElementById("email").focus();
        return false;
	}else if (!/\S+@\S+\.\S+/.test(document.getElementById("email").value)) {
        document.getElementById("email").insertAdjacentHTML('afterend', "<p id='emailvalidation' class='validation'>Invalid E-Mail address!</p>");
        document.getElementById("email").focus();
        return false;
    }
}
function validateWeb(){
	if(document.getElementById("web").value==''){
		document.getElementById("web").insertAdjacentHTML('afterend', "<p id='webvalidation' class='validation'>Please enter Websait address!</p>");
        document.getElementById("web").focus();
        return false;
	}else if (!/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(document.getElementById("web").value)) {
        document.getElementById("web").insertAdjacentHTML('afterend', "<p id='webvalidation' class='validation'>Invalid web address!</p>");
        document.getElementById("web").focus();
        return false;
    }
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), { center: { lat: 43.527, lng: 25.574 }, zoom: 8,});
  const input = document.getElementById("address");
  const autocomplete = new google.maps.places.Autocomplete(input);

}