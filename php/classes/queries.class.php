<?php

class Queries extends PDOHelper {

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

	//To insert new article
	public function insertArticle($articleInfo) {

		//Insert picinfo to db
		$sql1 = "INSERT INTO images(path) VALUES (:path);";
		$parameters1 = array(":path" => $articleInfo["picWay"]);
		$this->query($sql1, $parameters1);

		//select latest image
		$sql2 = "SELECT * FROM images ORDER BY uploaded DESC limit 1;";
		$rightImage = $this->query($sql2);

		//find right category in categories table
		$sql3 = "SELECT * FROM CATEGORIES WHERE NAME = :name";
		$parameters3 = array(":name" => $articleInfo["selectedCat"]);
		$rightCategory = $this->query($sql3, $parameters3);

		//insert page to db
		$sql4 = "INSERT INTO pages(title, body, img_id, catId) VALUES (:heading, :body, :img_id, :cat_id);";
		$parameters4 = array(":heading" => $articleInfo["heading"],
							 ":body" => $articleInfo["body"],
							 ":img_id" => $rightImage[0]["iid"],
							 ":cat_id" => $rightCategory[0]["id"]
							 );
		//Finally, insert new page
		return $this->query($sql4, $parameters4);
	}

	public function getAllArticles() {
		$sql = "SELECT title, body, created, path, pid FROM pages, images WHERE pages.img_id = images.iid ORDER BY created DESC;";
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
		$sql = "SELECT * FROM pages WHERE title LIKE :word ORDER BY created DESC;";
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

	public function getAllAtriclesUnderOneCat($nameOfCat) {
		//Get the right category item
		$sql1 = "SELECT * FROM categories WHERE name = :name";
		$parameters1 = array(":name" => $nameOfCat);
		$rightCatObject = $this->query($sql1, $parameters1);
		//get all articles belonging to chosen category
		$sql2 = "SELECT title, body, created, path FROM pages, images WHERE pages.catId = :cat_id && pages.img_id = images.iid ORDER BY created DESC;";
		$parameters2 = array(":cat_id" => $rightCatObject[0]["id"]);
		return $this->query($sql2, $parameters2);
	}
}


  