//for select in create-new-article-form
function createMenuSelect(){
	var parentOptions = [];

	$("header nav ul li:not(.disabled, .liNotInSelect) a").each(function() {
		parentOptions.push($(this).text());
	});

	var select = $("<select></select>");
	select.append("<option>Toppnivå</option>");

	for(var i = 0; i < parentOptions.length; i++) {
		select.append("<option>"+parentOptions[i]+"</option>");
	}

	//Replace content in select with options
	$("#divForSelectParentForMenuItem").html(select);

}

//When user created new menu-item
function sendNewMenuInfo(menuObject) {
	console.log("sendNewMenuInfo object: ", menuObject);
	$.ajax({
		url: "php/menu.php",
		dataType: "json",
		data: {
			"menuToAdd": menuObject
		},
		success: function(data) {
			console.log("success of sendNewMenuInfo function", data);
		},
		error: function(data) {
			console.log("error of sendNewMenuInfo function", data, data.responseText);
		}
	});
}

function getMenuItemsFromDb() {
	$.ajax({
		url: "php/menu.php",
		dataType: "json",
		data: {
			allMenuItems: 1
		},
		success: function(data) {
			console.log("Success of getMenuItemsFromDb function", data);
		},
		error: function(data) {
			console.log("error of getMenuItemsFromDb function", data, data.responseText);
		}
	});
}