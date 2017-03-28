<?php

require 'vendor/autoload.php';

//Instancia a Slim Framework
$app = new Slim\App();
                           
//Sets up a jwt container for the decrypted jwt token
$container = $app->getContainer();
$container["jwt"] = function ($container) {
    return new StdClass;
};

// Registrar middlewares
require __DIR__ . '/app/middleware.php';

// Registrar routes de login e autenticação tanto de usuário como pelo veículo
require __DIR__ . '/app/routes/auth.php';

// Registrar routes de API de acesso pelo carro
require __DIR__ . '/app/routes/car.php';

$app->run();