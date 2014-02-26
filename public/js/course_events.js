

$(document).ready(function() {
    $("[id^=delete]").click(deleteClass);
});

function deleteClass(e) {
	console.log("need to delete this: "+ classname);
	var classname = $(this).attr("classname");
	$.get("/deleteclass/" + classname, function(result) {
		if(result) {
			document.location = "/home";
		}
	});
}