$(function() {

	$("section").hide();
	$("section.home").show();
	onPopAndStart();
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
		article.selectedCat = $("#newArticleForm .categorySelect :selected").val();
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
				console.log("Success of deleteArticleAjax1");
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
				printToSelect2(data);
			},
			error: function(data) {
				console.log("Error of onclick editArticleAjax1");
			}
		});
		event.preventDefault();
	});

	$("#editArticleForm").submit(function() {
		var selectVal = $("#editArticleForm select option:selected").data("pageData");
		articleToEditRequest(selectVal);
		return false;
	});

	$(document).on("click", "#sendEditedArticleButton", function() {
		articleToEdit[0].title = $("#editedTitle").val();
		articleToEdit[0].body = $("#editedBody").val();
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"updatedArticle": articleToEdit[0]
			},
			success: function(data) {
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
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"search": searchWord
			},
			success: function(data) {
				printSearchResult(data);
			},
			error: function(data) {
				console.log("error for search submit", data, data.responseText);
			}
		});
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
	//when size of window changes
	$(window).resize(function(e) {
		//run function to re-style footer
		removeFooterClass();
	});

	//add/remove class of footer-wrapper for right appearance
	function removeFooterClass(){
		if($(window).width() < 768){
			$('#footer-wrapper').removeClass('nav-bar-fixed-bottom');
		} else {
		$('#footer-wrapper').addClass('nav-bar-fixed-bottom');
		}
}
});