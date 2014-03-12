$(document).ready(function() {
    
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
	$(document).find('.nameContainer').css('width',($(document).find('.nameContainer').parent().width()-$(document).find('.valueContainer').width()-30-$(document).find('.checkBtn').width())+"px");
	$("[id^=leave]").click(leaveGroup);
});


function leaveGroup(e) {
	var groupid = $(this).attr("groupid");
	console.log("id: " + groupid);
	$.get("/leave_group/" + groupid, function(result) {
		if(result) {
			removeGroup();
			// document.location = "/mygroups";
		}
	});
	var groupToRemove = $(this).parent();
	function removeGroup(){
		groupToRemove.remove();
	}
}

