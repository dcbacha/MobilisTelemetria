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

$app->get('/reg', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_register.php');
});

$app->get('/regvehicle', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_register_vehicle.php');
});

$app->get('/regdriver', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_register_driver.php');
});

$app->get('/dashboard', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_dashboard.php');
});

$app->get('/edit', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_edit.php');
});

$app->get('/maintenance', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_maintenance.php');
});

$app->get('/faq', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_FAQ.php');
});

$app->get('/contato', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_contato.php');
});

$app->get('/config', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_config.php');
});

$app->get('/trouble', function($request, $response){
    $this->view->render($response, 'template.php');
    return $this->view->render($response, 'page_trouble.php');
});





////////////////////////////////////////////////////
$app->get('/log', function($request, $response){
    return $this->view->render($response, 'logsender.html');
});

$app->get('/plot', function($request, $response){
    return $this->view->render($response, 'page_plot.html');
});

$app->get('/404', function($request, $response){
    return $this->view->render($response, 'page_404.html');
});


