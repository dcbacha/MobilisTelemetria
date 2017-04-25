<?php
/*  API de acesso do carro
Inэcio das rotinas de redirecionamento da API
*/


/* 
PEGA O STATUS DO CARRO - (o que seria esse status?)
*/
$app->get("/car/status", function ($request, $response, $arguments) {
       $numserie = $this->get('jwt')->idcarro;     
           
       return $response->write("0"); 
});

/*  Rotina para receber dados de mщtricas do carro
Recebe um JSON com todas as mщtricas atualizadas do carro e retorna um json com
resultado da operaчуo.

ADICIONA INFOS NO BD
*/
$app->put("/car/dados/metricas", function ($request, $response, $arguments) use ($app) {
    //Configura o banco de dados
    $db = getDB();
    //Coleta id do carro
    $numserie = $this->get('jwt')->idcarro;
    //Coleta dados enviados pelo sistema de telemetria   
    $data = $request->getParsedBody(); 
                                             
    //Realiza operaчуo de inserчуo 
    try {
      
                    
     
                     

    
        $ans["id carro"] = $numserie;      
        $ans["status"] = "ok";
    } 
    catch (Exception $err){
        $ans["status"] = "error"; 
    }   
                                                        
    return $response->withStatus(201)
      ->withHeader("Content-Type", "application/json")
      ->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));   
});

/*  Rotina para receber dados de eventos do carro
Recebe um JSON com todos os eventos ainda nуo sincronizados do veэculo e retorna
um JSON com o resultado da operaчуo.
*/
$app->put("/car/dados/eventos", function ($request, $response, $arguments) {
       $numserie = $this->get('jwt')->idcarro; 
              
           
       return $response->write("0"); 
});


//Retorna arquivo de configuraчуo do carro com parтmetros atualizados
$app->get("/car/download/config", function ($request, $response, $arguments) {
        $file = __DIR__ . '/../../static/car_config.txt';
        $fh = fopen($file, 'rb');

        $stream = new \Slim\Http\Stream($fh); // create a stream instance for the response body

        return $response->withHeader('Content-Type', 'application/force-download')
                        ->withHeader('Content-Type', 'application/octet-stream')
                        ->withHeader('Content-Type', 'application/download')
                        ->withHeader('Content-Description', 'File Transfer')
                        ->withHeader('Content-Transfer-Encoding', 'binary')
                        ->withHeader('Content-Disposition', 'attachment; filename="' . basename($file) . '"')
                        ->withHeader('Expires', '0')
                        ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0')
                        ->withHeader('Pragma', 'public')
                        ->withBody($stream); // all stream contents will be sent to the response
});

