$(function() {

	onPopAndStart();

	$(document).on("click", "a", function() {

		//framåt
		history.pushState(null,null,$(this).attr("href"));
		event.preventDefault();
	});
		
	//bakåt
	addEventListener("popstate",onPopAndStart);

	function onPopAndStart() {
		var loc = location.href;
		pageName = loc.substring(loc.lastIndexOf("/")+1);

	}

});