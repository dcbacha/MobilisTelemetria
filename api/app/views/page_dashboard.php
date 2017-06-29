<?php

?>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/materialize.js"></script>
<script src="js/commonfunctions.js"></script>
<script src="js/commonplot.js"></script>

<script src="../vendor/flot/jquery.flot.js"></script>
<script src="../vendor/flot/jquery.flot.selection.js"></script>
<script src="../vendor/flot/jquery.flot.navigate.js""></script>
<script src="../vendor/flot/jquery.flot.pie.js""></script>
<script src="../vendor/flot/jquery.flot.stack.js""></script>
<script src="../vendor/flot/jquery.flot.categories.js""></script>
<script src="../vendor/flot/jquery.flot.resize.js""></script>
<script src="../vendor/flot/jquery.flot.orderBars.js""></script>
<script src="../vendor/flot/jquery.flot.time.js"></script>

<script src="js/main_dashboard.js"></script>

<style type="text/css">

  .cardteste {
    position: relative;
    padding: 8px;
    align-items: center;
  }

  .small{
    height: 150px;
    font-size: .85em;
  }

  .medium{
    height: 200px;
  }

  .big{
    height:422.5px;
  }
  
  .wrap{
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .placeholder{
    height: 90%;
    width: 90%;
    padding-left: 5px;
  }

  div.legendaMedia {
    height: 10em;
    display: flex;
    align-items: center;
    justify-content: center 
  }

  div.legendaMedia {
    color: white;
    border-radius: 1em;
    padding: 1em;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%) 
  }

  .row {
    margin-bottom: 0px;
  }

  .title {
    margin: 0px;
  }

  .subtitle {
    font-size: 0.7em;
    margin: 0px;
  }

  .style-congrats{
    border: 1px solid #4ee06d;
  }

  .style-alerta{
    border: 1px solid #f1c40f;
  }

  .style-falha{
    border: 1px solid  #e74c3c;
  }

  .flot-x-axis .flot-tick-label {
     font-size: 0.8em;

  }

  #btnselect{
    margin-top: 5px;
    max-width: 15%;
    margin-left: 10.5px
  }

  .loadingcard{
    position: relative;
    top: 60px;
    left: 46%;
  }

  @media only screen and (max-width: 1200px) and (min-width: 993px) {
    #card-temp2{
      margin-left: auto;
      left: auto;
      right: auto;
    }

    #card-temp2{
      width: 100%;
    }
  }

</style>

