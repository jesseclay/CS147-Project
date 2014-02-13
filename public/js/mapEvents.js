$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$(".dropdown-menu li a").click(function(){
		$(".btn:first-child").text($(this).text()+ " ");
		$(".btn:first-child").append("<span class='caret'></span>");
      	$(".btn:first-child").val($(this).text());
	});

	$(".list-group-item").unbind("click").bind("click", function(e){
		e.preventDefault();
		var valueElement = $(this).find(".valueContainer");
		if (valueElement.css("visibility")=="hidden"){
			$(this).find('.extraInfo').css("display","none");
			valueElement.css("visibility","visible");
		}
		else if($(this).find('.extraInfo').size()!=0){
			$(this).find('.extraInfo').css("display","default");
			valueElement.css("visibility","hidden");
		}
		else{
			var group = $(this).data();
			var infoHTML = "<div class='extraInfo'>Time: " + group.starttime + " - " + 
			group.endtime + "</div>" +  
			"<div class='extraInfo'>Location: " + group.location + "</div>";
			valueElement.css("visibility","hidden");
			$(this).append(infoHTML);
		}
	});
}
