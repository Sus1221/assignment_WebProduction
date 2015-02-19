<?php

include_once("autoloader.php");

$footerQuery = New Queries("127.0.0.1","webbproduktion2","root","mysql");

//Insert footer data
if(isset($_REQUEST["footerDataInput"])) {
	echo(json_encode($footerQuery->insertFooterInfo($_REQUEST["footerDataInput"])));
}

//get footerdata
if(isset($_REQUEST["getFooterData"])) {
	echo(json_encode($footerQuery->getFooterInfo()));
}