<div class="container">

  <div class="row center">

    <a class='dropdown-button btn col s12 m2 hide-on-small-only' href='#' data-activates='dropdown-select' id='btnselect'>Visualizar</a>

    <ul id='dropdown-select' class='dropdown-content'>
      <li><a href="#!" value="card-lastupdate">
        <i class="tiny material-icons left">visibility</i>Última Atualização</a>
      </li>
      <li><a href="#!" value="card-temporestante">
        <i class="tiny material-icons left">visibility</i>Estado de Carga</a>
      </li>
      <li><a href="#!" value="card-autonomia">
        <i class="tiny material-icons left">visibility</i>Autonomia Atual</a>
      </li>
      <li><a href="#!" value="card-horimetro-barra">
        <i class="tiny material-icons left">visibility</i>Horimetro (barras)</a>
      </li>
      <li><a href="#!" value="card-ligar">
        <i class="tiny material-icons left">visibility</i>Eventos de Ligar</a>
      </li>
      <li><a href="#!" value="card-odometro-barra">
        <i class="tiny material-icons left">visibility</i>Odometro (barras)</a>
      </li>
      <li><a href="#!" value="card-temp2">
        <i class="tiny material-icons left">visibility</i>Temp Maximas</a>
      </li>
      <li><a href="#!" value="card-horimetro">
        <i class="tiny material-icons left">visibility</i>Horimetro</a>
      </li>
      <li><a href="#!" value="card-odometro">
        <i class="tiny material-icons left">visibility</i>Odometro</a>
      </li>
      <li><a href="#!" value="card-tbateria">
        <i class="tiny material-icons left">visibility</i>Temp Max Bateria</a>
      </li>
      <li><a href="#!" value="card-densidadeeventos">
        <i class="tiny material-icons left">visibility</i>Densidade de eventos</a>
      </li>
      <li><a href="#!" value="card-type">
        <i class="tiny material-icons left">visibility</i>Eventos</a>
      </li>
    </ul>
    
    <h5 class="header col s12 m10 light titulo-pag"  style='padding-right: 15%;'>Painel de Controle</h5>

    <a class="btn-floating right smallround  tooltipped hide-on-small-only" data-position='bottom' data-delay='500' data-tooltip='Informações diárias sobre a sua frota. Os dados são referêntes às últimas atualizações de cada veículo. Verifique a conexão de cada carro para manter seu painel de controle atualizado' id="info">
      <i class='material-icons valign-wrapper'>info_outline</i>
    </a>
    <a class="btn-floating right smallround" id="reload">
      <i class='material-icons valign-wrapper'>update</i>
    </a>
  </div> <!-- fim div row header -->


  <div class="divider"></div>

  <div class="row" style="padding: 0">
    <div class="col s6 m2"> Falhas e Avisos </div>
    <div class="col s6 m2" style="padding: 0">
      <a class="btn-flat smalldrop dropdown-button subtitle" data-activates="dropdown-falhas" id='btnDropdownFalhas'>  Últimas 24 Horas</a>
        <ul id="dropdown-falhas" class="dropdown-content subtitle drop">
          <li><a href="#!">Últimas 24 Horas</a></li>
          <li><a href="#!">Última Semana</a></li>
          <li><a href="#!">Último Mês</a></li>
          <li><a href="#!">Último Ano</a></li>
        </ul>
    </div>
  </div>

  <div class="row rowmaster">
    
    <!--************************************************************************** --> 
    <div class="col s12 m12 card-big" id='card-congrats' hidden>
      <div class="card-panel cardteste style-congrats">
        <a class='btn-flat right fechar'><span>x</span></a>
        <p class="title">Parabéns! Não foram registradas falhas na sua frota </p> 
      </div>
    </div>
    
    <!--************************************************************************** --> 
    <div class="col s12 m12" id='card-falha' hidden>
      <div class="card-panel cardteste style-falha">
        <a class='btn-flat right fechar'><span>x</span></a>
        <p class="title">Falhas</p>
        <div>
          <ul id="placeholder-falha" class="collection"></ul>
        </div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m12" id='card-alerta' hidden>
      <div class="card-panel cardteste style-alerta">
        <a class='btn-flat right fechar'><span>x</span></a>
        <p class="title">Alertas</p>
        <div>
          <ul id="placeholder-alerta" class="collection"></ul>
        </div>
      </div>
    </div> 

    <!--************************************************************************** --> 
    <div class="col s12 m6 l3" id='card-lastupdate'>
      <div class="card-panel cardteste big">
        <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <p class="title">Última atualização</p>
        <img src="img/loading.gif" class="loadingcard">
        <div>
          <ul id="placeholder-lastupdate" class="collection" hidden></ul>
        </div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m6 l3" id='card-temporestante'>
      <div class="card-panel cardteste medium">
       <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
          <p class="title">Estado de Carga da Bateria</p>
          <img src="img/loading.gif" class="loadingcard">
          <div class="wrap">
            <div id="placeholder-estadocarga" class="placeholder"></div>
         </div>
         <div class="legendaPie" style="padding-left: 5%;"></div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m6 l3" id='card-autonomia'>
      <div class="card-panel cardteste medium">
        <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <p class="title">Autonomia atual</p>
        <img src="img/loading.gif" class="loadingcard">
        <div class="wrap">
          <div id="placeholder-autonomia" class="placeholder"></div>
        </div>
        <div id="legenda2" style="padding-left: 15%;"></div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m12 l3" id='card-horimetro-barra'>
      <div class="card-panel cardteste medium">
        <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <p class="title">Horímetro</p>
        <img src="img/loading.gif" class="loadingcard">
        <div class="wrap">
          <div id="placeholder-horimetro-barra" class="placeholder"></div>
        </div>
        <div class="legendaPie" style="padding-left: 5%;"></div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m6" id='card-ligar'>
      <div class="card-panel cardteste medium">
        <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <div class="row">
          <p class="title  col s8">Número de carros ligados nas últimas 24hrs</p>
          <img src="img/loading.gif" class="loadingcard">
        </div>
        <div class="wrap">
          <div id="placeholder-uso" class="placeholder"></div>
        </div>
        <div id="legendauso" style="padding-left: 15%;"></div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m6 l3" id='card-odometro-barra'>
      <div class="card-panel cardteste medium">
        <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <p class="title">Odometro</p>
        <img src="img/loading.gif" class="loadingcard">
        <div class="wrap center">
          <div id="placeholder-odometro-barra" class="placeholder"></div>
        </div>
        <div class="legendaPie" style="padding-left: 5%;"></div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m12 l6" id='card-temp2'>
      <div class="card-panel cardteste big">
        <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <p class="title">Temperaturas Máximas</p>
        <p  class="subtitle">Máximas temperaturas já registradas</p>
        <img src="img/loading.gif" class="loadingcard">
        <div class="wrap">
          <div id="placeholder5" class="placeholder"></div>
        </div>
        <div id="legenda5" style="padding-left: 5%;"></div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m6 l3" id='card-horimetro'>
      <div class="card-panel cardteste medium">
        <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <p class="title">Horímetro</p>
        <img src="img/loading.gif" class="loadingcard">
        <div class="wrap">
          <div id="placeholder-hor" class="placeholder"></div>
        </div>
        <div class="legendaPie" style="padding-left: 5%;"></div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m6 l3" id='card-odometro'>
      <div class="card-panel cardteste medium">
        <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <p class="title">Odometro</p>
        <img src="img/loading.gif" class="loadingcard">
        <div class="wrap center">
          <div id="placeholder-odo" class="placeholder"></div>
        </div>
        <div class="legendaPie" style="padding-left: 5%;"></div>
      </div>
    </div>

    <!--************************************************************************** -->  
    <div class="col s12 m12 l6" id='card-tbateria'>
      <div class="card-panel cardteste medium">
        <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <p class="title">Temperaturas Máximas na Bateria</p>
        <p  class="subtitle">Máximas temperaturas já registradas na Bateria do veículo</p>
        <img src="img/loading.gif" class="loadingcard">
        <div class="wrap">
          <div id="placeholder-tbateria" class="placeholder"></div>
       </div>
       <div id="legenda3" style="padding-left: 5%;"></div>
      </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m6" id='card-densidadeeventos'>
      <div class="card-panel cardteste medium">
       <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
       <div class="row">
        <p class="title  col s8">Densidade de Eventos</p>
        <img src="img/loading.gif" class="loadingcard">
        <a class="btn-flat smalldrop dropdown-button subtitle" data-activates="dropdown-densidade" id='btnDropdownDensidade'>  Últimas 24 Horas</a>
          <ul id="dropdown-densidade" class="dropdown-content subtitle drop">
            <li><a href="#!">Últimas 24 Horas</a></li>
            <li><a href="#!">Última Semana</a></li>
            <li><a href="#!">Último Mês</a></li>
            <li><a href="#!">Último Ano</a></li>
          </ul>
      </div>
          <div class="wrap">
            <div id="densidadeevt" class="placeholder"></div>
         </div>
         <div id="legendadensidade" style="padding-left: 15%;"></div>
    </div>
    </div>

    <!--************************************************************************** --> 
    <div class="col s12 m6" id='card-type'>
      <div class="card-panel cardteste medium">
      <a class='btn-flat right fechar hide-on-small-only'><span>x</span></a>
        <div class="row">
          <p class="title  col s8">Eventos por Tipos</p>
          <img src="img/loading.gif" class="loadingcard">
        </div>
        <div class="wrap">
          <div id="placeholder-type" class="placeholder"></div>
        </div>
        <div id="legendauso" style="padding-left: 15%;"></div>
      </div>
    </div>

  </div> <!-- fim row cards -->

</div> <!-- fim container -->


</body>
</html>
