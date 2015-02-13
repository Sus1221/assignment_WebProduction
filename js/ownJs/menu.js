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
			buildMenu(data);
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
	console.log("mainMenuHtml", mainMenuHtml);
	//sort menuItems by weight, low to high
	menusFromDb.sort(function(x,y){
		return x.weight > y.weight;
	});
	console.log("menus after sorting: ", menusFromDb);
	while (menusFromDb.length > 0) {
		var currentLink = menusFromDb[0];
		var parentMlid = currentLink.plid ? "ml_"+currentLink.plid : null;

		//if item has parent and parent doesn't exist yet
		if (parentMlid && mainMenuHtml.find('li[data-mlid="'+parentMlid+'"]').length === 0) {
			menusFromDb.push(menusFromDb.shift());
			continue;
		}
			else {
			//parent exists
			var menuLink = $('<li data-mlid="ml_'+currentLink.mlid+'"><a href="'+currentLink.path+'">'+currentLink.title+'</a></li>');
			//if item doesn't have parent
			if(!parentMlid) {
				mainMenuHtml.append(menuLink);
			//if item has parent - find it!
			} else {
				mainMenuHtml.find('li[data-mlid="'+parentMlid+'"]').addClass("dropdown");
				//check if parent does not have an ul
				if (mainMenuHtml.find('li[data-mlid="'+parentMlid+'"] > ul').length === 0) {
					//if not make one (create submenu <ul></ul>)
					var newSubMenu = $('<ul class="dropdown-menu"/>');
					//append it to parent link 
					mainMenuHtml.find('li[data-mlid="'+parentMlid+'"]').append(newSubMenu);
				}
			mainMenuHtml.find('li[data-mlid_"'+parentMlid+'"]').append(menuLink);
		}
		menusFromDb.shift();
		console.log("menusFromDb", menusFromDb);
		}
	}

	mainMenuHtml.append('<li role="presentation" class="active liNotInSelect liInNavConstant"><a href="home">Hem</a></li>'+
              '<li role="presentation" class="liNotInSelect liInNavConstant"><a href="all">Alla artiklar</a></li>'+
              '<li id="showAdminPage" class="liNotInSelect liInNavConstant">'+
                '<a class="btn btn-default" href="admin">Adminfunktioner <span class="glyphicon glyphicon-cog"></span></a>'+
              '</li>');
	nav.html(mainMenuHtml);
}



