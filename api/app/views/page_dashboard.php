<?php
 // include ("navbars.php");
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

/*.container {
  width: 90%;
}*/

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

.fechar{
   padding: 0 0.5rem;
}



</style>

<!--<body class="mobilislightblue"> -->
<div class="container">
  

  <div class="row">

    <div class="input-field col s3">
    <select multiple id="filtro">
      <option value="" disabled>Choose your option</option>
      <option value="1" selected>Última atualização</option>
      <option value="2" selected>Densidade de Eventos</option>
      <option value="3" selected>Horímetro</option>
      <option value="4" selected>Odometro</option>
      <option value="5" selected>Temp Máxima 1</option>
      <option value="6" selected>Temp Máxima 2</option>
      <option value="7" selected>Temp Máxima 3</option>
    </select>
  </div>
    
        <h5 class="header col s9 light">Painel de Controle</h5>

        <a class="btn-floating right smallround  tooltipped hide-on-small-only" data-position='bottom' data-delay='500' data-tooltip='Informações diárias sobre a sua frota. Os dados são referêntes às últimas atualizações de cada veículo. Verifique a conexão de cada carro para manter seu painel de controle atualizado' id="info">
          <i class='material-icons valign-wrapper'>info_outline</i>
        </a>
        <a class="btn-floating right smallround" id="reload">
          <i class='material-icons valign-wrapper'>loop</i>
        </a>
  </div>


<div class="divider"></div>

<div class="row" style="padding: 0">
    <div class="col s6 m2">
        Falhas e Avisos
    </div>
    <div class="col s6 m2" style="padding: 0">
        <a class="btn-flat smalldrop dropdown-button subtitle" data-activates="dropdown2" id='btnDropdown2'>  Últimas 24 Horas
        </a>
    </div>
