$(function() {

	onPopAndStart();

	$(document).on("click", "a", function() {

		//framåt
		history.pushState(null,null,$(this).attr("href"));
		displaySection($(this).attr("href"));
		event.preventDefault();
	});
		
	//listens for popstate-events
	addEventListener("popstate",onPopAndStart);

	//grabs last string of current locationhref and shows matching div
	function onPopAndStart() {
		var loc = location.href;
		pageName = loc.substring(loc.lastIndexOf("/")+1);
		//If no
		if (pageName.length === 0) {
			pageName = "home";
		}
		console.log(pageName);
		//Hide all sections, then show the right one
		displaySection(pageName);
	}

	function displaySection(endHref) {
		//adding/removing active class
		console.log("displaySection", endHref);
		$("#headerNavDiv li a").parent("li").removeClass("active");
		$('#headerNavDiv li a[href='+ endHref +']').parent("li").addClass("active");
			
		$("section").hide();
		$("section."+endHref).show();
		if(endHref == "all"){
			getAllArticles();
		}
	}
});
