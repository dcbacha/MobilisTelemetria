<?php
// Application middleware

//Autamotivamente processa JSONs e CSVs no body da p�gina

//JWT Login Protection
$app->add(new \Slim\Middleware\JwtAuthentication([
    "path" => ["/", ""],
    "secure" => false, //seguran�a "frouxa" -- s� true se usarmos https no servidor, como n�o estamos, = false
    "passthrough" => ['/client/auth', 'car/auth', '/client/newpassword',
                        '/car/dados/eventos', '/plotter', 
                        '/home', '/evtfleet', '/evtdrivers', '/diagnostic', '/reg', 
                        '/regvehicle', '/regdriver', '/dashboard', '/trouble', 
                        '/edit', '/editdriver', '/editcar','/maintenance',  '/faq', '/contato', '/config', 
                        '/plot', '/rpi','/log', '/404',
                        '/webusers', '/drivers', '/cars'],
    "secret" => "SUPER_SECRET_KET",
    "callback" => function ($request, $response, $arguments) use ($container) {
        $container["jwt"] = $arguments["decoded"];
    },
    "error" => function ($request, $response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));

//////////////////////////////////////////////
// o Passtrrough permite que rotas sejam    //
// acessadas sem verificar autentica��o     //
// das JWT.                                 //
// Aqui, as rotas de views e algumas        //
// funcionalidades do servidor est�o        //
// liberadas.                               //
//////////////////////////////////////////////
?>