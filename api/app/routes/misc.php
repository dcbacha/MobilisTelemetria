<?php

$app->put("/subscribe", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
   
    $idgrupo = $this->get('jwt')->idgrupo;
    $nome_user = $this->get('jwt')->nome;
    $email_user = $this->get('jwt')->email;

    $nome = $request->getParam('nome');
    $sobrenome = $request->getParam('sobrenome');
    $user = $request->getParam('user'); 
    $email = $request->getParam('email');
    $senha = $request->getParam('senha');
    $grupo = $request->getParam('grupo');
    $nivel = $request->getParam('nivel');

    $senha_enc = md5($senha);

    try{
        $result = $db->prepare("INSERT INTO `usuarios` (`nome`, `sobrenome`, `username`, `email`, `password`, `idgrupo`, `nivelpermissao`) VALUES (?, ?, ?, ?, ?, ?, ?)" );
        $result->bindParam(1, $nome);
        $result->bindParam(2, $sobrenome);
        $result->bindParam(3, $user);
        $result->bindParam(4, $email);
        $result->bindParam(5, $senha_enc);
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
$app->get("/listlogperm", function ($request, $response, $arguments) use ($app) {
    $db = getDB();
   
    $idgrupo = $this->get('jwt')->idgrupo;

    try{
        $result = $db->prepare("SELECT `logpermanente`.`odometro`, `logpermanente`.`horimetro`, `veiculos`.`numserie`, `veiculos`.`idcarro`
                                FROM `veiculos`
                                    LEFT JOIN `logpermanente` ON `logpermanente`.`car-id` = `veiculos`.`idcarro`
                                WHERE `veiculos`.`idgrupo` = ?");
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
   
    $idgrupo = $this->get('jwt')->idgrupo;

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
   
    $idgrupo = $this->get('jwt')->idgrupo;

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

