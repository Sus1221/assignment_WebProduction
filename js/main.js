$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();

	$("body").on("click", "#headerNavDiv a", function() {
		console.log("klick");
		$("section").hide();
		console.log($(this).attr("id"));
	});

});
