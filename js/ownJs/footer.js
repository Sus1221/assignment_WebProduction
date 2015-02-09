	function getFooterData() {

		$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"getFooterData" : 1
				},
				success: function(data) {
					console.log("Success for getFooterData", data);
					appendToFooter(data);

				},
				error: function(data) {
					console.log("Error for getFooterData", data, data.responseText);
				}
			});
	}

	function appendToFooter(data) {
		var datasLeft = $("<div/>");
		var datasRight = $("<div/>");
		datasLeft.append(
			"<p>" + data[0].name + "</p>" +
			"<p>" + data[0].street + "</p>" +
			"<p>" + data[0].postalcode + " " + data[0].city + "</p>"
				
			);
		datasRight.append(
			"<p>" + data[0].phone + "</p>"+
			"<p>" + data[0].email + "</p>"
			);

		$("#footerAppendBoxLeft").html(datasLeft);
		$("#footerAppendBoxRight").html(datasRight);
	}

	//When submitting new footer-data
	$('#footerForm').submit(function() {

		//create object for footerinfo
		var footerInfo = {};

		//grab footerinfo from form inputs
		footerInfo.name = $("#footerName").val();
		footerInfo.street = $("#footerStreet").val();
		footerInfo.zip = $("#footerZip").val();
		footerInfo.city = $("#footerCity").val();
		footerInfo.phone = $("#footerPhone").val();
		footerInfo.email = $("#footerEmail").val();
		console.log("Submit function for footer form" ,footerInfo);

		//empty the form at submit
		this.reset();
		//run functions to send footerInfo to db and update footer
		footerInfoToDb(footerInfo);
		getFooterData();
		return false;

	});

	//sends footerData grabbed in form to DB
	function footerInfoToDb(footerInfo) {

		console.log("1",footerInfo);
			$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"footerDataInput" : footerInfo
				},
				success: function(data) {
					console.log("Success for footerInfoToDb", data);
					getFooterData();

				},
				error: function(data) {
					console.log("Error for footerInfoToDb", data, data.responseText);
				}
			});
	}