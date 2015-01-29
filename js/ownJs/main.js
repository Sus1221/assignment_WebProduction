$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();
	
	//Handles class-"active" and visibility of sections according to navchoice-click
	$("body").on("click","a", function() {
		var href = $(this).attr("href");
		console.log(href);
		if ($(this).parents("#headerNavDiv").length > 0) {
			$("#headerNavDiv li").removeClass("active");
			$(this).parent().addClass("active");
			$("section").hide();
		
			var rightString = $(this).attr("href");
			$("section."+rightString).show();
		}
		event.preventDefault();
	});

});


