<?php

include_once("autoloader.php");

$menu_query = New Queries("127.0.0.1", "webbproduktion2", "root", "mysql");

if(isset($_REQUEST["allMenuItems"])) {
	echo(json_encode($menu_query->getAllMenuItems()));
}