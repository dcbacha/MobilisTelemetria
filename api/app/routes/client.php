<?php

$app->get("/client/readevents", function ($request, $response, $arguments) {
    $start = microtime(true);

    $db = getDB();
    $idgrupo = $this->get('jwt')->idg;
    $ans = array();

    try{
        $result = $db->prepare("SELECT usuarios.nome, logeventos.idmotorista, 
                                    logeventos.`car-id` as idcarro, logeventos.`error-code` as errorcode, 
                                    logeventos.`timestamp-rcv` as timestamp_rcv,logeventos.`timestamp-evt` 
                                    as timestamp_evt,logeventos.data
                                FROM usuarios 
                                inner join logeventos on logeventos.idmotorista=usuarios.idusuario 
                                where usuarios.idgrupo = ?");
        $result->bindParam(1, $idgrupo);
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write($db);
    } 
            
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    $num_rows = count($rows);

    if($num_rows > 0){
        $time_elapsed_secs = microtime(true) - $start;
        $ans["time"] = $time_elapsed_secs;

        return $response->withStatus(201)
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($rows, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }                                        
    else {
      return $response->withStatus(401)->write("Algo aconteceu");
    } 
                                                    
});

/////////////////////////////////////////////////////////////////////////////////////
$app->get("/client/readlogperm", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
    $idgrupo = $this->get('jwt')->idg;

    try{
        $result = $db->prepare("SELECT lp.`last-update` as last_update, lp.`indice-eficiencia` as indice_eficiencia, 
                                    lp.`km-kwh` as km_kwh, lp.`odometro`, lp.`horimetro`, lp.`soh`, 
                                    lp.`horas-carga-0` as carga0, lp.`horas-carga-1` as carga1 , 
                                    lp.`horas-carga-2` as carga2, lp.`tem-max-motor` as temp_max_motor, 
                                    lp.`temp-max-inversor` as temp_max_inversor, 
                                    lp.`temp-max-bateria` as temp_max_bateria, v.`numserie`, v.`idcarro` 
                                FROM `veiculos` as v
                                    LEFT JOIN `logpermanente` as lp ON lp.`car-id` = v.`idcarro`
                                WHERE v.`idgrupo` = ?");
        $result->bindParam(1, $idgrupo);
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write($db);
    } 
            
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    $num_rows = count($rows);

    if($num_rows > 0){
        return $response->withStatus(201)
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($rows, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }                                       
    else {
      return $response->withStatus(401)->write($db);
    } 
});

/////////////////////////////////////////////////////////////////////////////////////
$app->put("/client/register", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
   
    $idgrupo = $this->get('jwt')->idg;
    $nome_user = $this->get('jwt')->nme;
    $email_user = $this->get('jwt')->eml;

    $nome = $request->getParam('nome');
    $sobrenome = $request->getParam('sobrenome');
    $user = $request->getParam('user'); 
    $email = $request->getParam('email');
    $senha = $request->getParam('senha');
    $grupo = $request->getParam('grupo');
    $nivel = $request->getParam('nivel');

    //$senha_enc = md5($senha);
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    try{
        $result = $db->prepare("INSERT INTO `usuarios` (`nome`, `sobrenome`, `username`, `email`, 
                                    `password`, `idgrupo`, `nivelpermissao`) 
                                VALUES (?, ?, ?, ?, ?, ?, ?)" );
        $result->bindParam(1, $nome);
        $result->bindParam(2, $sobrenome);
        $result->bindParam(3, $user);
        $result->bindParam(4, $email);
        $result->bindParam(5, $senha_hash);
        $result->bindParam(6, $idgrupo);
        $result->bindParam(7, $nivel);

        $result -> execute();
        return $response->withStatus(201)->write("sucesso");
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write($db);
    } 
});

/////////////////////////////////////////////////////////////////////////////////////
$app->put("/client/registercar", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
   
    $idgrupo = $this->get('jwt')->idg;
    $nome_user = $this->get('jwt')->nme;
    $email_user = $this->get('jwt')->eml;

    $numserie = $request->getParam('numserie');
    $chaveacesso = $request->getParam('chaveacesso');
    $responsavel = $request->getParam('responsavel'); 
    $grupo = $request->getParam('grupo');


    try{
        $result = $db->prepare("INSERT INTO `veiculos` (`numserie`, `chaveacesso`,`idgrupo`) VALUES (?, ?, ?)" );
        $result->bindParam(1, $numserie);
        $result->bindParam(2, $chaveacesso);
        $result->bindParam(3, $grupo);

        $result -> execute();
        return $response->withStatus(201)->write("sucesso");
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write($db);
    } 
});

/////////////////////////////////////////////////////////////////////////////////////
$app->get("/client/listfleet", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
    $idgrupo = $this->get('jwt')->idg;

    try{
        $result = $db->prepare("SELECT idcarro, numserie FROM veiculos where idgrupo = ?");
        $result->bindParam(1, $idgrupo);
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write($db);
    } 
            
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    $num_rows = count($rows);

    if($num_rows > 0){
        return $response->withStatus(201)
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($rows, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }                                       
    else {
      return $response->withStatus(401)->write("Algo de errado não está certo");
    } 

});

/////////////////////////////////////////////////////////////////////////////////////
$app->get("/client/listgroup", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
    $idgrupo = $this->get('jwt')->idg;

    try{
        $result = $db->prepare("SELECT nome FROM usuarios where idgrupo = ?");
        $result->bindParam(1, $idgrupo);
        $result -> execute(); 

    }
    catch(Exception $db) {
        return $response->withStatus(401)->write($db);
    } 
            
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    $num_rows = count($rows);

    if($num_rows > 0){
        return $response->withStatus(201)
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($rows, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }                                       
    else {
      return $response->withStatus(401)->write("Algo de errado não está certo");
    } 

});

/////////////////////////////////////////////////////////////////////////////////////
$app->get("/client/getInfo", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
    
    $id = $request->getParam('id');

    try{
        $result = $db->prepare("SELECT nome, sobrenome, email, username, nivelpermissao FROM usuarios where idusuario = ?");
        $result->bindParam(1, $id);
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write($db);
    } 
            
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    $num_rows = count($rows);

    if($num_rows > 0){

        return $response->withStatus(201)
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($rows, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    } // end if ususarios                                        
    else {
      return $response->withStatus(401)->write("Algo de errado não está certo");
    } 

});

/////////////////////////////////////////////////////////////////////////////////////
$app->get("/client/updateuser", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
    
    $id = $request->getParam('id');
    $nome = $request->getParam('nome');
    $sobrenome = $request->getParam('sobrenome');
    $username = $request->getParam('username');
    $email = $request->getParam('email');
    $nivel = $request->getParam('nivel');
    $senhaatual = $request->getParam('senhaatual');
    $senhanova = $request->getParam('senhanova');

   $trocarsenha = false;

   if($senhanova){
        try {   
            $result = $db->prepare("SELECT password FROM `usuarios` WHERE `idusuario` = ? LIMIT 1");
            $result->bindParam(1, $id);
            $result -> execute();  
        }
        catch(Exception $db) { return $response->withStatus(401)->write("Unauthorized");}                                   
        
        $rows = $result->fetchObject();
        $num_rows = count($rows);
         
        if($num_rows){
          if(password_verify($senhaatual, $rows->password)){ $trocarsenha = true; }   
          else { return $response->withStatus(401)->write("Senha errada"); }
        }
        else { return $response->withStatus(401)->write("Usuario não existe"); }
   }

   if($trocarsenha){

    $senha_hash = password_hash($senhanova, PASSWORD_DEFAULT);

         try {   
            $result = $db->prepare("UPDATE usuarios SET nome =  ?, sobrenome = ?, username = ?, email = ?, 
                                        nivelpermissao = ?, password = ?
                                    WHERE idusuario = ?");
            $result->bindParam(1, $nome);
            $result->bindParam(2, $sobrenome);
            $result->bindParam(3, $username);
            $result->bindParam(4, $email);
            $result->bindParam(5, $nivel);
            $result->bindParam(6, $senha_hash);
            $result->bindParam(7, $id);
            $result -> execute();

            return $response->withStatus(201)->write("Usuario alterado com sucesso"); 
        }
        catch(Exception $db) { return $response->withStatus(401)->write("Unauthorized");}                                   
        
   }
   else{
        try {   
            $result = $db->prepare("UPDATE usuarios SET nome =  ?, sobrenome = ?, username = ?, 
                                        email = ?, nivelpermissao = ?
                                    WHERE idusuario = ?");
            $result->bindParam(1, $nome);
            $result->bindParam(2, $sobrenome);
            $result->bindParam(3, $username);
            $result->bindParam(4, $email);
            $result->bindParam(5, $nivel);
            $result->bindParam(6, $id);
            $result -> execute();

            return $response->withStatus(401)->write("Usuario alterado com sucesso");

        }
        catch(Exception $db) { return $response->withStatus(401)->write("Unauthorized");}                                   
   }

});

/////////////////////////////////////////////////////////////////////////////////////
$app->put("/client/maildiagnostic", function ($request, $response, $arguments) use ($app) {
    //$db = getDB();
    
    $idgrupo = $this->get('jwt')->idg;
    $email = $this->get('jwt')->eml;
    $nome = $this->get('jwt')->nme;

    $carro = $request->getParam('carro');
    $problema = $request->getParam('problema');
    $outro = $request->getParam('outro');
    $descricao = $request->getParam('descricao');

    $mail = mail_diagnostico($carro, $problema, $outro, $descricao, $nome, $email, $idgrupo);
    
    if($mail == "Message sent!"){
        return $response->withStatus(201)->write("Email enviado com sucesso");
    }
    else{
        return $response->withStatus(401)->write($mail);
    }

    

});

function mail_diagnostico($carro, $problema, $outro, $descricao, $nome, $email, $idgrupo){
    require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';


     $html = "<body><p>Um Diagnóstico do carro {$carro} do grupo {$idgrupo} foi solicitado<br/></p><br/>
                <table border='1' cellspacing='0' width='80%' style='border-collapse:collapse;' align='center'>
                <thead>
                    <tr bgcolor='#CCC' >
                        <th align='center'>Carro</th>
                        <th align='center'>Problema</th>
                        <th align='center'>Descrição</th>
                    </tr>
                </thead>
                <tbody>";


    $html .= "<tr> 
                <td align='center'>{$carro}</td>";

    if ($outro == ""){
        $html .= "<td align='center'>{$problema}</td>";
    }
    else{
        $html .= "<td align='center'>{$outro}</td>";
    }
                    
    $html .= "<td align='center'>{$descricao}</td>
                </tr>
            </tbody></table>
                <p>Responsável pelo pedido: {$nome}</p>
                <p>Email: {$email}</p><br>
                <p><br/>Iniciar diagnóstico <a href='#'>aqui</a></p>
            <body>";

    $mail = new PHPMailer();

    $mail->isSMTP();
    //$mail->SMTPDebug = 2;

    $mail->Host = 'smtp.mobilis.eco.br';//'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPSecure = false;
    $mail->SMTPAutoTLS = false;
    $mail->SMTPAuth = true;
    $mail->Username = 'suporte@mobilis.eco.br'; //"engenharia05mobilis@gmail.com";
    $mail->Password = 'Abracadabra_1'; //"b&mvind0";

    // para funcionar no GoDaddy
    /*$mail->Host = 'relay-hosting.secureserver.net';
    $mail->Port = 25;
    $mail->SMTPAuth = false;
    $mail->SMTPSecure = false;*/

    $mail->setFrom("suporte@mobilis.eco.br", "Mobilis"); //quem está enviando
    $mail->addAddress("engenharia05mobilis@gmail.com"); //quem vai receber
    $mail->Subject = "[Diagnostico] Carro {$carro}"; //título do email
    $mail->msgHTML($html); //corpo da mensagem em html
   

    if (!$mail->send()) {
        return "Mailer Error: " . $mail->ErrorInfo;
    } else {
        return "Message sent!";
    }
}

/////////////////////////////////////////////////////////////////////////////////////
$app->get("/plotter", function ($request, $response, $arguments) use ($app) {
       //$numserie = $this->get('jwt')->idcarro;     
    $db = getDB();   
       
    try {                                                                                                               
     //$result = $db->prepare("SELECT dados FROM `rpi-eventos` WHERE status = 'TesteLogSmall-enc'");
        $result = $db->prepare("SELECT dados FROM `rpi-eventos` WHERE status = 'TesteLogOK-enc'");
        // $result = $db->prepare("SELECT dados FROM `rpi-eventos` WHERE status = 'TesteLogGG-enc'");
        $result -> execute();

       //   $stream = new \Slim\Http\Stream($result);
        $log = $result->fetchAll(PDO::FETCH_ASSOC);
        $ans["status"] = "ok";
        $ans["data"] = $log;

        return $response->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));  
    }
    catch(Exception $db) {

        $ans["status"] = "error";
        $ans['error'] = $db;

        return $response->withStatus(401)->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }     
});