$(document).ready(function() {
    $("[id^=join]").click(joinGroup);
    $("[id^=leave]").click(leaveGroup);
});

function joinGroup(e) {
	var groupid = $(this).attr("groupid");
	console.log("id: " + groupid);
	$.get("/join_group/" + groupid, function(result) {
		if(result) {
			document.location = "/map";
		}
	});
}

function leaveGroup(e) {
	var groupid = $(this).attr("groupid");
	console.log("id: " + groupid);
	$.get("/leave_group/" + groupid, function(result) {
		if(result) {
			console.log(result);
		}
	});
}