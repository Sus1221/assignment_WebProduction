$(function() {
	//hides and shows right sections
	$("section").hide();
	$("section.home").show();
	//run function related to push-pop-state
	onPopAndStart();
	//update footer with data from database
	getFooterData();
	//related to push-and-popstate
	addEventListener("popstate",onPopAndStart);
	//update menu with data from database
	getMenuItemsFromDb();

	//When submitting a new article
	$("#newArticleForm").submit(function() {
		//Create object and put data from form in it
		var article = {};
		article.heading = $("#articleHeading").val();
		article.body = $("#articleBody").val();
		article.picWay = $("#pictureInput").val();
		article.selectedCat = $("#newArticleForm .categorySelect :selected").val();
		//empty form
		this.reset();
		//run articleToDb that sends object to db
		articleToDb(article);
		return false;
	});

	//when user clicks button "Ta bort ett inlägg" - to delete an article
	$("#deleteArticleButton").on("click", function(event) {
		//Empty form
		$("#deleteArticleForm").html("");
		//get all articles for user to be able to choose from
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"allArticles": 1
			},
			success: function(data) {
				console.log("Success of deleteArticleAjax1");
				//send article info to function that creates select
				printToSelect(data);
			},
			error: function(data) {
				console.log("Error of onclick deleteArticleAjax1");
			}
		});
		event.preventDefault();
	});

	//When user has chosen article to delete
	$("#deleteArticleForm").submit(function() {
		//grab selected article data
		var selectVal = $("#deleteArticleForm select option:selected").data("pageData");
		//run function to delete and article in db
		sendDeleteRequest(selectVal);
		return false;
	});

	//When user wants to edit an article
	$("#editArticleButton").on("click", function(event) {
		$("#editArticleForm").html("");
		//get all articles from database
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"allArticles": 1
			},
			success: function(data) {
				//run function to print all articles to select
				printToSelect2(data);
			},
			error: function(data) {
				console.log("Error of onclick editArticleAjax1");
			}
		});
		event.preventDefault();
	});

	//When user is done choosing wich article to edit
	$("#editArticleForm").submit(function() {
		//grab chosen article from selected option
		var selectVal = $("#editArticleForm select option:selected").data("pageData");
		//run function to grab the selected article from db
		articleToEditRequest(selectVal);
		return false;
	});

	//when user is done editing an article
	$(document).on("click", "#sendEditedArticleButton", function() {
		//grab title and body data and put in object
		articleToEdit[0].title = $("#editedTitle").val();
		articleToEdit[0].body = $("#editedBody").val();
		//send edited article to db
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"updatedArticle": articleToEdit[0]
			},
			success: function(data) {
				//print success message to user
				$("#editForm").html("Ändringen lyckades!");
			},
			error: function(data) {
				console.log("error for sending edited article", data, data.responseText);
			}
		});
		return false;
	});

	//when search-article-title form is submitted
	$("#searchForm").submit(function() {
		//grab searchword
		var searchWord = $("#searchField").val();
		//send it to bd
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"search": searchWord
			},
			success: function(data) {
				//send searchresult to function that prints it to user
				printSearchResult(data);
			},
			error: function(data) {
				console.log("error for search submit", data, data.responseText);
			}
		});
		//empty form
		this.reset();
		return false;
	});

	//When submitting new footer-data
	$('#footerForm').submit(function() {
		//create object for footerinfo
		var footerInfo = {};
		//grab footerinfo from form inputs
		footerInfo.name = $("#footerName").val();
		footerInfo.street = $("#footerStreet").val();
		footerInfo.zip = $("#footerZip").val();
		footerInfo.city = $("#footerCity").val();
		footerInfo.phone = $("#footerPhone").val();
		footerInfo.email = $("#footerEmail").val();
		//empty the form at submit
		this.reset();
		//run functions to send footerInfo to db and update footer
		footerInfoToDb(footerInfo);
		getFooterData();
		return false;
	});
});