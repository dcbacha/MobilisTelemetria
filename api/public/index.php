<?php
/*header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization, X-Custom-Header, X-PINGOTHER');
header('Access-Control-Request-Headers: X-Custom-Header');
header('Access-Control-Request-Methods: GET, POST, PUT');*/
require __DIR__ . '/../vendor/autoload.php';

//Instancia a Slim Framework
$app = new Slim\App([
	'settings' => [
			'displayErrorDetails' => true,
]]);
                           
//Sets up a jwt container for the decrypted jwt token
$container = $app->getContainer();

$container["jwt"] = function ($container) {
    return new StdClass;
};

$container['view'] = function ($container){

	$view = new \Slim\Views\Twig(__DIR__ . '/../app/views', [	
		'cache' => false,
	]);

	
	$view->addExtension(new \Slim\Views\TwigExtension(
		$container->router,
		$container->request->getUri()
	));

	return $view;
};

// Registrar middlewares
require __DIR__ . '/../app/middleware.php';

// Registrar routes de login e autenticação tanto de usuário como pelo veículo
require __DIR__ . '/../app/routes/auth.php';

// Registrar routes de API de acesso pelo carro
require __DIR__ . '/../app/routes/car.php';

// Registrar routes de API de acesso de funções variadas
require __DIR__ . '/../app/routes/misc.php';

//Registra routes de views
require __DIR__ . '/../app/routes/views.php';

$app->run();

