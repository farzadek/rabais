<?php
/*
$hostname_user_con = "mysql2.000webhost.com";
$database_user_con = "a4626195_fardb";
$username_user_con = "a4626195_farzad";
$password_user_con = "FF4802ee";
*/


/*
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


//$user_con = mysqli_connect($hostname, $username, $password, $database);
if (!$user_con) {
    die("Connection failed: " . mysqli_connect_error());
}




/*

$sql = "select * from home_data";
$result = mysql_query($sql, $connection) or die(mysql_error());

$outp = "";
while($row = mysql_fetch_assoc($result)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'. $row["id"] . '",';
    $outp .= '"price":"'. $row["price"] . '",';
    $outp .= '"mgroup":"'. $row["mgroup"] . '",';
    $outp .= '"dates":"'. $row["dates"] . '",';
    $outp .= '"tax":"'. $row["tax"] . '",';
    $outp .= '"expense":"'. $row["expense"] . '",';
    $outp .= '"price1":"'. $row["price1"] . '",';
    $outp .= '"title":"'. $row["title"] . '"}'; 
}



$outp ='{"records":['.$outp.']}';
echo($outp);
//print_r($outp);
*/
?>