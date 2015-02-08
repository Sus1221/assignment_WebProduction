$(function() {

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

});