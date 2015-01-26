<?php

class Queries extends PDOHelper {


	protected $user = array("user_id" => 1);


	public function insertFooterInfo($footerData) {

		//Our sql question
		$sql = "INSERT INTO footer(name, street, postalcode, city, phone, email) VALUES (:name, :street, :zip, :city, :phone, :email)";
		
		//Run function "query", send in query above and $footerData
			$this->query($sql, $footerData);

	}

	public function getFooterInfo() {

		//Our sql-question
		$sql = "SELECT * FROM footer ORDER BY created DESC limit 1";
		return($this->query($sql));
	}
}



  
   