<?php
/*  API de acesso do carro
Início das rotinas de redirecionamento da API
*/


/* 
PEGA O STATUS DO CARRO - (o que seria esse status?)
*/
$app->get("/car/status", function ($request, $response, $arguments) {
       $numserie = $this->get('jwt')->idcarro;     
           
       return $response->write("0"); 
});

/*  Rotina para receber dados de métricas do carro
Recebe um JSON com todas as métricas atualizadas do carro e retorna um json com
resultado da operação.

ADICIONA INFOS NO BD
*/
$app->put("/car/dados/metricas", function ($request, $response, $arguments) use ($app) {
    //Configura o banco de dados
    $db = getDB();
    //Coleta id do carro
    $numserie = $this->get('jwt')->idcarro;
    //Coleta dados enviados pelo sistema de telemetria   
    $data = $request->getParsedBody(); 
                                             
    //Realiza operação de inserção 
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
Recebe um JSON com todos os eventos ainda não sincronizados do veículo e retorna
um JSON com o resultado da operação.
*/
$app->put("/car/dados/eventos", function ($request, $response, $arguments) {
       $numserie = $this->get('jwt')->idcarro; 
              
           
       return $response->write("0"); 
});


//Retorna arquivo de configuração do carro com parâmetros atualizados
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

//Retorna última versão do software de telemetria do carro
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
$app->get("/carros/readdata", function ($request, $response, $arguments) use ($app) {
    $start = microtime(true);
   // return $response->withStatus(201)->write("pelo menos entrou aqui");


    //$app->$request->headers('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization');
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
        
        $time_elapsed_secs = microtime(true) - $start;
        $ans["time"] = $time_elapsed_secs;
                                               
        return $response->withStatus(201)
              ->withHeader("Content-Type", "application/json")
              ->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));     
      
    } 
    else {
      return $response->withStatus(401)->write("Algo deu errado");
    }  
                                                        
}); //end carros/readdata
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


