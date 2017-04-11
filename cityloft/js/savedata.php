<?php
header("Access-Control-Allow-Origin: *");


$hostname_localhost = "mysql2.000webhost.com";
$database_localhost = "a4626195_fardb";
$username_localhost = "a4626195_farzad";
$password_localhost = "ff4802ee";

/*
$hostname_localhost = "localhost";
$database_localhost = "autobazar";
$username_localhost = "farzad";
$password_localhost = "";
*/
$connection = mysql_connect($hostname_localhost, $username_localhost, $password_localhost); 
$db = mysql_select_db($database_localhost, $connection);


$id=$_POST['id'];
$title=$_POST['title'];
$tax=$_POST['tax'];
$expense=$_POST['expense'];
$price1=$_POST['price1'];
$price2=$_POST['price2'];
$dt=$_POST['date'];
$group=$_POST['group'];

if($id==null){
	$query = mysql_query("insert into home_data(id,     title,   price,   price1,  tax,  expense,  mgroup,   dates) 
									values ('$id', '$title', $price1, $price2, $tax, $expense, $group,  '$dt')");}
else{
	$query = mysql_query("UPDATE `home_data` SET title='$title', price=$price1, price1=$price2, tax=$tax, expense=$expense, mgroup=$group, dates='$dt' WHERE id=$id");
}

 //`id`=[value-1],`dates`=[value-2],`title`=[value-3],`price`=[value-4],`tax`=[value-5],`expense`=[value-6],`mgroup`=[value-7],`price1`=[value-8] WHERE 1
?>