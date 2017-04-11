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



$name = filter_var(strip_tags( trim($_POST['name'])), FILTER_SANITIZE_STRING).' '.filter_var($_POST['famil'], FILTER_SANITIZE_STRING);
$password = filter_var(strip_tags( trim($_POST['password'])), FILTER_SANITIZE_EMAIL);
$username = filter_var(strip_tags( trim($_POST['username'])), FILTER_SANITIZE_EMAIL);
$email = filter_var(strip_tags( trim($_POST['email'])), FILTER_SANITIZE_EMAIL);
$phone = filter_var(strip_tags( trim($_POST['tel'])), FILTER_SANITIZE_EMAIL);
$type = $_POST['type'];


$rc = mysql_query("SELECT count(id) as totaltype FROM users WHERE type=".$type); 
$count=mysql_fetch_assoc($rc);

$count['totaltype']=$count['totaltype']+1;
if($count['totaltype']<10){$rc0='0';}else{$rc0='';}

$vpcode = 'rb'.date('y').'0'.$type.$rc0.$count['totaltype'];


$query = mysql_query("insert into users(type, active, name, username, password, email, vpcode) 
								 values($type, 1, '$name', '$username', '$password', '$email', '$vpcode')");
$query = mysql_query("insert into rabaismember(membercode) values('$vpcode')");
mysqli_close($user_con);

			$headers = "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html;\r\n";

			//$totalRow='guest1';

			$msg = 'Nous avions un(e) visiteur qui enregistre sur Rabaiseip.com, service "Gratuit".<br/>';
			$msg.='<br/>NOM: '.$name;
			$msg.='<br/>Téléphone: '.$phone;
			$msg.='<br/>EMAIL: '.$email;
			$msg.='<br/><img src="http://eipstudio.com/images/rabais_logo.png" width="180">';
			mail('info@rabaiseip.com','RabaisEIP website - Register',$msg, $headers);

			$messageMail = '<!DOCTYPE html><html lang="fr">';
			$messageMail .= '<body style="margin:0;padding:0;font-family:tahoma;font-size:18px;">';
			$messageMail .= '<table border="0" style="color:#ffffff;border-color:#fff;width:600px;margin:5px;padding:0;">';
  			$messageMail .= '<tr style="background-color:white;width:100%;">';
    		$messageMail .= '<th colspan="6" style="width:300px;"><img src="http://eipstudio.com/email/logo.png" width="100%"></th>';
    		$messageMail .= '<th style="width:100px;border:0;"></th>';
    		$messageMail .= '<th colspan="5" style="width:200px;"><img src="http://eipstudio.com/email/site.png" width="100%"></th>';
  			$messageMail .= '</tr>';
  			$messageMail .= '<tr style="background: #e42e7f;background: -moz-linear-gradient(top,  #e42e7f 0%, #802070';
  			$messageMail .= '100%);background:-webkit-linear-gradient(top,  #e42e7f 0%,#802070 100%);background: linear-gradient(to bottom,';
  			$messageMail .= '#e42e7f 0%,#802070 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#e42e7f",';
  			$messageMail .= 'endColorstr="#802070",GradientType=0 );">';
			$messageMail .= '<td colspan="12">';
			$messageMail .= '<h2 style="text-align:center;">Confirmation d&#039;inscription</h2>';
			$messageMail .= '<h3 style="text-align:center;">';
			if($type == 4) {$messageMail .= 'Service gratuit';}
			else if($type == 5) {$messageMail .= 'Membre';}
				 else if($type == 6) {$messageMail .= 'Détaillant participant';}
			$messageMail .= '</h3>';
			$messageMail .= '<hr/>';
			$messageMail .= '<p style="padding:1px 5px;">';
			if($type == 4 || $type==5) {$messageMail .= 'Madame/Monsieur ';}
			if($type == 6) {$messageMail .= 'Détaillant ';}
			$messageMail.= $name.'</p>';
			$messageMail .= '<p style="padding:1px 5px;">Nous avons bien recu votre information</p>';
			$messageMail .= '<p style="padding:1px 5px 5px 5px;">RabaisEIP<br/>514-461-3475<br/>Info@rabaiseip.com</p>';
			$messageMail .= '</td>';
  			$messageMail .= '</tr>';
			$messageMail .= '<td colspan="12"><img src="http://eipstudio.com/email/footerimage.jpg" width="100%"></td>';
  			$messageMail .= '</tr></table></body></html>';

			mail($email,'RabaisEIP.com - Confirmation de registration ',$messageMail, $headers);
?>