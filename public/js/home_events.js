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
			// valueElement.css("display","none");
			$('.searchbar').css("display","initial");
			//$(this).find('.searchbar').css('width',$(this).width()-20+"px");
		}
	});

	var classTags = ["CHEM31A", "CHEM31B", "CHEM33", "CS103", "CS106A", "CS106B", "CS107",
					"CS108", "CS109", "CS110", "CS140", "CS142", "CS147", "MATH21", 
					"MATH23", "MATH41", "MATH42", "MATH51", "PHYSICS21", "PHSYICS23",
					"PHYSICS41", "PHSYICS42"];

	$("#search").autocomplete({
      source: classTags
    });

}


