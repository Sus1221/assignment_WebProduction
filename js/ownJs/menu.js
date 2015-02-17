//for select in create-new-article-form
// function createMenuSelect(){
// 	var parentOptions = [];

// 	$("header nav ul li:not(.disabled, .liNotInSelect) a").each(function() {
// 		parentOptions.push($(this).text());
// 	});

// 	var select = $("<select></select>");

// 	for(var i = 0; i < parentOptions.length; i++) {
// 		select.append("<option>"+parentOptions[i]+"</option>");
// 	}

// 	//Replace content in select with options
// 	$("#divForSelectParentForMenuItem").html(select);

// }

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
			buildMenu(data);
			createSelectForArticleMenu();
		},
		error: function(data) {
			console.log("error of getMenuItemsFromDb function", data, data.responseText);
		}
	});
}

function buildMenu(menusFromDb) {
	console.log("menusFromDb", menusFromDb);
	var nav = $("header nav");
	var mainMenuHtml = $('<ul class="nav nav-pills" id="bottomUlInNav"/>');
	//add menu item "home"
	mainMenuHtml.append('<li role="presentation" class="active liNotInSelect liInNavConstant"><a href="home">Hem</a></li>');
	console.log("mainMenuHtml", mainMenuHtml);
	//sort menuItems by weight, low to high
	menusFromDb.sort(function(x,y){
		return x.weight > y.weight;
	});
	console.log("menus after sorting: ", menusFromDb);
	//while there are menuItems left in menusFromDb
	while (menusFromDb.length > 0) {
		var currentLink = menusFromDb[0];
		//value of parentMlid is either the parent's id or null if no parent exists
		var parentMlid = currentLink.plid ? "ml_"+currentLink.plid : null;
		//if item has parent and parent doesn't exist yet
		if (parentMlid && mainMenuHtml.find('li[data-mlid="'+parentMlid+'"]').length === 0) {
			//remove item[0] and put it at the end of the array
			menusFromDb.push(menusFromDb.shift());
			continue;
		//if menuitem's parent exists or menuitem doesn't have a parent
		}else {
			var menuLink = $('<li data-mlid="ml_'+currentLink.ml_id+'"><a href="'+currentLink.path+'">'+currentLink.title+'</a></li>');
			//if item doesn't have parent
			if(!parentMlid) {
				//add menu link at level 0
				mainMenuHtml.append(menuLink);
			//if item has parent - find it and add a class
			} else {
				mainMenuHtml.find('li[data-mlid="'+parentMlid+'"]').addClass("dropdown");
			//If the parent doesn't have an ul-child
			if (mainMenuHtml.find('li[data-mlid="'+parentMlid+'"] > ul').length === 0) {
				// make a ul
				var newSubMenu = $('<ul class="dropdown-menu"/>');
				//give the parent the ul as a child
				mainMenuHtml.find('li[data-mlid="'+parentMlid+'"]').append(newSubMenu);
				mainMenuHtml.find('li[data-mlid="'+parentMlid+'"] > ul').append(menuLink);
			}else{
				mainMenuHtml.find('li[data-mlid="'+parentMlid+'"] > ul').append(menuLink);
			}
		}
		//remove item[0] in array
		menusFromDb.shift();
		}
		console.log("menusFromDb", menusFromDb);
	}
	//Always append to ul these ones: "Home", "All articles, "Adminfunctions"
	mainMenuHtml.append(
              '<li role="presentation" class="liNotInSelect liInNavConstant"><a href="all">Alla artiklar</a></li>'+
              '<li id="showAdminPage" class="liNotInSelect liInNavConstant">'+
                '<a class="btn btn-default" href="admin">Adminfunktioner <span class="glyphicon glyphicon-cog"></span></a>'+
              '</li>');
	//In header nav - replace all content with new menu-ul
	nav.html(mainMenuHtml);
}



