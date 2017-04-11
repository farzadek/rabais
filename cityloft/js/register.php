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

$username=$_POST['username'];
$password=$_POST['password'];
$email=$_POST['email'];

$query = mysql_query("insert into home_user(username,    password,    email,  active) 
								   values('$username', '$password', '$email', true)");
?>