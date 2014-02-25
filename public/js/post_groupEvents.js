$(document).ready(function() {
	initializePage();
})

function initializePage() {
	console.log("hi");
	getLocation();
	$("#locationSelector").change(setLocationFields);
}

function getLocation(){
	if (navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
  	else{console.log("Geolocation is not supported by this browser.");}
}
function showPosition(position){
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	$("#currLoc").attr("data-lat",lat);
	$("#currLoc").attr("data-lng",lng);
	$("#hiddenLat").attr("value",lat);
	$("#hiddenLng").attr("value",lng);
}

function showError(error){
 	switch(error.code) {
	    case error.PERMISSION_DENIED:
	      	console.log("User denied the request for Geolocation.");
	      	$("#currLoc").remove();
	      	var selection = $("#locationSelector :first-child");
			$("#hiddenLat").attr("value",selection.attr("data-lat"));
			$("#hiddenLng").attr("value",selection.attr("data-lng"));
	      break;
	    case error.POSITION_UNAVAILABLE:
	      console.log("Location information is unavailable.");
	      break;
	    case error.TIMEOUT:
	      console.log("The request to get user location timed out.");
	      break;
	    case error.UNKNOWN_ERROR:
	      console.log("An unknown error occurred.");
	      break;
	}
}

function setLocationFields(){
	console.log("picked");
	var selection = $("#locationSelector :selected");
	$("#hiddenLat").attr("value",selection.attr("data-lat"));
	$("#hiddenLng").attr("value",selection.attr("data-lng"));
}