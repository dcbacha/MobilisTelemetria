<?php 

$app->get('/home', function($request, $response){

    return $this->view->render($response, 'login.html');

});

$app->get('/fleet', function($request, $response){

//	return 'Home';
	$this->view->render($response, 'template.php');
    return $this->view->render($response, 'fleetpage.php');

});

$app->get('/drivers', function($request, $response){

	$this->view->render($response, 'template.php');
    return $this->view->render($response, 'driverpage.php');

});


$app->get('/diagRequest', function($request, $response){

    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'diagrequestpage.php');

});

$app->get('/cadastro', function($request, $response){

    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'cadastropage.php');

});



////////////////////////////////////////////////////
$app->get('/log', function($request, $response){

    //$this->view->render($response, 'template.php');
    return $this->view->render($response, 'logsender.html');

});

$app->get('/plot', function($request, $response){

    //$this->view->render($response, 'template.php');
    return $this->view->render($response, 'plotpage.html');

});


