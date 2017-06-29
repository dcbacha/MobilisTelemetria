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
$app->put("/car/dados/permanente", function ($request, $response, $arguments) use ($app) {
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
    //$numserie = $this->get('jwt')->idcarro;         
           
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

    $num_erros=0;
    $exception =0;
    $ans=array();
    $arr_erros=array();
    
    $sql = "INSERT INTO `logeventos`(`car-id`, `idmotorista`, `error-code`, `data`, `timestamp-evt`) VALUES ";
    
    foreach ($content as $line) {
            
        $itens = str_getcsv($line, ";");
            
        $carid = $itens[$column_carid];
        $idmotorista = $itens[$column_idmotorista];
        $error = $itens[$column_error];
        $data = $itens[$column_data];
        $timestamp = $itens[$column_timestamp];

        echo "\n".$timestamp;

        if( in_array($error, $log_errors)){
            
            $local_error = [ 'idcarro'  => $carid,
                             'erro'     => $error,
                             'data'     => $data,
                             'time'     => $timestamp ];
            
            array_push($arr_erros, $local_error);
        }
        
        if($carid){
            $sql .= "('{$carid}', '{$idmotorista}', '{$error}', '{$data}', '{$timestamp}' ),";      
            $num_erros ++;
        }
        else{ break; }
    }
    $sql = substr($sql, 0, -1);

    if($arr_erros){ enviaEmail($arr_erros); }
        
    try {                                                                                                               
        $result = $db->prepare($sql);
        $result -> execute();

        $ans["status"] = "ok";
        $ans["qntd"] = $num_erros;
        
        $time_elapsed_secs = microtime(true) - $start;
        $ans["time"] = $time_elapsed_secs;

        return $response->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
    catch(Exception $db) {
    
        $ans["status"] = "error";
        $ans["qntd"] = $num_erros;
        $ans['error'] = $db;

        return $response->write(json_encode($ans, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }    
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



                                                    
