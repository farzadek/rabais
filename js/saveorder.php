<?php

$hostname_user_con = "localhost";
$database_user_con = "eip";
$username_user_con = "farzad";
$password_user_con = "";

/*
$hostname_user_con = "localhost";
$database_user_con = "eipmondi_eipdb";
$username_user_con = "eipmondi_farzad";
$password_user_con = "SyheLi89";
*/
$user_con = @mysql_pconnect($hostname_user_con, $username_user_con, $password_user_con) or trigger_error(mysql_error(),E_USER_ERROR); 

if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
	if (PHP_VERSION < 6) {
		$theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
	}

	$theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

	switch ($theType) {
		case "text":
		  $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
		  break;    
		case "long":
		case "int":
		  $theValue = ($theValue != "") ? intval($theValue) : "NULL";
		  break;
		case "double":
		  $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
		  break;
		case "date":
		  $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
		  break;
		case "defined":
		  $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
		  break;
	}
	return $theValue;
}
}

mysql_select_db($database_user_con, $user_con);

$name = $_POST['name'];
$ord = $_POST['order'];
$query = mysql_query("INSERT INTO `orders` (`uname`, `order`, `id`, `today`) VALUES ('$name', '$ord', NULL, CURRENT_TIMESTAMP);");

$qry_res = mysql_query($query);

?>
