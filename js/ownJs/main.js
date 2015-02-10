$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();
	onPopAndStart();
	createSelectForArticleMenu();
	createMenuSelect();
	getFooterData();
	addEventListener("popstate",onPopAndStart);


	//When submitting a new article
	$("#newArticleForm").submit(function() {
		var article = {};
		// article.parent = $("#newArticleForm select option:selected").text();
		article.heading = $("#articleHeading").val();
		article.body = $("#articleBody").val();
		article.picWay = $("#pictureInput").val();
		console.log("article to submit data:", article);
		//empty form
		this.reset();
		//run to send article-data to db
		articleToDb(article);
		return false;
	});


	//when user clicks button "Ta bort ett inlägg"
	$("#deleteArticleButton").on("click", function(event) {
		$("#deleteArticleForm").html("");
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"allArticles": 1
			},
			success: function(data) {
				console.log("success in onclick deleteArticleAjax1",data);
				printToSelect(data);
			},
			error: function(data) {
				console.log("Error of onclick deleteArticleAjax1");
			}
		});
		event.preventDefault();
	});

	$("#deleteArticleForm").submit(function() {
		var selectVal = $("#deleteArticleForm select option:selected").data("pageData");
		console.log("selectVal: ",selectVal);
		sendDeleteRequest(selectVal);
		return false;
	});

	$("#editArticleButton").on("click", function(event) {
		$("#editArticleForm").html("");
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"allArticles": 1
			},
			success: function(data) {
				console.log("success in onclick editArticleAjax1",data);
				printToSelect2(data);
			},
			error: function(data) {
				console.log("Error of onclick editArticleAjax1");
			}
		});
		event.preventDefault();
	});

	$("#editArticleForm").submit(function() {
		console.log("Submit function for edit article form");
		var selectVal = $("#editArticleForm select option:selected").data("pageData");
		console.log("selectVal",selectVal);
		articleToEditRequest(selectVal);
		return false;
	});

	$("#editForm").submit(function() {
		console.log("On click for sendEditedArticleButton");
		console.log("global variable articleToEdit: ",articleToEdit);
		// $.ajax({
		// 	url: "php/article.php",
		// 	dataType: "json",
		// 	data: {
		// 		"updatedArticle": 1
		// 	},
		// 	success: function() {
		// 		console.log("Success for sending edited article", data);
		// 	},
		// 	error: function() {
		// 		console.log("error for sending edited article", data, data.responseText);
		// 	}
		// });
		return false;
	});
});