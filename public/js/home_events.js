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
			valueElement.css("display","");
			$('.addclass').css("display","none");	
			$('.searchbar').css("display","none");

			//valueElement.css("display","inline-block");
			//$(this).find('.searchbar').css('width',($(this).width()-valueElement.width()-20)+"px");
		}
		else{			
			$(".addclass").css("display","");	
			$(".addclass").css("margin-left","25%");						
			valueElement.css("display","none");
			$('.searchbar').css("display","");
			
			//$(this).find('.searchbar').css('width',$(this).width()-20+"px");
		}
	});

	var classTags = ["CHEM31A", "CHEM31B", "CHEM33", "CS103", "CS106A", "CS106B", "CS107",
					"CS108", "CS109", "CS110", "CS140", "CS142", "CS147", "MATH21", 
					"MATH23", "MATH41", "MATH42", "MATH51", "PHYSICS21", "PHSYICS23",
					"PHYSICS41", "PHSYICS42"];

	$(".addclass").unbind('click').click(function(event) {
		$(".alert").remove();
		var classname = $("#search").val();
		var match = false;
		for(var i = 0; i < classTags.length; i++) {
			if(classTags[i] === classname) {
				match = true;
				break;
			}
		}
		console.log("hittt");
		if(match) {
			window.location = "/course_add?classname=" + classname;
		} else {
			console.log("shit");
			$(".searchbar").after("<div class='alert alert-warning'>Not a valid class</div>");
		}
	});



	$("#search").autocomplete({
      source: classTags
    });

}




