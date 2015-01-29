$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();
	
	//Handles class-"active" and visibility of sections according to navchoice-click
	$("body").on("click", "#headerNavDiv a", function() {
		$("#headerNavDiv li").removeClass("active");
		$(this).parent().addClass("active");
		$("section").hide();
		console.log($(this).attr("id"));
		var rightString = $(this).attr("id");
		$("section."+rightString).show();
	});

});


