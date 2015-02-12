$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();
	onPopAndStart();
	createSelectForArticleMenu();
	createMenuSelect();
	getFooterData();
	addEventListener("popstate",onPopAndStart);
	getMenuItemsFromDb();


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

	$(document).on("click", "#sendEditedArticleButton", function() {
		console.log("articleToEdit global:", articleToEdit[0]);
		articleToEdit[0].title = $("#editedTitle").val();
		articleToEdit[0].body = $("#editedBody").val();
		console.log("article to edit no 0: ", articleToEdit[0]);
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"updatedArticle": articleToEdit[0]
			},
			success: function(data) {
				console.log("Success for sending edited article", data);
				$("#editForm").html("Ändringen lyckades!");
			},
			error: function(data) {
				console.log("error for sending edited article", data, data.responseText);
			}
		});
		return false;
	});

	$("#searchForm").submit(function() {
		var searchWord = $("#searchField").val();
		console.log("searchField data", searchWord);
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"search": searchWord
			},
			success: function(data) {
				console.log("Success for search submit", data);
				printSearchResult(data);
			},
			error: function(data) {
				console.log("error for search submit", data, data.responseText);
			}
		});
		return false;
	});

	$("#addNewMenu").submit(function() {
		var menuInfo = {};
		menuInfo.title = $("#menuNameInput").val();
		menuInfo.path = $("#menuPathInput").val();
		menuInfo.plid = $("#menuParentInput").val();
		menuInfo.weight = $("#menuWeightInput").val();
		console.log("menuInfo object: ", menuInfo);
		sendNewMenuInfo(menuInfo);
		this.reset();
		return false;
	});
});