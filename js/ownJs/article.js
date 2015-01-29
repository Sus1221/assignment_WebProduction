$(function() {

	/*
	Create a select to put in admin form to select position for article in menu
	*/
	//create array to store names of a-tags in header nav
	var opsToSelectCat = [];
	//grab values of each a-tag in header nav and push to array
	$("header nav ul li:not(.disabled, .liNotInSelect) a").each(function() {
		opsToSelectCat.push($(this).text());
	});
	//create select
	var select = $("<select></select>");
	//Add a choice if the article should be put at top-level
	select.append("<option>Toppnivå</option>");
	//create option tag for each item in array, push them into the select-tag
	for (var i = 0; i < opsToSelectCat.length ; i++) {
	select.append("<option>"+opsToSelectCat[i]+"</option>");
	}
	//Replace content in div with newly created select
	$("#selectInNewArticleForm").html(select);

	//When submitting a new article
	$("#newArticleForm").submit(function() {

		var article = {};
		// article.parent = $("#newArticleForm select option:selected").text();
		article.heading = $("#articleHeading").val();
		article.body = $("#articleBody").val();
		console.log(article);
		//empty form
		this.reset();
		//run to send article-data to db
		articleToDb(article);
		return false;
	});

	//function to send new article to db
	function articleToDb(article) {
		console.log(article);
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"articleInfo" : article
			},
			success: function(data) {
				console.log("Success for articleToDb", data);
			},
			error: function(data) {
				console.log("Error for articleToDb", data, data.responseText);
			}
		});
	}

	function getArticles() {

	}
});