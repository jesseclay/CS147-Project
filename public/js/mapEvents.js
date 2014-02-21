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
}


function joinGroup(e) {
	e.stopPropagation();
	var groupid = $(this).attr("groupid");
	console.log("id: " + groupid);
	$.get("/join_group/" + groupid, function(result) {
		if(result) {
			toggleButton(groupid);
		}
	});
}

function toggleButton(groupid)
{
	if($('#leave' + groupid).size() == 0) {
		$('#join' + groupid).text("Leave Group");
		$('#join' + groupid).attr("id","leave"+groupid);
	} else { //leave group
		$('#leave' + groupid).text("Join Group");
		$('#leave' + groupid).attr("id","join"+groupid);
	}

}

function leaveGroup(e) {
	e.stopPropagation();
	var groupid = $(this).attr("groupid");
	console.log("id: " + groupid);
	$.get("/leave_group/" + groupid, function(result) {
		if(result) {
			toggleButton(groupid);
		}
	});
}