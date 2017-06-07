<?php
 // include ("navbars.php");
?>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/materialize.js"></script>
<script src="js/commonfunctions.js"></script>
<script src="../vendor/flot/jquery.flot.js"></script>
<script src="../vendor/flot/jquery.flot.selection.js"></script>
<script src="../vendor/flot/jquery.flot.navigate.js""></script>
<script src="../vendor/flot/jquery.flot.pie.js""></script>
<script src="../vendor/flot/jquery.flot.stack.js""></script>
<script src="../vendor/flot/jquery.flot.categories.js""></script>
<script src="../vendor/flot/jquery.flot.resize.js""></script>
<script src="../vendor/flot/jquery.flot.orderBars.js""></script>

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
    height: 315px;
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

</style>

<!--<body class="mobilislightblue"> -->
<div class="container">

  <div class="row center">
        <h5 class="header col s12 light">Painel de Controle</h5>
  </div>
  <div class="divider"></div>

  <div class="row">

  <div class="col s12 m2">
    <div class="card-panel cardteste small">
        <p class="title">State of Health</p>
        <p class="subtitle">Média da frota</p>
        <div class="wrap">
          <div id="placeholder10" class="placeholder"></div>
       </div>
       <div class="legendaMedia"></div>
    </div>
  
    <div class="card-panel cardteste small">
        <p class="title">Indice de Eficiência</p>
        <p class="subtitle">Média da frota</p>
        <div class="wrap">
          <div id="placeholder11" class="placeholder"></div>
       </div>
       <div class="legendaMedia"></div>
    </div>
  </div>
 
  <div class="col s12 m4">
    <div class="card-panel cardteste medium">
        <p class="title">Temperatura Máxima da Bateria</p>
        <p class="subtitle">Máxima temperatura registrada na Bateria do veículo<p>
        <div class="wrap">
          <div id="placeholder2" class="placeholder"></div>
       </div>
       <div id="legenda2" style="padding-left: 15%;"></div>
    </div>
  </div>

   <div class="col s12 m6">
    <div class="card-panel cardteste medium">
        <p class="title">Horas de Carga</p>
        <p class="subtitle">Porcentagem do período de uso em cargas diferentes</p>
        <div class="wrap">
          <div id="placeholder4" class="placeholder"></div>
       </div>
       <div id="legenda4" style="padding-left: 15%;"></div>
    </div>
  </div>

  
  </div>

  <div class="row">

   <div class="col s12 m9">
    <div class="card-panel cardteste medium">
        <p class="title">Temperaturas Máximas</p>
        <p  class="subtitle">Máximas temperaturas já registradas pelo veículo</p>
        <div class="wrap">
          <div id="placeholder5" class="placeholder"></div>
       </div>
       <div id="legenda5" style="padding-left: 5%;"></div>
    </div>
  </div>

  <div class="col s12 m3">
     <div class="card-panel cardteste medium">
        <p class="title">Autonomia</p>
        <p class="subtitle">Ranking da frotas</p>
        <div>
          <ul id="placeholder7" class="collection"></ul>
       </div>
    </div>
  </div>

  
  </div>

  <div class="row"> 
    
    <div class="col s12 m9">
     <div class="card-panel cardteste medium">
        <p class="title">Temperaturas Máximas na Bateria</p>
        <p  class="subtitle">Máximas temperaturas já registradas na Bateria do veículo</p>
        <div class="wrap">
          <div id="placeholder3" class="placeholder"></div>
       </div>
       <div id="legenda3" style="padding-left: 5%;"></div>
    </div>
  </div>

    <div class="col s12 m3">
     <div class="card-panel cardteste medium">
        <p class="title">Vida da Bateria</p>
        <p class="subtitle">Ranking da frotas</p>
        <div>
          <ul id="placeholder6" class="collection"></ul>
       </div>
    </div>
  </div>

  </div>

  <div class="row">

  <div class="col s12 m6">
     <div class="card-panel cardteste medium">
        <p class="title">Indíce de Eficiência</p>
        <p class="subtitle">Ranking da frotas</p>
        <div>
          <ul id="placeholder8" class="collection"></ul>
       </div>
    </div>
  </div>

  <div class="col s12 m3">
    <div class="card-panel cardteste medium">
        <p class="title">Horímetro</p>
        <p  class="subtitle">Porcentagens por veículo</p>
        <div class="wrap">
          <div id="placeholder" class="placeholder"></div>
       </div>
       <div class="legendaPie" style="padding-left: 5%;"></div>
    </div>
  </div>

  <div class="col s12 m3">
    <div class="card-panel cardteste medium">
        <p class="title">Odometro</p>
        <p  class="subtitle">Porcentagens por veículo</p>
        <div class="wrap center">
          <div id="placeholder9" class="placeholder"></div>
       </div>
       <div class="legendaPie" style="padding-left: 5%;"></div>
    </div>
  </div>

  </div>


   <div class="row">




   

  </div>

</div> <!-- fim container -->

 <!-- <div class="pie-container col s6">
    Horimetro
    <div id="placeholder" class="pie-card"></div>
  </div> 

   <div class="pie-container col s6">
    Temperatura Máxima Bateria
    <div id="placeholder2" class="pie-card"></div>
  </div>
  </div>-->

 <!-- <div class="row">
  <div class="pie-container col s6">
    Temperatura Máxima Bateria
    <div id="placeholder3" class="pie-card"></div>
  </div> -->

<!--  <div class="pie-container col s6">
    <div id="containerlegenda"></div>
      <div id="placeholder4" class="pie-card"></div>
    </div>
 -->
 <!-- </div>

  <div class="row"> -->
 <!--  <div class="pie-container col s6">
    <div id="containerlegenda2"></div>
      <div id="placeholder5" class="pie-card"></div>
    </div>
  </div> -->

<!--<div class="row">
   <div class="pie-container col s4">
      Vida da Bateria
      <div class="pie-card">
        <ul  id="placeholder6" class="collection">
        </ul>
      </div>
    </div> -->

<!--    <div class="pie-container col s4">
      Autonomia
      <div class="pie-card">
        <ul  id="placeholder7" class="collection">
        </ul>
      </div>
    </div> -->

<!--    <div class="pie-container col s4">
      Indice Eficiência
      <div class="pie-card">
        <ul  id="placeholder8" class="collection">
        </ul>
      </div>
    </div>
  
  </div>
</div> -->




</body>
</html>
