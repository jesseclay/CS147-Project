$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$(".dropdown-menu li a").click(function(e){
		e.preventDefault();
		$("#dropdownFilter:first-child").text($(this).text()+ " ");
		$("#dropdownFilter:first-child").append("<span class='caret'></span>");
      	$("#dropdownFilter:first-child").val($(this).text());
	});

	$(".list-group-item").unbind("click").bind("click", function(e){
		e.preventDefault();
		var valueElement = $(this).find(".valueContainer");
		if (valueElement.css("display")=="none"){
			$(this).find('.extraInfo').css("display","none");
			valueElement.css("display","inline-block");
			$(this).find('.nameContainer').css('width',($(this).width()-valueElement.width()-20)+"px");
		}
		else if($(this).find('.extraInfo').size()!=0){
			$(this).find('.extraInfo').css("display","default");
			valueElement.css("display","none");
			$(this).find('.nameContainer').css('width',$(this).width()-20+"px");
		}
		else{
			var group = $(this).data();
			var infoHTML = "<div class='extraInfo'>Time: " + group.starttime + " - " + 
			group.endtime + "</div>" +  
			"<div class='extraInfo'>Location: " + group.location + "</div>";
			valueElement.css("display","none");
			$(this).append(infoHTML);
			$(this).find('.nameContainer').css('width',$(this).width()-20+"px");
		}
	});
}
