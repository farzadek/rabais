<?php
/*
$hostname_localhost = "mysql2.000webhost.com";
$database_localhost = "a4626195_fardb";
$username_localhost = "a4626195_farzad";
$password_localhost = "ff4802ee";
*/
/*
$hostname_localhost = "localhost";
$database_localhost = "autobazar";
$username_localhost = "farzad";
$password_localhost = "";
*/

$hostname_user_con = "localhost";
$database_user_con = "eipmondi_eipdb";
$username_user_con = "eipmondi_farzad";
$password_user_con = "SyheLi89";

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


if (!$user_con) {
    die("Connection failed: " . mysqli_connect_error());
}

$data=array();

$result = mysql_query("SELECT * FROM users INNER JOIN rabaismember ON users.vpcode=rabaismember.membercode");

while( $row = mysql_fetch_assoc( $result ) ){
	array_push($data, $row);
}

echo( json_encode($data) );

mysql_close($user_con);

			
?>