<?php


$hostname_localhost = "mysql2.000webhost.com";
$database_localhost = "a4626195_fardb";
$username_localhost = "a4626195_farzad";
$password_localhost = "FF4802ee";

/*
$hostname_localhost = "localhost";
$database_localhost = "autobazar";
$username_localhost = "farzad";
$password_localhost = "";
*/

$connection = @mysql_connect($hostname_localhost, $username_localhost, $password_localhost) or trigger_error(mysql_error(),E_USER_ERROR); 
$db=mysql_select_db($database_localhost, $connection);



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

?>