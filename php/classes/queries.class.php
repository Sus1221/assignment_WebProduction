<?php

class Queries extends PDOHelper {


	protected $user = array("user_id" => 1);


	public function insertFooterInfo($footerData) {

		//Our sql question
		$sql = "INSERT INTO footer(name, street, postalcode, city, phone, email) VALUES (:name, :street, :zip, :city, :phone, :email)";
		
		//Run function "query", send in query above and $footerData
		$this->query($sql, $footerData);

	}
}