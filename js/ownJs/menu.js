//get all menu items from db
function getMenuItemsFromDb() {
	$.ajax({
		url: "php/menu.php",
		dataType: "json",
		data: {
			allMenuItems: 1
		},
		success: function(data) {
			buildMenu(data);
		},
		error: function(data) {
			console.log("error of getMenuItemsFromDb function", data, data.responseText);
		}
	});
}

//build html-structure out of data-items
function buildMenu(menusFromDb) {
	var navDiv = $("#bs-example-navbar-collapse-1");
	//create ul
	var mainMenuHtml = $('<ul class="nav nav-pills" id="bottomUlInNav"/>');
	//add menu item "home" to ul
	mainMenuHtml.append('<li role="presentation" class="active liNotInSelect liInNavConstant"><a href="home">Hem</a></li>');
	//sort menuItems by weight, low to high
	menusFromDb.sort(function(x,y){
		return x.weight > y.weight;
	});
	//while there are menuItems left in menusFromDb
	while (menusFromDb.length > 0) {
		//first item in array
		var currentLink = menusFromDb[0];
		//value of parentMlid is either the parent's id or null if no parent exists
		var parentMlid = currentLink.plid ? "ml_"+currentLink.plid : null;
		//if item has parent and parent doesn't exist yet in ul
		if (parentMlid && mainMenuHtml.find('li[data-mlid="'+parentMlid+'"]').length === 0) {
			//remove item[0] and put it at the end of the array
			menusFromDb.push(menusFromDb.shift());
			continue;
		//if menuitem's parent exists or menuitem doesn't have a parent
		}else {
			//create li with a inside
			var menuLink = $('<li data-mlid="ml_'+currentLink.ml_id+'"><a href="'+currentLink.path+'">'+currentLink.title+'</a></li>');
			//if item doesn't have parent
			if(!parentMlid) {
				//add menu link to ul at level 0
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
				//and put current item into its parent
				mainMenuHtml.find('li[data-mlid="'+parentMlid+'"] > ul').append(menuLink);
			//if parent already has ul-child, append current menuitem to it
			}else{
				mainMenuHtml.find('li[data-mlid="'+parentMlid+'"] > ul').append(menuLink);
			}
		}
		//remove item[0] in array
		menusFromDb.shift();
		}
	}
	//append these menu items to ul : "Home", "All articles, "Adminfunctions"
	mainMenuHtml.append(
              '<li role="presentation" class="liNotInSelect liInNavConstant"><a href="all">Alla artiklar</a></li>'+
              '<li id="showAdminPage" class="liNotInSelect liInNavConstant">'+
                '<a class="btn btn-default" href="admin">Adminfunktioner <span class="glyphicon glyphicon-cog"></span></a>'+
              '</li>');
	//In header nav - replace all content with newmy built menu-ul
	navDiv.html(mainMenuHtml);
	//Now that menu is in place - run function that creates select to put in create-new-article-form
	createSelectForArticleMenu();
}



