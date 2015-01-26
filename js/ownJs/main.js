$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();
	// getFooterData();

	function getFooterData() {

		$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"footerData" : footerInfo
				},
				success: function(data) {
					console.log("Success for footerInfoToAndFromDb", data, data.responseText);

				},
				error: function(data) {
					console.log("Error for footerInfoToAndFromDb", data, data.responseText);
				}
			});

	}

	//Handles class-"active" and visibility of sections according to navchoice-click
	$("body").on("click", "#headerNavDiv a", function() {
		$("#headerNavDiv li").removeClass("active");
		$(this).parent().addClass("active");
		$("section").hide();
		console.log($(this).attr("id"));
		var rightString = $(this).attr("id");
		$("section."+rightString).show();
	});

	$('#footerForm').submit(function() {

		var footerInfo = {};

		footerInfo.name = $("#footerName").val();
		footerInfo.street = $("#footerStreet").val();
		footerInfo.zip = $("#footerZip").val();
		footerInfo.city = $("#footerCity").val();
		footerInfo.phone = $("#footerPhone").val();
		footerInfo.email = $("#footerEmail").val();
		console.log(footerInfo);

		//empty the form at submit
		this.reset();
		//run function footerInfoToAndFromDb
		footerInfoToAndFromDb(footerInfo);
		return false;
	});

	function footerInfoToAndFromDb(footerInfo) {

			$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"footerData" : footerInfo
				},
				success: function(data) {
					console.log("Success for footerInfoToAndFromDb", data, data.responseText);

				},
				error: function(data) {
					console.log("Error for footerInfoToAndFromDb", data, data.responseText);
				}
			});
	}

});
