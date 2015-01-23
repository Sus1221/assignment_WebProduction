<?php

include_once("autoloader.php");

$footerQuery = New Queries("127.0.0.1","webbproduktion","root","mysql");

//If a request about footer-data comes
if(isset($_REQUEST["footerData"])) {

	//if data that are going to be inserted to DB and footer comes in footerData
	if(isset($_REQUEST["footerData"]["name"])) {

		echo(json_encode($footerQuery->insertFooterInfo($_REQUEST["footerData"])));

	//if the request just want to recieve data
	}else{

		echo(json_encode($footerQuery->getFooterInfo()));
	}

}