<?php
// Application middleware

//Configura conexão com servidor
function getDB()
{
    $dbhost ="localhost"; //  'mysql08-farm68.kinghost.net';// 
    $dbuser ="root"; // 'mobilis001_add1';// 
    $dbpass = "";	// 'Abracadabra01';// 
    $dbname ="sistematelemetria"; //   'mobilis01';//  
 
    $mysql_conn_string = "mysql:host=$dbhost;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_string, $dbuser, $dbpass); 
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

?>