</div>
<div class="row">
    <div class="col s12 m12 card-big" id='card-congrats' hidden>
     <div class="card-panel cardteste style-congrats">
        <p class="title">Parabéns! Não foram registradas falhas na sua frota <a class='btn-flat right fechar'>x</a></p>
       
    </div>
    </div>

    
    <div class="col s12 m12" id='card-falha' hidden>
     <div class="card-panel cardteste style-falha">
        <p class="title">Falhas<a class='btn-flat right fechar'>x</a></p>
        <div>
          <ul id="placeholder-falha" class="collection"></ul>
       </div>
    </div>
    </div>


    
    <div class="col s12 m12" id='card-alerta' hidden>
     <div class="card-panel cardteste style-alerta">
        <p class="title">Alertas<a class='btn-flat right fechar'>x</a></p>
        
        <div>
          <ul id="placeholder-alerta" class="collection"></ul>
       </div>
    </div>
    </div>


   <div class="col s12 m3" id='card-lastupdate'>
     <div class="card-panel cardteste big">
        <p class="title">Última atualização</p>
        <div>
          <ul id="placeholder-lastupdate" class="collection" hidden></ul>
       </div>
    </div>
  </div>

  <div class="col s12 m3" id='card-temporestante'>
    <div class="card-panel cardteste medium">
        <p class="title">Estado de Carga da Bateria</p>
        <div class="wrap">
          <div id="placeholder-estadocarga" class="placeholder"></div>
       </div>
       <div class="legendaPie" style="padding-left: 5%;"></div>
    </div>
  </div>

    <div class="col s12 m3" id='card-horimetro-barra'>
    <div class="card-panel cardteste medium">
        <p class="title">Horímetro</p>
        <div class="wrap">
          <div id="placeholder-horimetro-barra" class="placeholder"></div>
       </div>
       <div class="legendaPie" style="padding-left: 5%;"></div>
    </div>
  </div>

  <div class="col s12 m3" id='card-odometro-barra'>
    <div class="card-panel cardteste medium">
        <p class="title">Odometro</p>
        <div class="wrap center">
          <div id="placeholder-odometro-barra" class="placeholder"></div>
       </div>
       <div class="legendaPie" style="padding-left: 5%;"></div>
    </div>
  </div>
 
 



   <div class="col s12 m6" id='card-ligar'>
    <div class="card-panel cardteste medium">
      <div class="row">
        <p class="title  col s8">Número de carros ligados nas últimas 24hrs</p>
     <!--   <a class="btn-flat smalldrop dropdown-button subtitle" data-activates="dropdown3" id='btnDropdown3'>  Últimas 24 Horas
        </a> -->
        </div>
        <div class="wrap">
          <div id="placeholder-uso" class="placeholder"></div>
       </div>
       <div id="legendauso" style="padding-left: 15%;"></div>
  </div>
  </div>

  <div class="col s12 m3" id='card-horimetro'>
    <div class="card-panel cardteste medium">
        <p class="title">Horímetro</p>
        <div class="wrap">
          <div id="placeholder-hor" class="placeholder"></div>
       </div>
       <div class="legendaPie" style="padding-left: 5%;"></div>
    </div>
  </div>

   <div class="col s12 m6" id='card-temp2'>
    <div class="card-panel cardteste big">
        <p class="title">Temperaturas Máximas</p>
        <p  class="subtitle">Máximas temperaturas já registradas</p>
        <div class="wrap">
          <div id="placeholder5" class="placeholder"></div>
       </div>
       <div id="legenda5" style="padding-left: 5%;"></div>
    </div>
  </div>



   

   <div class="col s12 m3" id='card-temp1'>
    <div class="card-panel cardteste medium">
        <p class="title">Temperatura Máxima da Bateria</p>
        <p class="subtitle">Máxima temperatura registrada<p>
        <div class="wrap">
          <div id="placeholder2" class="placeholder"></div>
       </div>
       <div id="legenda2" style="padding-left: 15%;"></div>
    </div>
  </div>

    <div class="col s12 m3" id='card-odometro'>
    <div class="card-panel cardteste medium">
        <p class="title">Odometro</p>
        <div class="wrap center">
          <div id="placeholder-odo" class="placeholder"></div>
       </div>
       <div class="legendaPie" style="padding-left: 5%;"></div>
    </div>
  </div>

  

    
    <div class="col s12 m6" id='card-temp3'>
     <div class="card-panel cardteste medium">
        <p class="title">Temperaturas Máximas na Bateria</p>
        <p  class="subtitle">Máximas temperaturas já registradas na Bateria do veículo</p>
        <div class="wrap">
          <div id="placeholder3" class="placeholder"></div>
       </div>
       <div id="legenda3" style="padding-left: 5%;"></div>
    </div>
  </div>

    <div class="col s12 m6" id='card-densidadeeventos'>
    <div class="card-panel cardteste medium">
      <div class="row">
        <p class="title  col s8">Densidade de Eventos</p>
        <a class="btn-flat smalldrop dropdown-button subtitle" data-activates="dropdown1" id='btnDropdown1'>  Últimas 24 Horas
        </a>
        </div>
        <div class="wrap">
          <div id="densidadeevt" class="placeholder"></div>
       </div>
       <div id="legendadensidade" style="padding-left: 15%;"></div>
  </div>
  </div>

     <div class="col s12 m6" id='card-type'>
    <div class="card-panel cardteste medium">
      <div class="row">
        <p class="title  col s8">Eventos por Tipos</p>
     <!--   <a class="btn-flat smalldrop dropdown-button subtitle" data-activates="dropdown3" id='btnDropdown3'>  Últimas 24 Horas
        </a> -->
        </div>
        <div class="wrap">
          <div id="placeholder-type" class="placeholder"></div>
       </div>
       <div id="legendauso" style="padding-left: 15%;"></div>
  </div>
  </div>

  

  </div> <!-- fim row cards -->

  <div class="row">


  </div>


   <div class="row">




   

  </div>

</div> <!-- fim container -->


</body>
</html>


<!--Menus Dropdowns-->

<ul id="dropdown1" class="dropdown-content subtitle">
  <li><a href="#!">Últimas 24 Horas</a></li>
  <li><a href="#!">Última Semana</a></li>
  <li><a href="#!">Último Mês</a></li>
  <li><a href="#!">Último Ano</a></li>

</ul>

<ul id="dropdown2" class="dropdown-content subtitle">
  <li><a href="#!">Últimas 24 Horas</a></li>
  <li><a href="#!">Última Semana</a></li>
  <li><a href="#!">Último Mês</a></li>
  <li><a href="#!">Último Ano</a></li>

</ul>

<ul id="dropdown3" class="dropdown-content subtitle">
  <li><a href="#!">Últimas 24 Horas</a></li>
  <li><a href="#!">Última Semana</a></li>
  <li><a href="#!">Último Mês</a></li>
  <li><a href="#!">Último Ano</a></li>

</ul>