//Create a select to put in admin form where user selects category for article
function createSelectForArticleMenu() {
	//create array to store names of a-tags in header nav
	var opsToSelectCat = [];
	//grab href-value of each a-tag (except some) in header nav and push to array
	$("header nav ul li:not(.disabled, .liNotInSelect) a").each(function() {
		opsToSelectCat.push($(this).attr("href"));
	});
	//create select
	var select = $("<select class='categorySelect'></select>");
	//create option tag for each item in array, push options into the select-tag
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

//function to get all articles from db
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

//function to print all articles data to section.all
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

//put articles in options in select to choose one to delete
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

//put articles in options in select to choose one to edit
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

//send info about wich article the user wants to delete
function sendDeleteRequest(object) {
	console.log("sendDeleteRequest function at start", object);
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

//send info about wich article the user wants to edit
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

//Prints the data of the article about to be edited
function printEditForm(data) {
	//create new form
	var editForm = $("<form class='col-xs-6 col-sm-6 col-md-4 col-lg-4' id='editForm'></form>");
	//input with autofilled article heading
	var input1 = $("<input type='text' id='editedTitle'>");
	input1.val(data[0].title);
	//textarea with autofilled article body
	var textarea = $("<textarea type='text' id='editedBody'></textarea>");
	textarea.val(data[0].body);
	//put items into the form
	editForm.append(input1,textarea, "<button id='sendEditedArticleButton'>Uppdatera artikel</button>");
	//replace content in div with our form
	$("#editFormDiv").html(editForm);
}

//Prints result user asked for in search
function printSearchResult(response) {
	//show modal to append result to
	$('#mySearchModal').modal('show');
	var result = $("<div/>");
	//if a match was found in database
	if(response.length > 0){
		//print datas for each response item
		for (var i = 0; i < response.length; i++) {
			result.append("<p>" + response[i].title + "</p>");
			result.append("<p>" + response[i].body + "</p>");
			result.append("<p>" + (response[i].created).substring(0,16) + "</p>");
			result.append("<hr>");
		}
	//if match wasn't found, print that info
	}else {
		result.append("Hittade ingen artikel");
	}
	//append result to modal
	$(".modal-body").html(result);
}

//Create empty variable to store category choice in
var rightCat;
//get all articles belonging to ONE category
function getArticlesInOneCategory(requestParam) {
	//give variable at bottom-level value of requestParam = category user asked for
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

//Print articles of one category in section with the same class
function printInRightSection(articles) {
	var correctSection = $("section."+rightCat);
	//Enpty section
	correctSection.html("");
	//Print datas of each article
	for (var i = 0; i < articles.length ;i++) {
		correctSection.append("<p>" + articles[i].title + "</p>");
		correctSection.append("<p>" + articles[i].body + "</p>");
		correctSection.append("<p>" + (articles[i].created).substring(0,16) + "</p>");
		correctSection.append("<img src='" + articles[i].path + "'>");
		correctSection.append("<hr>");
	}
}