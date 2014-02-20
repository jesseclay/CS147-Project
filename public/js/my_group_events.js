$(document).ready(function() {
    $("[id^=leave]").click(leaveGroup);
});


function leaveGroup(e) {
	var groupid = $(this).attr("groupid");
	console.log("id: " + groupid);
	$.get("/leave_group/" + groupid, function(result) {
		if(result) {
			document.location = "/mygroups";
		}
	});
}