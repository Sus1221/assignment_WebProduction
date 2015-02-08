<?php

include_once("autoloader.php");

$article_query = New Queries("127.0.0.1", "webbproduktion", "root", "mysql");

if(isset($_REQUEST["articleInfo"])) {

	echo(json_encode($article_query->insertArticle($_REQUEST["articleInfo"])));
}

if(isset($_REQUEST["allArticles"])) {

	echo (json_encode($article_query->getAllArticles()));
}