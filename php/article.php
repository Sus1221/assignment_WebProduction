<?php

include_once("autoloader.php");

$article_query = New Queries("127.0.0.1", "webbproduktion2", "root", "mysql");

//insert article
if(isset($_REQUEST["articleInfo"])) {
	echo(json_encode($article_query->insertArticle($_REQUEST["articleInfo"])));
}

//get all articles
if(isset($_REQUEST["allArticles"])) {
	echo (json_encode($article_query->getAllArticles()));
}

//delete an article
if(isset($_REQUEST["deleteThis"])) {
	echo (json_encode($article_query->deleteAnArticle($_REQUEST["deleteThis"])));
}

//get on article
if(isset($_REQUEST["articleToEdit"])) {
	echo(json_encode($article_query->oneArticle($_REQUEST["articleToEdit"])));
}

//insert updated article
if(isset($_REQUEST["updatedArticle"])) {
	echo(json_encode($article_query->updateOneArticle($_REQUEST["updatedArticle"])));
}

//search for articles with title containing search word
if(isset($_REQUEST["search"])) {
	echo(json_encode($article_query->search($_REQUEST["search"])));
}

//get one category
if(isset($_REQUEST["articleCatToSearchFor"])) {
	echo(json_encode($article_query->getAllAtriclesUnderOneCat($_REQUEST["articleCatToSearchFor"])));
}