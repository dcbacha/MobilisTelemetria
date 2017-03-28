<?php
//Biblioteca de conex�o do banco de dados
require __DIR__ . '/../database.php'; 
//Biblioteca para realizar login   
use Firebase\JWT\JWT;

//Rotina de login pela �rea de usu�rio
$app->post("/login", function ($request, $response, $arguments) 
{
    $db = getDB();   
    $email = $request->getParam('email'); 
    $password = $request->getParam('password');
       
    try {   
        $result = $db->prepare("SELECT * FROM `usuarios` WHERE `email` = ? AND `password`= ?");
        $result->bindParam(1, $email);
        $result->bindParam(2, $password);  
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write("Unauthorized");
    }                                   
    
    $rows = $result->fetchAll();
    $num_rows = count($rows);  
     
    if($num_rows > 0)
    {
      $now = new DateTime();
      $future = new DateTime("now +5 minutes");
      $server = $request->getServerParams();

      $payload = [
          "iat" => $now->getTimeStamp(),
          "exp" => $future->getTimeStamp(),
          "idusuario" => $rows[0]["idusuario"]
      ];     
      
      $secret = "SUPER_SECRET_KET";
      $token = JWT::encode($payload, $secret, "HS256");
      $data["status"] = "ok";
      $data["token"] = $token;
                                               
      return $response->withStatus(201)
          ->withHeader("Content-Type", "application/json")
          ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));     
      
    } 
    else {
      return $response->withStatus(401)->write("Wrong username or password");
    }
});

//Rotina de login pelo ve�culo
$app->post("/car/auth", function ($request, $response, $arguments) 
{
    $db = getDB();   
    $numserie = $request->getParam('numserie'); 
    $chaveacesso = $request->getParam('chaveacesso');
       
    try {                                                                                                               
        $result = $db->prepare("SELECT * FROM `veiculos` WHERE `numserie` = ? AND `chaveacesso`= ?");
        $result->bindParam(1, $numserie);
        $result->bindParam(2, $chaveacesso);  
        $result -> execute();
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write("Unauthorized");
    }                                   
    
    $rows = $result->fetchAll();
    $num_rows = count($rows);
    
    if($num_rows > 0)
    {
      $now = new DateTime();
      $future = new DateTime("now +5 minutes");
      $server = $request->getServerParams();

      $payload = [
          "iat" => $now->getTimeStamp(),
          "exp" => $future->getTimeStamp(),
          "idcarro" => $rows[0]["idcarro"]
      ];     
      
      $secret = "SUPER_SECRET_KET";
      $token = JWT::encode($payload, $secret, "HS256");
      $data["status"] = "ok";
      $data["token"] = $token;
         
      return $response->withStatus(201)
          ->withHeader("Content-Type", "application/json")
          ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));  
      
    } 
    else {
      return $response->withStatus(401)->write("Wrong username or password");
    }
});

?>