$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();
	onPopAndStart();
	createSelectForArticleMenu();
	createMenuSelect();
	getFooterData();
	addEventListener("popstate",onPopAndStart);


});