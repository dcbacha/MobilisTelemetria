<?php

$app->put("/cadastro", function ($request, $response, $arguments) use ($app) {
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
    //echo $senha_hash;

    try{
        $result = $db->prepare("INSERT INTO `usuarios` (`nome`, `sobrenome`, `username`, `email`, `password`, `idgrupo`, `nivelpermissao`) VALUES (?, ?, ?, ?, ?, ?, ?)" );
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


$app->put("/cadastroveiculo", function ($request, $response, $arguments) use ($app) {
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
      //  $result->bindParam(4, $responsavel);

        $result -> execute();
        return $response->withStatus(201)->write("sucesso");
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write($db);
    } 

});

/////////////////////////////////////////////////////////////////////////////////////


$app->get("/listlogperm", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
   
    $idgrupo = $this->get('jwt')->idg;

    try{
        $result = $db->prepare("SELECT lp.`last-update` as last_update, lp.`indice-eficiencia` as indice_eficiencia, lp.`km-kwh` as km_kwh, lp.`odometro`,
                                        lp.`horimetro`, lp.`soh`, lp.`horas-carga-0` as carga0, lp.`horas-carga-1` as carga1 , lp.`horas-carga-2` as carga2,
                                        lp.`tem-max-motor` as temp_max_motor, lp.`temp-max-inversor` as temp_max_inversor, lp.`temp-max-bateria` as temp_max_bateria,
                                        v.`numserie`, v.`idcarro` 
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
    } // end if ususarios                                        
    else {
      return $response->withStatus(401)->write($db);
    } 

});

/////////////////////////////////////////////////////////////////////////////////////
$app->get("/listfleet", function ($request, $response, $arguments) use ($app) {
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
    } // end if ususarios                                        
    else {
      return $response->withStatus(401)->write("Algo de errado não está certo");
    } 

});

/////////////////////////////////////////////////////////////////////////////////////
$app->get("/listgroup", function ($request, $response, $arguments) use ($app) {
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
    } // end if ususarios                                        
    else {
      return $response->withStatus(401)->write("Algo de errado não está certo");
    } 

});



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

/////////////////////////////////////////////////////////////////////////////////////

$app->get("/getInfo", function ($request, $response, $arguments) use ($app) {
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

$app->get("/refreshuser", function ($request, $response, $arguments) use ($app) {
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
            $result = $db->prepare("UPDATE usuarios SET nome =  ?, sobrenome = ?, username = ?, email = ?, nivelpermissao = ?, password = ?
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
            $result = $db->prepare("UPDATE usuarios SET nome =  ?, sobrenome = ?, username = ?, email = ?, nivelpermissao = ?
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