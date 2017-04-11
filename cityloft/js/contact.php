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


$name = $_POST['cname'];
$email = $_POST['cemail'];
$phone = $_POST['cphone'];
$message = wordwrap($_POST['cmessage'],70);
$message = str_replace("\n.", "\n..", $message);

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'FROM: <'.$email.'> '."\r\n";

mail('farzadezk@yahoo.co.uk','Contact from ExpenseManager', $message, $headers);
?>