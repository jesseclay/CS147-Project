$(document).ready(function() {
	initializePage();
})

function initializePage() {
	

	$(".addsearch").unbind("click").bind("click", function(e){
		e.stopPropagation();
		e.preventDefault();
		var valueElement = $(".addsearch");
		if (valueElement.css("display")=="none"){
			console.log("there");
			valueElement.css("display","default");
			$('.addclass').css("display","none");	
			$('.searchbar').css("display","none");

			//valueElement.css("display","inline-block");
			//$(this).find('.searchbar').css('width',($(this).width()-valueElement.width()-20)+"px");
		}
		else{
			console.log("here");
			$(".addclass").css("display","default");	
			$(".addclass").css("margin-left","25%");						
			valueElement.css("display","none");
			$('.searchbar').css("display","default");
			//$(this).find('.searchbar').css('width',$(this).width()-20+"px");
		}
	});

}


