<?php
/*
$hostname_localhost = "mysql2.000webhost.com";
$database_localhost = "a4626195_fardb";
$username_localhost = "a4626195_farzad";
$password_localhost = "ff4802ee";


$hostname_user_con = "localhost";
$database_user_con = "eip";
$username_user_con = "farzad";
$password_user_con = "";
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

$data=array();
if (!$user_con) {
    die("Connection failed: " . mysqli_connect_error());
}

	
//    $sql = "SELECT * FROM users JOIN member ON users.vpcode=member.vpcode";
    $sql = "SELECT * FROM users";
    if($result = mysql_query($sql, $user_con)){
    	$total = mysql_num_rows($result);
    	$now = 0;
        while($now < $total ){
            array_push($data, mysql_fetch_array($result)); 
            $now++;
        }
        mysql_free_result($result);
    } 
    else{
        echo "ERROR: Could not able to execute $sql. " . mysql_error($user_con);
    }


echo( json_encode($data) );

mysql_close($user_con);

			
?>