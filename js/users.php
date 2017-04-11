<?php
header("Access-Control-Allow-Origin: *");

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


$connection = mysql_connect($hostname_localhost, $username_localhost, $password_localhost); 
$db = mysql_select_db($database_localhost, $connection);

$result = $conn->query("SELECT * FROM home_user");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"username":"'  . $rs["username"] . '",';
    $outp .= '"password":"'   . $rs["password"]        . '",';
    $outp .= '"email":"'   . $rs["email"]        . '",';
    $outp .= '"active":"'. $rs["active"]     . '"}'; 
}
$outp ='{"records":['.$outp.']}';

echo($outp);
?>