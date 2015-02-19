
	function createSelectForArticleMenu() {
		/*
		Create a select to put in admin form to select position for article in menu
		*/
		//create array to store names of a-tags in header nav
		var opsToSelectCat = [];
		//grab values of each a-tag in header nav and push to array
		$("header nav ul li:not(.disabled, .liNotInSelect) a").each(function() {
			opsToSelectCat.push($(this).attr("href"));
		});
		//create select
		var select = $("<select class='categorySelect'></select>");
		//Add a choice if the article should be put at top-level
		//create option tag for each item in array, push them into the select-tag
		for (var i = 0; i < opsToSelectCat.length ; i++) {
			select.append("<option value='"+opsToSelectCat[i]+"'>"+opsToSelectCat[i]+"</option>");
		}
		//Replace content in div with newly created select
		$("#divForSelectInNewArticleForm").html(select);
	}

	//function to send new article to db
	function articleToDb(article) {
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"articleInfo" : article
			},
			success: function(data) {
			},
			error: function(data) {
				console.log("Error for articleToDb", data, data.responseText);
			}
		});
	}

	function getAllArticles() {
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"allArticles": 1
			},
			success: function(data) {
				printArticles(data);
			},
			error: function(data) {
				console.log("Error of getAllArticles", data);
			}
		});
	}

	function printArticles(data) {
		//Empty section
		$("section.all").html("");
		//Print body and created of each article
		for (var i = 0; i < data.length ;i++) {
			$("section.all").append("<p>" + data[i].title + "</p>");
			$("section.all").append("<p>" + data[i].body + "</p>");
			$("section.all").append("<p>" + (data[i].created).substring(0,16) + "</p>");
			$("section.all").append("<img src='" + data[i].path + "'>");
			$("section.all").append("<hr>");
		}
	}

	function printToSelect(data) {
		var select = $("<select></select>");
		for(var i = 0; i < data.length; i++) {
			var option = $("<option>" + data[i].title + " " +data[i].created + "</option>");
			option.data("pageData", data[i]);
			select.append(option);
		}
		$("#deleteArticleForm").append(select);
		$("#deleteArticleForm").append('<button class="btn btn-default" type="submit">Radera inlägg</button');
	}

	function printToSelect2(data) {
		var select = $("<select></select>");
		for(var i = 0; i < data.length; i++) {
			var option = $("<option>" + data[i].title + " " +data[i].created + "</option>");
			option.data("pageData", data[i]);
			select.append(option);
		}
		$("#editArticleForm").append(select);
		$("#editArticleForm").append('<button class="btn btn-default" type="submit">Redigera inlägg</button');
	}

	function sendDeleteRequest(object) {
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"deleteThis": object
			},
			success: function(data) {
			},
			error: function(data) {
				console.log("Error of sendDeleteRequest function",data,data.responseText);
			}
		});
	}
	function articleToEditRequest(object) {
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"articleToEdit": object
			},
			success: function(data) {
				articleToEdit = data;
				printEditForm(data);
			},
			error: function(data) {
				console.log("Error of sendArticleToEditRequest function",data,data.responseText);
			}
		});
	}

	function printEditForm(data) {
		var editForm = $("<form class='col-xs-6 col-sm-6 col-md-4 col-lg-4' id='editForm'></form>");
		var input1 = $("<input type='text' id='editedTitle'>");
		var textarea = $("<textarea type='text' id='editedBody'></textarea>");
		input1.val(data[0].title);
		textarea.val(data[0].body);
		editForm.append(input1,textarea, "<button id='sendEditedArticleButton'>Uppdatera artikel</button>");
		// editForm.append("<input type='text' id='editedTitle' value='" +data[0].title + "'>");
		// editForm.append("<input type='text' id='editedBody' value='" + data[0].body + "'>");
		// editForm.append("<button id='sendEditedArticleButton'>Uppdatera artikel</button>");
		$("#editFormDiv").html(editForm);
	}

	function printSearchResult(response) {
		$('#mySearchModal').modal('show');
		var result = $("<div/>");
		if(response.length > 0){
			for (var i = 0; i < response.length; i++) {
				result.append("<p>" + response[i].title + "</p>");
				result.append("<p>" + response[i].body + "</p>");
				result.append("<p>" + (response[i].created).substring(0,16) + "</p>");
				result.append("<hr>");
			}
		}else {
			result.append("Hittade ingen artikel");
		}
		$(".modal-body").html(result);
	}

	var rightCat;
	function getArticlesInOneCategory(requestParam) {
		//give variable at bottom-level value of requestParam
		rightCat = requestParam;
		$.ajax({
			url: "php/article.php",
			dataType: "json",
			data: {
				"articleCatToSearchFor": requestParam
			},
			success: function(data) {
				printInRightSection(data);
			},
			error: function(data) {
				console.log("Error of getArticlesInOneCategory function",data,data.responseText);
			}
		});
	}



	function printInRightSection(articles) {
		var correctSection = $("section."+rightCat);
		correctSection.html("");
		//Print body and created of each article
		for (var i = 0; i < articles.length ;i++) {
			correctSection.append("<p>" + articles[i].title + "</p>");
			correctSection.append("<p>" + articles[i].body + "</p>");
			correctSection.append("<p>" + (articles[i].created).substring(0,16) + "</p>");
			correctSection.append("<img src='" + articles[i].path + "'>");
			correctSection.append("<hr>");
		}
	}