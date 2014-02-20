$(document).ready(function() {
	initializePage();
});

function initializePage() {
	$("[id^=join]").click(joinGroup);
    $("[id^=leave]").click(leaveGroup);
}

function joinGroup(e) {
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
	if($('#leave' + groupid).size() == 0) { //join group
		$('#join' + groupid).remove();
		 $(".container" + groupid).after(
		 "<button type='button' class='btn btn-default' id='leave" + groupid + "' groupid='" + groupid + "'>Leave Group</button>");
		 initializePage();
	} else { //leave group
		$('#leave' + groupid).remove();
		 $(".container" + groupid).after(
		 "<button type='button' class='btn btn-default' id='join" + groupid + "' groupid='" + groupid + "'>Join Group</button>");
		 initializePage();
	}

}

function leaveGroup(e) {
	var groupid = $(this).attr("groupid");
	console.log("id: " + groupid);
	$.get("/leave_group/" + groupid, function(result) {
		if(result) {
			toggleButton(groupid);
		}
	});
}