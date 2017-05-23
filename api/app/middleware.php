<?php
// Application middleware

//Autamotivamente processa JSONs e CSVs no body da pбgina

//JWT Login Protection
$app->add(new \Slim\Middleware\JwtAuthentication([
    "path" => ["/", ""],
    "secure" => false, //seguranзa "frouxa" -- sу true se usarmos https no servidor, como nгo estamos, = false
    "passthrough" => ['/home', '/fleet', '/drivers', '/diagRequest', '/cadastro', "/plot", "/login", "/car/auth", '/logeventos', "/rpi", "/plotter", "/log"],
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