

$(document).ready(function() {
    $("[id^=delete]").click(deleteClass);

    $('.pre_delete').click(function(event) {
      $(".delete_warning-wrap").toggleClass("delete_warning-reset");
    }); 
    
    $('.delete_button-submit').click(function(event) {
      $(".delete_warning-wrap").removeClass("delete_warning-reset");
    }); 
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