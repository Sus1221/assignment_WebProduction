//when you click an a
$(document).on("click", "a", function() {
	//store the href of the a in state
	history.pushState(null,null,$(this).attr("href"));
	//show section with similar class
	displaySection($(this).attr("href"));
	event.preventDefault();
});
	
//grabs last stringbit of current location.href and shows matching div
function onPopAndStart() {
	var loc = location.href;
	pageName = loc.substring(loc.lastIndexOf("/")+1);
	//If no string found
	if (pageName.length === 0) {
		//show home-div
		pageName = "home";
	}
	//show right section
	displaySection(pageName);
}

//show right section
function displaySection(endHref) {
	//adding/removing active class
	$("#headerNavDiv li a").parent("li").removeClass("active");
	$('#headerNavDiv li a[href='+ endHref +']').parent("li").addClass("active");
	//hide all sections, then show the right one
	$("section").hide();
	$("section."+endHref).fadeIn();
	//if all articles is required
	if(endHref == "all"){
		//run function to get all articles
		getAllArticles();
	//if one specific category of articles is required
	}else if(endHref != "home" && endHref != "admin"){
		//run function to get all articles belonging to that category
		getArticlesInOneCategory(endHref);
	}
}