var startTime;

$(document).ready(function() {
	startTime = new Date().getTime();
	initializePage();
})

function initializePage() {
	$(".dropdown-menu li a").click(function(e){
		e.preventDefault();
		$("#dropdownFilter:first-child").text($(this).text()+ " ");
		$("#dropdownFilter:first-child").append("<span class='caret'></span>");
      	$("#dropdownFilter:first-child").val($(this).text());
      	window.location.href = $(this).attr("href");
	});

	$(".list-group-item").unbind("click").bind("click", function(e){
		e.stopPropagation();
		e.preventDefault();
		var valueElement = $(this).find(".valueContainer");
		if (valueElement.css("display")=="none"){
			$(this).find('.extraInfo').css("display","none");
			valueElement.css("display","inline-block");
			$(this).find('.nameContainer').css('width',($(this).width()-valueElement.width()-20-$(this).find('.checkBtn').width())+"px");
		}
		else{
			$(this).find('.extraInfo').css("display","default");
			valueElement.css("display","none");
			$(this).find('.nameContainer').css('width',$(this).width()-25-$(this).find('.checkBtn').width()+"px");
		}
	});
	$("[id^=join]").unbind("click").bind("click", joinGroup);
    $("[id^=leave]").unbind("click").bind("click", leaveGroup);


    $.each($(".join-leave-btn"), function(index, value){
    	var belongsToGroup = parseInt(($(value).attr("data-belongs")));
    	console.log(belongsToGroup);
    	var groupid = $(value).attr("groupid");
    	if(belongsToGroup === 1) {
    		$(value).text("Leave Group");
    		$(value).attr("id","leave"+groupid);
    		var checkBtn = $(value).parent().find(".checkBtn");
			checkBtn.removeClass("glyphicon-unchecked");
			checkBtn.addClass("glyphicon-check");
    	} 
	});

    $("#createGroup").click(function(){
    	var endTime = new Date().getTime();
  		var timeSpent = endTime - startTime;
    	ga("send", "event", "createGroup", "click", 'timeSpent',timeSpent);
    	ga("send", "timing", "createGroupTime", 'timeSpent' ,timeSpent);
    });

    $("#viewMap").click(function(){
    	ga("send", "event", "viewMap", "click");
    	ga("send", "timing", "viewMapTime", 'timeSpent' ,timeSpent);
    });
    getLocation();

}

function getLocation(){
	if (navigator.geolocation){
	    navigator.geolocation.getCurrentPosition(showPosition, showError);
	    console.log("here");
	}
	else{console.log("Geolocation is not supported by this browser.");}

}

function showPosition(position){
	lat = Math.abs(position.coords.latitude);
	lng = Math.abs(position.coords.longitude);
	var coordsLink = $("#coordsURL");
	if (coordsLink.attr("doubleTest")) return;
	coordsLink.attr("doubleTest",true);
	var url = coordsLink.attr("href");
	//console.log("before: " + url);
	url += "&lng=" + lng;
	url += "&lat=" + lat;
	//console.log("after: " + url);
	coordsLink.attr("href", url);
}

function showError(error){
 	switch(error.code) {
	    case error.PERMISSION_DENIED:
	      	console.log("User denied the request for Geolocation.");
	      	//$("#currLoc").remove();
	      	//var selection = $("#locationSelector :first-child");
			//$("#hiddenLat").attr("value",selection.attr("data-lat"));
			//$("#hiddenLng").attr("value",selection.attr("data-lng"));
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

function joinGroup(e) {
	console.log("hit join");
	e.stopPropagation();
	var groupid = $(this).attr("groupid");
	$.get("/join_group/" + groupid, function(result) {
		if(result) {
			toggleButton(groupid);
		}
	});
	var checkBtn = $(this).parent().find(".checkBtn");
	checkBtn.removeClass("glyphicon-unchecked");
	checkBtn.addClass("glyphicon-check");
}

function toggleButton(groupid)
{
	var count = parseInt($("#count"+groupid).attr("data-count"));
	if($('#leave' + groupid).size() == 0) {
		$('#join' + groupid).text("Leave Group");
		$('#join' + groupid).attr("id","leave"+groupid);
		count++;
    	$("#count"+groupid).attr("data-count", count);
    	$("#leave"+groupid).unbind("click").bind("click", leaveGroup);
	} else { //leave group
		$('#leave' + groupid).text("Join Group");
		$('#leave' + groupid).attr("id","join"+groupid);
		count--;
		$("#count"+groupid).attr("data-count", count);
		$("#join"+groupid).unbind("click").bind("click", joinGroup);
	}
	$("#count"+groupid).text("# of People: " + count);

}

function leaveGroup(e) {
	console.log("hit leave");
	e.stopPropagation();
	var groupid = $(this).attr("groupid");
	$.get("/leave_group/" + groupid, function(result) {
		if(result) {
			toggleButton(groupid);
		}
	});
	var checkBtn = $(this).parent().find(".checkBtn");
	checkBtn.removeClass("glyphicon-check");
	checkBtn.addClass("glyphicon-unchecked");
}