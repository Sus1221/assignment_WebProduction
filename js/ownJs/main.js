$(function() {

	//To begin with, hide all sections but the home one
	$("section").hide();
	$("section.home").show();
	
	//Handles class-"active" and visibility of sections according to navchoice-click
	$("body").on("click", "#headerNavDiv a", function() {
		$("#headerNavDiv li").removeClass("active");
		$(this).parent().addClass("active");
		$("section").hide();
		console.log($(this).attr("id"));
		var rightString = $(this).attr("id");
		$("section."+rightString).show();
	});

	getFooterData();

	function getFooterData() {

		$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"getFooterData" : 1
				},
				success: function(data) {
					console.log("Success for footerInfoToAndFromDb", data);
					appendToFooter(data);

				},
				error: function(data) {
					console.log("Error for footerInfoToAndFromDb", data, data.responseText);
				}
			});
	}

	function appendToFooter(data) {
		var datas = $("<div/>");
		datas.append(
				"<p>" + data[0].name + "</p>" +
				"<p>" + data[0].street + "</p>" +
				"<p>" + data[0].postalcode + " " + data[0].city + "</p>" +
				"<p>" + data[0].phone + "</p>"+
				"<p>" + data[0].email + "</p>"
			);

		$("#footerAppendBox").html(datas);
	}

	

	//When submitting new footer-data
	$('#footerForm').submit(function() {

		var footerInfo = {};

		footerInfo.name = $("#footerName").val();
		footerInfo.street = $("#footerStreet").val();
		footerInfo.zip = $("#footerZip").val();
		footerInfo.city = $("#footerCity").val();
		footerInfo.phone = $("#footerPhone").val();
		footerInfo.email = $("#footerEmail").val();
		console.log("Submit function for footer form" ,footerInfo);

		//empty the form at submit
		this.reset();
		//run function footerInfoToAndFromDb
		footerInfoToAndFromDb(footerInfo);
		getFooterData();
		return false;

	});

	function footerInfoToAndFromDb(footerInfo) {

		console.log("1",footerInfo);
			$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"footerDataInput" : footerInfo
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
