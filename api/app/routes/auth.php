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
        $future = new DateTime("now +60 minutes");
        $server = $request->getServerParams();

        $payload = [
           // "iat" => $now->getTimeStamp(),
            "exp" => $future->getTimeStamp(),
            "nme" => $rows->nome,
            "eml" => $rows->email,
            "idg" => $rows->idgrupo
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
      return $response->withStatus(401)->write("Usuario não existe");
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
          //"iat" => $now->getTimeStamp(),
          "exp" => $future->getTimeStamp(),
          "idc" => $rows[0]["idcarro"]
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

/////////////////////////////////////

$app->get("/newpassword", function ($request, $response, $arguments) use ($app){ 
    $db = getDB(); 
  
    // esses funcionam se rolar um post direto do formulario, sem json e etc
    $email = $request->getParam('email'); 
    $name = $request->getParam('name');
       
    try {   
        $result = $db->prepare("SELECT idusuario, nome, email, idgrupo, password FROM `usuarios` WHERE `email` = ? and `nome` = ?  LIMIT 1");
        $result->bindParam(1, $email);
        $result->bindParam(2, $name);
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write($db);
    }                                   
    
    $rows = $result->fetchObject();
    $num_rows = count($rows);
     
    if($rows){

        $id = $rows->idusuario;

        $senhanova = generateRandomString();

         $senha_hash = password_hash($senhanova, PASSWORD_DEFAULT);

         try {   
            $result = $db->prepare("UPDATE usuarios SET password = ?                                     WHERE idusuario = ?");
            $result->bindParam(1, $senha_hash);
            $result->bindParam(2, $id);
           
            $result -> execute();

            //return $response->withStatus(201)->write("Usuario alterado com sucesso"); 
        }
        catch(Exception $db) { return $response->withStatus(401)->write("Unauthorized");}


        $data["status"] = "sucesso";
       // $data['id'] = $id;
       // $data['senha'] = $senhanova;

        $mail = sendMailPassword($email, $senhanova);
        if($mail == "Message sent!"){
           return $response->withStatus(201)
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }                                     
       else{
          return $response->withStatus(401)->write("Algo deu errado");
       }
     
    }
    else {
      return $response->withStatus(401)->write("Usuario nao existe");
    }
});

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function sendMailPassword($email, $password){
   require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

    $html = "<body>";
     
    $html .= "<p>Nova senha: {$password}</p>
              <p>Email: {$email}</p><br>";

    $mail = new PHPMailer();

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    $mail->Username = "engenharia05mobilis@gmail.com";
    $mail->Password = "b&mvind0";

    // para funcionar no GoDaddy
    /*$mail->Host = 'relay-hosting.secureserver.net';
    $mail->Port = 25;
    $mail->SMTPAuth = false;
    $mail->SMTPSecure = false;*/

    $mail->setFrom("engenharia05mobilis@gmail.com", "Mobilis"); //quem está enviando
    /// tem que mudar aqui para o email do usuario
    $mail->addAddress("engenharia05mobilis@gmail.com"); //quem vai receber
    $mail->Subject = "[Nova Senha]"; //título do email
    $mail->msgHTML($html); //corpo da mensagem em html
   
   // $mail->SMTPDebug = 2;

    if (!$mail->send()) {
        return "Mailer Error: " . $mail->ErrorInfo;
    } else {
        return "Message sent!";
    }
}