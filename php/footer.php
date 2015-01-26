<?php

include_once("autoloader.php");

$footerQuery = New Queries("127.0.0.1","webbproduktion","root","mysql");

//If a request about footer-data comes
if(isset($_REQUEST["footerDataInput"])) {

	echo(json_encode($footerQuery->insertFooterInfo($_REQUEST["footerData"])));

}

if(isset($_REQUEST["getFooterData"])) {

	echo(json_encode($footerQuery->getFooterInfo()));

}
