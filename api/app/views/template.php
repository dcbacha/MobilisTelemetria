<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>Mobilis</title>
  <link rel="icon" href="img/versoes-logo-mobilis-05.png">
  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link rel="stylesheet" type="text/css" href="css/mobilisstyle.css">
  <link rel="stylesheet" type="text/css" href="css/mobilisformat.css">
 <!-- <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>-->
</head>
<body>

  <header>
  <div class="navbar-fixed">
  <nav class="mobilisblue" role="navigation">
    <div class="nav-wrapper">
      <a id="logo-container" href="#" class="brand-logo" style="margin-left: 15px;">
        <img src="img/logo_mobilis_colored.png" class="logo">
      </a>
      

      <a href="#" data-activates="nav-mobile" class="button-collapse top-nav full hide-on-large-only">
        <i class="material-icons" style="width: 100%">menu</i>
      </a>
    </div>
  </nav>
  </div>
 
   <ul id="nav-mobile" class="side-nav fixed grey lighten-4">
      
      <li style="height: 36px">
        <a href="#!" class="subheader" style="height: 100% ; padding-left: 10%">
          <i class="material-icons valign-wrapper"  style="height: 100%; margin-right: 5%">perm_identity</i>
          <div class="valign-wrapper" style="height: 100%" id="usuario"></div>
        </a>
      </li>
      <li style="height: 36px">
        <a href="#!" class="subheader" style="height: 100%; padding-left: 10%">
          <i class="material-icons valign-wrapper" style="height: 100%; margin-right: 5%">email</i>
          <div class="valign-wrapper" style="height: 100%" id="email"></div>
        </a>
      </li>
      
      <div class="center-align"><a class="waves-effect waves-light btn mobilisred" style="width: 220px" id="logout">Logout</a></div>
     
      <li><div class="divider"></div></li>

      <li><a id="btnfleet">Resumo da Frota</a></li>
      <li><a id="btndriver">Controle de Usuário</a></li>
      <li><a id="btndiagnostic">Diagnóstico</a></li>
      <li><a id="btncadastro">Cadastro</a></li>
      <li><a id="btndashboard">Dashboard</a></li>
    </ul>
    <!--<a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>-->
  </header>