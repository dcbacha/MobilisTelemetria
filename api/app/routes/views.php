<?php 

$app->get('/home', function($request, $response){

    return $this->view->render($response, 'page_login.html');

});

$app->get('/fleet', function($request, $response){


	$this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_fleet.php');

});

$app->get('/drivers', function($request, $response){

	$this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_driver.php');

});


$app->get('/diagnostic', function($request, $response){

    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_diagnostic.php');

});

$app->get('/register', function($request, $response){

    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_register.php');

});

$app->get('/dashboard', function($request, $response){

    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_dashboard.php');

});




////////////////////////////////////////////////////
$app->get('/log', function($request, $response){

    //$this->view->render($response, 'template.php');
    return $this->view->render($response, 'logsender.html');

});

$app->get('/plot', function($request, $response){

    //$this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_plot.html');

});

$app->get('/404', function($request, $response){

    return $this->view->render($response, 'page_404.html');
});