$app->get("/carros/readdata-motor", function ($request, $response, $arguments) {
      $start = microtime(true);
      //Configura o banco de dados
    $db = getDB();
    //Coleta id do carro
    $idgrupo = $this->get('jwt')->idgrupo;
    $ans = array();

    try{
        $result = $db->prepare("SELECT usuarios.nome, logeventos.idmotorista, logeventos.`car-id` as idcarro, logeventos.`error-code` as errorcode, logeventos.`timestamp-rcv` as timestamp_rcv,logeventos.`timestamp-evt` as timestamp_evt,logeventos.data
                                FROM usuarios 
                                inner join logeventos on logeventos.idmotorista=usuarios.idusuario where usuarios.idgrupo = ?");
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
    } // end if ususarios                                        
    else {
      return $response->withStatus(401)->write("Algo de errado não está certo");
    } 
                                                    
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$app->post("/logeventos", function ($request, $response, $arguments) use ($app) {
    
    $start = microtime(true);

    $log_errors = ["FI01", "FI02", "FI03"]; //defino os codigos de erro possíveis

    $db = getDB();   

    $json = $request->getParsedBody();
    $status = $json['status'];
    $dados = base64_decode($json['dados']);
    
    $lines = array();
    $headers = array();
    $content = array();
 
    $lines = str_getcsv($dados, "\n");

    $headers = $lines[0];
    $headers = str_getcsv($headers, ";");

    $column_carid = array_search("Tempo Decorrido", $headers);
    $column_idmotorista = array_search("  id", $headers); 
    $column_error = array_search(" iq", $headers);
    $column_data = array_search(" idx", $headers);
    $column_timestamp = array_search(" Corrente Pack", $headers);

    $num_linhas = count($lines);

    for($i = 1 ; $i < $num_linhas ; $i ++){
        array_push($content, $lines[$i]);
    }

    $x=0;
    $exception =0;
    $ans=array();
    $arr_erros=array();
    

    $sql = "INSERT INTO `logeventos-teste`(`car-id`, `idmotorista`, `error-code`, `data`, `timestamp-evt`) VALUES ";
    
    foreach ($content as $line) {
            
        $itens = str_getcsv($line, ";");
            
        $carid = $itens[$column_carid];
        $idmotorista = $itens[$column_idmotorista];
        $error = $itens[$column_error];
        $data = $itens[$column_data];
        $timestamp = $itens[$column_timestamp];

        echo "\n".$timestamp;

        if( in_array($error, $log_errors)){
            
            $local_error = [ 'idcarro'=> $carid,
                            'erro'=> $error,
                            'data' => $data,
                            'time' => $timestamp
                        ];
            array_push($arr_erros, $local_error);
        }
        
        if($carid){
            $sql .= "('{$carid}', '{$idmotorista}', '{$error}', '{$data}', '{$timestamp}' ),";      
            $x ++;
        }
        else{ break; }
    }

    $sql = substr($sql, 0, -1);

    echo "\n\n".$sql;

    if($arr_erros){ enviaEmail($arr_erros); }
        
    try {                                                                                                               
        $result = $db->prepare($sql);
        $result -> execute();

        $ans["status"] = "ok";
        $ans["qntd"] = $x;
        
        $time_elapsed_secs = microtime(true) - $start;
        $ans["time"] = $time_elapsed_secs;

        return $response->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    catch(Exception $db) {
    
        $ans["status"] = "error";
        $ans["qntd"] = $x;
        $ans['error'] = $db;

        return $response->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }    
   
  
});

function enviaEmail($arr_erros){
    require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

   // $erros = json_encode($arr_erros);
    $carid = $arr_erros[0]['idcarro'];
    $num_erros = count($arr_erros);

     $html = "<body><p>Foram encontrados falhas no carro <strong>{$carid}</strong><br/></p><br/>
                <table border='1' cellspacing='0' width='80%' style='border-collapse:collapse;'  align='center'>
                <thead>
                    <tr bgcolor='#CCC' >
                        <th align='center'>Código</th>
                        <th align='center'>Dados</th>
                        <th align='center'>Horário</th>
                    </tr>
                </thead>
                <tbody>";

    for($i=0; $i<$num_erros ; $i++){

        $codigo = $arr_erros[$i]['erro'];
        $dados = $arr_erros[$i]['data'];
        $horario = $arr_erros[$i]['time'];

        $html .= "<tr>
                    <td align='center'>{$codigo}</td>
                    <td align='center'>{$dados}</td>
                    <td align='center'>{$horario}</td>
                </tr>";
    }

    $html .=  "</tbody></table>";
    $html .= "<p><br/>Iniciar diagnóstico <a href='#'>aqui</a></p><body>";

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
    $mail->addAddress("engenharia05mobilis@gmail.com"); //quem vai receber
    $mail->Subject = "Falha no Carro {$carid}"; //título do email
    $mail->msgHTML($html); //corpo da mensagem em html
   
   // $mail->SMTPDebug = 2;

    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }
}

////////////////////////////////////////////////////////////////////////////
//////////////////////// testes raspberry //////////////////////////////////
////////////////////////////////////////////////////////////////////////////
$app->put("/rpi", function ($request, $response, $arguments) use ($app) {
       //$numserie = $this->get('jwt')->idcarro;     
    $db = getDB();   
    //$status = $request->json_decode('status'); 
    $json = $request->getParsedBody();
   // $data = json_decode($json, true);
    $status = $json['status'];
    $dados = $json['dados'];


    //$json = $request->post('status');
       
    try {                                                                                                               
        $result = $db->prepare("INSERT INTO `rpi-eventos` (`status`, `dados`) VALUES ( ? , ? ) ");
        $result->bindParam(1, $status);
        $result->bindParam(2, $dados);
        $result -> execute();
         $ans["status"] = "ok";
        $ans['error'] = $db;

        return $response->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));  
    }
    catch(Exception $db) {
         $ans["status"] = "error";
        $ans['error'] = $db;
        return $response->withStatus(401)->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }     
});


