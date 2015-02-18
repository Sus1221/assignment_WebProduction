	$(document).on("click", "a", function() {

		//framåt
		history.pushState(null,null,$(this).attr("href"));
		displaySection($(this).attr("href"));
		event.preventDefault();
	});
		
	//grabs last string of current locationhref and shows matching div
	function onPopAndStart() {
		var loc = location.href;
		pageName = loc.substring(loc.lastIndexOf("/")+1);
		//If no
		if (pageName.length === 0) {
			pageName = "home";
		}
		//Hide all sections, then show the right one
		displaySection(pageName);
	}

	function displaySection(endHref) {
		//adding/removing active class
		$("#headerNavDiv li a").parent("li").removeClass("active");
		$('#headerNavDiv li a[href='+ endHref +']').parent("li").addClass("active");
			
		$("section").hide();
		$("section."+endHref).show();
		//if all articles is required
		if(endHref == "all"){
			getAllArticles();
		//if one specific category of articles is required
		}else if(endHref != "home" && endHref != "admin"){
			getArticlesInOneCategory(endHref);
		}
	}