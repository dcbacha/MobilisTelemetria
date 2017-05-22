<?php
//Biblioteca de conexão do banco de dados
require __DIR__ . '/../database.php'; 
//Biblioteca para realizar login   
use Firebase\JWT\JWT;

//Rotina de login pela área de usuário
$app->post("/login", function ($request, $response, $arguments) use ($app){ 
    $db = getDB(); 
  
    // esses funcionam se rolar um post direto do formulario, sem json e etc
    $email = $request->getParam('email'); 
    $password = $request->getParam('password');

    $password_enc = md5($password);
   
       
    try {   
        $result = $db->prepare("SELECT * FROM `usuarios` WHERE `email` = ? AND `password`= ?");
        $result->bindParam(1, $email);
        $result->bindParam(2, $password_enc);  
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
      $future = new DateTime("now +60 minutes");
      $server = $request->getServerParams();

      $payload = [
          "iat" => $now->getTimeStamp(),
          "exp" => $future->getTimeStamp(),
          "nome" => $rows[0]["nome"],
          "email" => $rows[0]["email"],
          "idgrupo" => $rows[0]["idgrupo"] //mudança nisso para que o acesso do ususario ja retorne o id do carro (talvez mudar para o grupo, já que podem ser varios carros)

      ];     
      
      $secret = "SUPER_SECRET_KET";
      $token = JWT::encode($payload, $secret, "HS256"); //define o json com as informacoes em JWT
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

//Rotina de login pelo veículo
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