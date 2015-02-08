$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();
	createSelectForArticleMenu();
	
		//When submitting a new article
	$("#newArticleForm").submit(function() {
		var article = {};
		// article.parent = $("#newArticleForm select option:selected").text();
		article.heading = $("#articleHeading").val();
		article.body = $("#articleBody").val();
		console.log("article submit:", article);
		//empty form
		this.reset();
		//run to send article-data to db
		articleToDb(article);
		return false;
	});
});


