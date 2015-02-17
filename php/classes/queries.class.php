<?php

class Queries extends PDOHelper {


	protected $user = array("user_id" => 1);

	//To insert new footer info
	public function insertFooterInfo($footerData) {
		//Our sql question
		$sql = "INSERT INTO footer(name, street, postalcode, city, phone, email) VALUES (:name, :street, :zip, :city, :phone, :email)";		
		//Run function "query", send in query above and $footerData
		return $this->query($sql, $footerData);
	}

	//To grab footerinfo
	public function getFooterInfo() {
		//Our sql-question
		$sql = "SELECT * FROM footer ORDER BY created DESC limit 1;";
		return $this->query($sql);
	}


		//$sql = "UPDATE pages SET title = :title, body = :body WHERE pid = :pid;";
		//$parameters = array(":title" => $article["title"], ":body" => $article["body"], ":pid" => $article["pid"]);
		//return $this->query($sql, $parameters);


	//To insert new article
	public function insertArticle($articleInfo) {
		$articleInfo[":user_id"] = $this->user["user_id"];
		//create sql-question

		//If it doesn't exist, insert picinfo to db
		$sql1 = "INSERT INTO images(path) VALUES (:path);";
		$parameters = array(":path" => $articleInfo["picWay"]);

		//select senaste bilden

		//insert page to db
		$sql2 = "INSERT INTO pages(title, body, user_id, img_id ) VALUES (:heading, :body, :user_id, :);";
		//run function"query", send in query above and $articleInfo
		return $this->query($sql2, $articleInfo);
	}

	public function getAllArticles() {
		$sql = "SELECT * FROM pages ORDER BY created DESC;";
		return $this->query($sql);
	}

	public function deleteAnArticle($object) {
		$sql = "DELETE FROM pages WHERE pid = :pid;";
		$parameters = array(":pid" => $object["pid"]);
		return $this->query($sql, $parameters);
	}

	public function oneArticle($object) {
		$sql = "SELECT * FROM pages WHERE pid = :pid;";
		$parameters = array(":pid" => $object["pid"]);
		return $this->query($sql, $parameters);
	}

	public function updateOneArticle($article) {
		$sql = "UPDATE pages SET title = :title, body = :body WHERE pid = :pid;";
		$parameters = array(":title" => $article["title"], ":body" => $article["body"], ":pid" => $article["pid"]);
		return $this->query($sql, $parameters);
	}

	public function search($searchWord) {
		$sql = "SELECT * FROM pages WHERE title LIKE :word;";
		$parameters = array(":word" => '%'.$searchWord.'%');
		return $this->query($sql, $parameters);
	}

	public function insertMenu($menuItem) {
		$menuItem[":plid"] = $menuItem[":plid"] ? $menuItem[":plid"] : null;
		$sql = "INSERT INTO menu_links(title, path, weight, plid) VALUES (:title, :path, :weight, :plid);";
		return $this->query($sql, $menuItem);
	}

	public function getAllMenuItems() {
		$sql = "SELECT * FROM menu_links ORDER BY weight ASC;";
		return $this->query($sql);
	}
}


  