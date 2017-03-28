<?php
// Application middleware

//Autamotivamente processa JSONs e CSVs no body da página

//JWT Login Protection
$app->add(new \Slim\Middleware\JwtAuthentication([
    "path" => ["/", ""],
    "passthrough" => ["/login","/car/auth"],
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

?>