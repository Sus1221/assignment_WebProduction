$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();

	//Handles class-"active" and visibility of sections according to navchoice
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

		footerInfoToAndFromDb(footerInfo);
		return false;
	});

	function footerInfoToAndFromDb(footerInfo) {

		//If the in parameter footerInfo is an empty object
		if ($.isEmptyObject(footerInfo)) {
          
			$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"footerRequest" : 1
				},
				success: function (data) {
					console.log("Success of footerInfoToAndFromDb without footerInfo");
				},
				error: function(data) {
					console.log("Error in footerInfoToAndFromDb without footerInfo");
				}
			});

		//Else send the footer info from the form
		}else {
			$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"footerData" : footerInfo
				},
				success: function(data) {
					console.log("Success for footerInfoToAndFromDb with footerInfo");
				},
				error: function(data) {
					console.log("Error for footerInfoToAndFromDb with footerInfo");
				}
			});
		}
	}

});
