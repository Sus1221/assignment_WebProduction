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


	//create array to store names of a-tags in header nav
	var opsToSelectCat = [];
	//grab values of each a-tag in header nav and push to array
	$("header nav ul li a").each(function() {
		opsToSelectCat.push($(this).text());
	});
	//create select
	var select = $("<select></select>");
	//create option tag for each item in array, push them into the select-tag
	for (var i = 0; i < opsToSelectCat.length ; i++) {
	select.append("<option>"+opsToSelectCat[i]+"</option>");
	}
	//Empty 
	$("#selectInNewArticleForm").html(select);



});


//<option value="volvo">Volvo</option>