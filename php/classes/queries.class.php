<?php

class Queries extends PDOHelper {

	//To insert new footer info
	public function insertFooterInfo($footerData) {
		//Our sql question
		$sql = "INSERT INTO footer(name, street, postalcode, city, phone, email) VALUES (:name, :street, :zip, :city, :phone, :email)";		
		//return answer from function "query", send in query above and $footerData
		return $this->query($sql, $footerData);
	}

	//To grab footerinfo
	public function getFooterInfo() {
		//Our sql-question
		$sql = "SELECT * FROM footer ORDER BY created DESC limit 1;";
		//return answer from query-function
		return $this->query($sql);
	}

	//To insert new article
	public function insertArticle($articleInfo) {

		//Insert picinfo to db
		$sql1 = "INSERT INTO images(path) VALUES (:path);";
		//array with path info
		$parameters1 = array(":path" => $articleInfo["picWay"]);
		//run query-function
		$this->query($sql1, $parameters1);

		//select latest image
		$sql2 = "SELECT * FROM images ORDER BY uploaded DESC limit 1;";
		//store answer from query in $rightImage
		$rightImage = $this->query($sql2);

		//find right category in categories table
		$sql3 = "SELECT * FROM CATEGORIES WHERE NAME = :name";
		//create array with categoryname
		$parameters3 = array(":name" => $articleInfo["selectedCat"]);
		//store answer to query in variable
		$rightCategory = $this->query($sql3, $parameters3);

		//insert page to db
		$sql4 = "INSERT INTO pages(title, body, img_id, catId) VALUES (:heading, :body, :img_id, :cat_id);";
		//create array with all article info needed
		$parameters4 = array(":heading" => $articleInfo["heading"],
							 ":body" => $articleInfo["body"],
							 ":img_id" => $rightImage[0]["iid"],
							 ":cat_id" => $rightCategory[0]["id"]
							 );
		//Return result of inserted new page
		return $this->query($sql4, $parameters4);
	}

	//get all articles
	public function getAllArticles() {
		$sql = "SELECT title, body, created, path, pid FROM pages, images WHERE pages.img_id = images.iid ORDER BY created DESC;";
		//return result of query
		return $this->query($sql);
	}

	//delete an article
	public function deleteAnArticle($object) {
		$sql = "DELETE FROM pages WHERE pid = :pid;";
		//create an array with id of article to delete
		$parameters = array(":pid" => $object["pid"]);
		//return result of query
		return $this->query($sql, $parameters);
	}

	//get one article
	public function oneArticle($object) {
		$sql = "SELECT * FROM pages WHERE pid = :pid;";
		//create array with pid of the article
		$parameters = array(":pid" => $object["pid"]);
		//return result of query
		return $this->query($sql, $parameters);
	}

	//update one article
	public function updateOneArticle($article) {
		$sql = "UPDATE pages SET title = :title, body = :body WHERE pid = :pid;";
		//create array with updated data belonging to article
		$parameters = array(":title" => $article["title"], ":body" => $article["body"], ":pid" => $article["pid"]);
		//return answer of query
		return $this->query($sql, $parameters);
	}

	//search for articles by title
	public function search($searchWord) {
		$sql = "SELECT * FROM pages WHERE title LIKE :word ORDER BY created DESC;";
		//create array with searchword
		$parameters = array(":word" => '%'.$searchWord.'%');
		//return answer of query
		return $this->query($sql, $parameters);
	}

	//get all menu items
	public function getAllMenuItems() {
		$sql = "SELECT * FROM menu_links ORDER BY weight ASC;";
		//return result of query
		return $this->query($sql);
	}

	//get all articles belonging to one category
	public function getAllAtriclesUnderOneCat($nameOfCat) {
		$sql1 = "SELECT * FROM categories WHERE name = :name";
		//create array with category name
		$parameters1 = array(":name" => $nameOfCat);
		//Get the right category name - item
		$rightCatObject = $this->query($sql1, $parameters1);
		$sql2 = "SELECT title, body, created, path FROM pages, images WHERE pages.catId = :cat_id && pages.img_id = images.iid ORDER BY created DESC;";
		$parameters2 = array(":cat_id" => $rightCatObject[0]["id"]);
		//return all articles belonging to chosen category
		return $this->query($sql2, $parameters2);
	}
}


  