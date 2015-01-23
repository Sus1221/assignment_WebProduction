<?php

class Queries extends PDOHelper {


	protected $user = array("user_id" => 1);


	public function insertFooterInfo($footerData) {

		//Our sql question
		$sql = "INSERT INTO footer(name, street, postalcode, city, phone, info) VALUES (:name, :street, :zip, :city, :phone, :email)";
		
		//
		return $this->query($sql, $footerData);

	}
}