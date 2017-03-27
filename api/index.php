<?php

require 'vendor/autoload.php';
use Firebase\JWT\JWT;


//Configura conexão com servidor
function getDB()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "sistematelemetria";
 
    $mysql_conn_string = "mysql:host=$dbhost;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_string, $dbuser, $dbpass); 
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

//Instancia a Slim Framework
$app = new Slim\App();
$container = $app->getContainer();

$container["jwt"] = function ($container) {
    return new StdClass;
};

/*
Início das rotinas de redirecionamento da API
Lista de métodos:
-Para controle de acesso:
--/login
--/logout
-Para acesso do carro:
--/car/auth/
--/car/update/events
--/car/update/metrics
--/car/download/update
--/car/update/engineering
*/

//Middlewares
$app->add(new \Slim\Middleware\JwtAuthentication([
    "path" => ["/", ""],
    "passthrough" => ["/auth"],
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

//Routes
$app->get("/", function ($request, $response, $arguments) {
       $decode = $this->jwt->user; 
       print_r($decode);
                                          
       return $response->write("Home page! "); 
});

//Test login
$app->add(new \Slim\Middleware\HttpBasicAuthentication([
    "path" => "/auth",
    "users" => ["test" => "test"]
]));

$app->get("/car/gate", function ($request, $response, $arguments) {

    
    $now = new DateTime();
    $future = new DateTime("now +5 minutes");
    $server = $request->getServerParams();

    $payload = [
        "iat" => $now->getTimeStamp(),
        "exp" => $future->getTimeStamp(),
        "car_sn" => "giovanni",
    ]; 
    
    $secret = "SUPER_SECRET_KET";
    $token = JWT::encode($payload, $secret, "HS256");
    $data["status"] = "ok";
    $data["token"] = $token;

    return $response->withStatus(201)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
});

$app->get("/login", function ($request, $response, $arguments) {
    
    $now = new DateTime();
    $future = new DateTime("now +5 minutes");
    $server = $request->getServerParams();

    $payload = [
        "iat" => $now->getTimeStamp(),
        "exp" => $future->getTimeStamp(),
        "user_id" => "giovanni",
    ];     
    
    $secret = "SUPER_SECRET_KET";
    $token = JWT::encode($payload, $secret, "HS256");
    $data["status"] = "ok";
    $data["token"] = $token;

    return $response->withStatus(201)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
});

$app->post('/car/update/', function ($request, $response, $args) {
    return $response->write("Login, " . $args['name']);
});

$app->post('/car/auth/', function ($request, $response, $args) {
    return $response->write("Login, " . $args['name']);
});

$app->get('/login}', function ($request, $response, $args) {
    return $response->write("Hello, " . $args['name']);
});

$app->run();