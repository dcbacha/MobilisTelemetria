<?php
// Configuraчуo do bando de dados
require __DIR__ . '/../database.php';


//Rotina de login pela сrea de usuсrio
$app->post("/login", function ($request, $response, $arguments) 
{
    $db = getDB();   
    $email = $request->getParam('email'); 
    $password = $request->getParam('password');
       
    try {
        $result = $db->query("SELECT * FROM `usuarios` WHERE `email` = '$email' AND `password`= '$password'"); 
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
          "user" => $email,
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