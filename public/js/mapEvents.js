$(document).ready(function() {
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
			$(this).find('.nameContainer').css('width',($(this).width()-valueElement.width()-20)+"px");
		}
		else{
			$(this).find('.extraInfo').css("display","default");
			valueElement.css("display","none");
			$(this).find('.nameContainer').css('width',$(this).width()-20+"px");
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
    	} 
	});

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
}