<?php

include_once("autoloader.php");

$article_query = New Queries("127.0.0.1", "webbproduktion2", "root", "mysql");

if(isset($_REQUEST["articleInfo"])) {
	echo(json_encode($article_query->insertArticle($_REQUEST["articleInfo"])));
}

if(isset($_REQUEST["allArticles"])) {
	echo (json_encode($article_query->getAllArticles()));
}

if(isset($_REQUEST["deleteThis"])) {
	echo (json_encode($article_query->deleteAnArticle($_REQUEST["deleteThis"])));
}

if(isset($_REQUEST["articleToEdit"])) {
	echo(json_encode($article_query->oneArticle($_REQUEST["articleToEdit"])));
}

if(isset($_REQUEST["updatedArticle"])) {
	echo(json_encode($article_query->updateOneArticle($_REQUEST["updatedArticle"])));
}