//Retorna њltima versуo do software de telemetria do carro
$app->get("/car/download/update", function ($request, $response, $arguments) {
        $file = __DIR__ . '/../../static/car_software_latest.zip';
        $fh = fopen($file, 'rb');

        $stream = new \Slim\Http\Stream($fh); // create a stream instance for the response body

        return $response->withHeader('Content-Type', 'application/force-download')
                        ->withHeader('Content-Type', 'application/octet-stream')
                        ->withHeader('Content-Type', 'application/download')
                        ->withHeader('Content-Description', 'File Transfer')
                        ->withHeader('Content-Transfer-Encoding', 'binary')
                        ->withHeader('Content-Disposition', 'attachment; filename="' . basename($file) . '"')
                        ->withHeader('Expires', '0')
                        ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0')
                        ->withHeader('Pragma', 'public')
                        ->withBody($stream); // all stream contents will be sent to the response
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$app->post("/carros/readdata", function ($request, $response, $arguments) use ($app) {

   // $app->$request->headers('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    //Configura o banco de dados
    $db = getDB();
    //Coleta id do carro
    $idgrupo = $this->get('jwt')->idgrupo;

    $arr_carros = array();
    $arr_grupo = array();
    $ans = array();

    //primeiro pega os veiculos do grupo do usuario, depois o log de eventos de cada veiculo e dados do logpermanente dele e deixa tudo em um array unico para retorno

    ////////////////////////////// grupo ////////////////////////////////
    try {   
        $result = $db->prepare("SELECT * FROM `usuarios` WHERE `idgrupo` = ?");
        $result->bindParam(1, $idgrupo);
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write("Unauthorized");
    }                                   
            
    $linhas = $result->fetchAll();
    $num_linhas = count($linhas);

    if($num_linhas > 0){
        foreach ($linhas as $linha) {
            $nome = $linha["nome"];
            $id = $linha["idusuario"];
                    
            $payload_grupo = [
                "nome" => $nome,
                "id" => $id
            ];

            array_push($arr_grupo, $payload_grupo);
        }
    }
///////////////////////////////// veiculos e eventos ////////////////////////////////                                           
   try {   
        $result = $db->prepare("SELECT * FROM `veiculos` WHERE `idgrupo` = ?");
        $result->bindParam(1, $idgrupo);
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write("Unauthorized");
    }                                   
    
    $rows = $result->fetchAll();
    $num_rows = count($rows);  

    if($num_rows > 0){

     
    // para cada carro que achou, faz o select dos dois logs
        foreach ($rows as $row) {
            $idcarro = $row['idcarro'];
            $numserie = $row['numserie'];
            $arr_eventos = array();
       

            ////////////////////////////// log eventos ////////////////////////////////
            try {   
                $result = $db->prepare("SELECT * FROM `logeventos` WHERE `car-id` = ?");
                $result->bindParam(1, $idcarro);
                $result -> execute();  
            }
            catch(Exception $db) {
                return $response->withStatus(401)->write("Unauthorized");
            }                                   
            
            $linhas = $result->fetchAll();
            $num_linhas = count($linhas);

            if($num_linhas > 0){
                foreach ($linhas as $linha) {
                    $evento = $linha["error-code"];
                    $dado = $linha["data"];
                    $timestamp_rcv = $linha["timestamp-rcv"];
                    $timestamp_evt = $linha["timestamp-evt"];
                    $idmotorista = $linha["idmotorista"];

                    $payload_eventos = [
                     "evento" => $evento,
                     "dados" => $dado,
                     "time_evt" => $timestamp_evt,
                     "time_rcv" => $timestamp_rcv,
                     "idmotorista" =>$idmotorista
                    ];

                    array_push($arr_eventos, $payload_eventos);
                }
            } 
            
            ////////////////////////////// log permanente /////////////////////
            try {   
                $result = $db->prepare("SELECT * FROM `logpermanente` WHERE `car-id` = ?");
                $result->bindParam(1, $idcarro);
                $result -> execute();  
            }
            catch(Exception $db) {
                return $response->withStatus(401)->write("Unauthorized");
            }                                   
            
            $linhas = $result->fetchAll();
            $num_linhas = count($linhas);

            if($num_linhas > 0){
                foreach ($linhas as $linha) {
                    $odometro = $linha["odometro"];
                    $horimetro = $linha["horimetro"];

                    $payload = [
                     "idcarro" => $idcarro,
                     "numserie" => $numserie,
                     "odometro" => $odometro,
                     "horimetro" => $horimetro,
                     "evt" => $arr_eventos,

                    ];
                    array_push($arr_carros, $payload);
                }
            }        
        }

       $payload_total = [
            "grupo" => $arr_grupo,
            "carros" => $arr_carros
            ];

        array_push($ans, $payload_total);
      
                                               
        return $response->withStatus(201)
              ->withHeader("Content-Type", "application/json")
              ->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));     
      
    } 
    else {
      return $response->withStatus(401)->write("Algo de errado nуo estс certo");
    }  
                                                        
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$app->post("/carros/readdata-motor", function ($request, $response, $arguments) {
      //Configura o banco de dados
    $db = getDB();
    //Coleta id do carro
    $idgrupo = $this->get('jwt')->idgrupo;

    $carros = array();
    $arr_dados = array();
    $arr_carros = array();
    $arr_evt = array();
    $ans = array();

    //primeiro pega os veiculos do grupo do usuario, depois o log de eventos de cada veiculo e dados do logpermanente dele e deixa tudo em um array unico para retorno
////////////////////////////////
    //////////////

    //usuario -> nome id
    //eventos -> infos e tudo mais
    //carro do id do evento -> string
////////////////////////////////

///////////////////////////////// veiculos e eventos ////////////////////////////////                                           
   try {   
        $result = $db->prepare("SELECT * FROM `veiculos` WHERE `idgrupo` = ?");
        $result->bindParam(1, $idgrupo);
        $result -> execute();  
    }
    catch(Exception $db) {
        return $response->withStatus(401)->write("Unauthorized");
    }                                   
    
    $rows = $result->fetchAll();
    $num_rows = count($rows);  

    if($num_rows > 0){  

    // para cada carro que achou, faz o select dos dois logs
        foreach ($rows as $row) {
            $idcarro = $row['idcarro']; //QUEM SABE SALVAR UM ARRAY DE QUAIS CARROS PODEM SER VERIFICADOS (DEPENDE DE QUAL GRUPO ELE Щ)
            array_push($ans, $idcarro);

            try {   
                $result = $db->prepare("SELECT * FROM `logeventos` WHERE `car-id` = ?"); //vou precisar adicionar infinitas ids aqui 
                $result->bindParam(1, $idgrupo);
                $result -> execute();  
            }
            catch(Exception $db) {
                return $response->withStatus(401)->write("Unauthorized");
            } 
                
            $rows = $result->fetchAll();
            $num_rows = count($rows);  

            if($num_rows > 0){
            // para cada carro que achou, faz o select dos dois logs
                foreach ($rows as $row) {
                    $erro = $row['error-code']; //QUEM SABE SALVAR UM ARRAY DE QUAIS CARROS PODEM SER VERIFICADOS (DEPENDE DE QUAL GRUPO ELE Щ)
                    array_push($ans, $erro);
                }
            

                    
              
            }
        }
    

   

    return $response->withStatus(201)
              ->withHeader("Content-Type", "application/json")
              ->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)); 
      
     }                                          
       

    else {
      return $response->withStatus(401)->write("Algo de errado nуo estс certo");
    }  
                                                        
});


?>