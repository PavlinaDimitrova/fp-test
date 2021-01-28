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
	const uluru = { lat: 43.8559990, lng: 25.9710007 };
	var map = new google.maps.Map(document.getElementById("map"), {zoom: 12,center: uluru, });
	const input = document.getElementById("address");
	const autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
	const infowindow = new google.maps.InfoWindow();
	const infowindowContent = document.getElementById("infowindow-content");
  	infowindow.setContent(infowindowContent);
  	const marker = new google.maps.Marker({map,anchorPoint: new google.maps.Point(0, -29),});
autocomplete.addListener("place_changed", function() {
    	const place = autocomplete.getPlace();
    if (!place.geometry) { window.alert("No details available for input: '" + place.name + "'");return;}
    let address = "";
    if (place.address_components) {address = [
        (place.address_components[0] && place.address_components[0].short_name) || "",
        (place.address_components[1] && place.address_components[1].short_name) || "",
        (place.address_components[2] && place.address_components[2].short_name) || "",].join(" ");
    }
    document.getElementById('gmform').value=place.geometry.location;
    infowindow.close();
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent = address;
});
let markercl;
google.maps.event.addListener(map, 'click', function(event) {
	const img="../gm_form_test/images/position2.png";
	const geocoder = new google.maps.Geocoder(); 
	const latlng=event.latLng;
    map.setCenter(latlng);
    if(markercl != undefined){ markercl.setMap(map);markercl.setIcon(img);markercl.setPosition(latlng);}
    else{markercl = new google.maps.Marker({
        position: latlng,
        map: map,icon: img,});
    }
	geocoder.geocode( {'latLng': latlng},
	  function(results, status) {
	    if(status == google.maps.GeocoderStatus.OK) {
	      if(results[0]) {
	      document.getElementById("address").value = results[0].formatted_address;
	      document.getElementById('gmform').value=latlng;
	      } else { document.getElementById("address").value = "No results";}
	    }else { document.getElementById("address").value = status; }
	});
});
document.getElementById("gmform").onsubmit = function() {
	var email=document.getElementById("email").value;
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
		localStorage.setItem(email,myForm);
		const x =document.getElementById('gmform').value;
		map.setCenter(x);
		if(markercl){markercl.setMap(null);}
    	markeradd = new google.maps.Marker({ position: x,map: map,icon: "../gm_form_test/images/x.png",title:email});  
      	infowindow.open(); 
      	markeradd.addListener("click", function(){
      	var fdata = localStorage.getItem(this.getTitle()).split('","');
		document.getElementById("name").value=fdata[0].replace(/(^"|"$)/g, '');
		document.getElementById("address").value=fdata[1];
		document.getElementById("email").value=fdata[2];
		document.getElementById("tel").value=fdata[3];
		document.getElementById("web").value=fdata[4].replace(/(^"|"$)/g, '');
      	});
		$('#gmform')[0].reset();
		$('#name').focus();
		event.preventDefault();
	}}	
};}
