<?php
// Application middleware

//Configura conexão com servidor
function getDB()
{
    $dbhost = "localhost"; //"192.155.249.213"; //
    $dbuser = "root";		//"mobilise_user"; //
    $dbpass = "";			//"3.+s&b.X&Az["; //
    $dbname = "sistematelemetria"; //"mobilise_sistematelemetria"; //
 
    $mysql_conn_string = "mysql:host=$dbhost;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_string, $dbuser, $dbpass); 
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

?>