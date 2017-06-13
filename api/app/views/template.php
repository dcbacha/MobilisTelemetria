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
<style type="text/css">
  
  .menu a.active {
    font-weight: 500;
    border-right: 2px solid #ee6e73;

  }

  .menu a.link{
    padding-left: 16px;
  }


    .footer{
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 1%;
    opacity: 0.5;
    color: grey;
    font-size: 0.8em;

  }

.collapsible-body >ul >li>a{
  font-size: .8em;
}

.dropdown .active{
  background-color: grey
}
</style>


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
      
      <div class="center-align"><a class="waves-effect waves-light btn mobilisred" style="width: 180px" id="logout">Logout</a></div>
     
      <li><div class="divider"></div></li>

      
      <li class="menu"><a href="#!" id="btndashboard" class="link">Painel de Controle</a></li>
      <li class="menu"><a href="#!" id="btnmaintenance" class="link">Oficina</a></li>
      <li class="menu"><a href="#!" id="btnfleet" class="link">Log da Frota</a></li>
      <li class="menu"><a href="#!" id="btndriver" class="link">Log do Usuário</a></li>
      <li class="no-padding menu">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header">Configurações<i class="material-icons right">arrow_drop_down</i></a>
            <div class="collapsible-body">
              <ul>
                <li class="dropdown"><a href="#!" id="btncadastro">Cadastro usuários WEB</a></li>
                <li class="dropdown"><a href="#!" id='btncadastromotorista'>Cadastro operadores</a></li>
                <li class="dropdown"><a href="#!" id="btncadastroveiculo">Cadastro veículos</a></li>
                <li class="dropdown"><a href="#!" id='btnconfig'>Configurar alertas</a></li>
              </ul>
            </div>
          </li>
          <li>
            <a class="collapsible-header">Suporte<i class="material-icons right">arrow_drop_down</i></a>
            <div class="collapsible-body">
              <ul>
                <li class="dropdown"><a href="#!" id='btntrouble'>Troubleshooting</a></li>
                <li class="dropdown"><a href="#!" id="btndiagnostic">Diagnóstico</a></li>
                <li class="dropdown"><a href="#!" id='btnfaq'>FAQ</a></li>
                <li class="dropdown"><a href="#!" id='btncontato'>Contato</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    
    <!--  <li class="menu"><a >Cadastro Usuários</a></li>
      <li class="menu"><a >Cadastro Veículos</a></li> -->

    </ul>
    <div class="footer">
       Mobilis® - V0.0
    </div>
    <!--<a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>-->
  </header>