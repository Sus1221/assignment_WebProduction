	function getFooterData() {

		$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"getFooterData" : 1
				},
				success: function(data) {
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
			"<p><a href='tel:" + data[0].phone + "'>" + data[0].phone + "</a></p>"+
			"<p><a href='mailto:" + data[0].email + "'>" + data[0].email +"</a></p>"
			);

		$("#footerAppendBoxLeft").html(datasLeft);
		$("#footerAppendBoxRight").html(datasRight);
	}

	//sends footerData grabbed in form to DB
	function footerInfoToDb(footerInfo) {
			$.ajax({
				url: "php/footer.php",
				dataType: "json",
				data: {
					"footerDataInput" : footerInfo
				},
				success: function(data) {
					getFooterData();
				},
				error: function(data) {
					console.log("Error for footerInfoToDb", data, data.responseText);
				}
			});
	}