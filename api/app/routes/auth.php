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
  // $password_hash = password_verify();
       
    try {   
        $result = $db->prepare("SELECT nome, email, idgrupo, password FROM `usuarios` WHERE `email` = ? LIMIT 1");
        $result->bindParam(1, $email);
       // $result->bindParam(2, $password_enc);  
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write("Unauthorized");
    }                                   
    
    $rows = $result->fetchObject();
    $num_rows = count($rows);
     
    if($num_rows){
      
      if(password_verify($request->getParam('password'), $rows->password)){
  
        $now = new DateTime();
        $future = new DateTime("now +15 minutes");
        $server = $request->getServerParams();

        $payload = [
            "iat" => $now->getTimeStamp(),
            "exp" => $future->getTimeStamp(),
            "nome" => $rows->nome,
            "email" => $rows->email,
            "idgrupo" => $rows->idgrupo
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
        return $response->withStatus(401)->write("Usuario ou senha errados");
      }
    }
    else {
      return $response->withStatus(401)->write("Usuário não existe");
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