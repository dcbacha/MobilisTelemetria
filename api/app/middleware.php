<?php
// Application middleware

//Autamotivamente processa JSONs e CSVs no body da pбgina

//JWT Login Protection
$app->add(new \Slim\Middleware\JwtAuthentication([
    "path" => ["/", ""],
    "secure" => false, //seguranзa "frouxa" -- sу true se usarmos https no servidor, como nгo estamos, = false
    "passthrough" => ['/user/auth', 'car/auth', '/user/newpassword',
                        '/car/dados/eventos', '/plotter', 
                        '/home', '/fleet', '/drivers', '/diagnostic', '/reg', 
                        '/regvehicle', '/regdriver', '/dashboard', '/trouble', 
                        '/edit', '/maintenance',  '/faq', '/contato', '/config', 
                        '/plot', '/rpi','/log', '/404'],
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
// acessadas sem verificar autenticaзгo     //
// das JWT.                                 //
// Aqui, as rotas de views e algumas        //
// funcionalidades do servidor estгo        //
// liberadas.                               //
//////////////////////////////////////////////
?>