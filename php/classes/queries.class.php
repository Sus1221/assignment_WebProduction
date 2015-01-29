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
		$sql = "SELECT * FROM footer ORDER BY created DESC limit 1";
		return $this->query($sql);
	}

	//To insert new article
	public function insertArticle($articleInfo) {
		$articleInfo[":user_id"] = $this->user["user_id"];
		//create sql-question
		$sql = "INSERT INTO pages(title, body, user_id) VALUES (:heading, :body, :user_id)";
		//run function"query", send in query above and $articleInfo
		return $this->query($sql, $articleInfo);

	}
}



  
   