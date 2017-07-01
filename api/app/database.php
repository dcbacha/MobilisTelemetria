<?php
// Application middleware

//Configura conexão com servidor
function getDB()
{
    $dbhost = 'mysql08-farm68.kinghost.net';// "localhost"; // 
    $dbuser = 'mobilis001_add1';// "root"; //
    $dbpass = 'Abracadabra01';// "";	// 
    $dbname = 'mobilis01';//  "sistematelemetria"; //  
 
    $mysql_conn_string = "mysql:host=$dbhost;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_string, $dbuser, $dbpass); 
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

?>