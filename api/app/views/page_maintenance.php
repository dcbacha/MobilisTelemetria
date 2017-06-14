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

<script src="js/main_maintenance.js"></script>

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




</style>

<!--<body class="mobilislightblue"> -->
<div class="container">

  <div class="row">


    <div class="input-field col s3">
    <select multiple id="filtro">
      <option value="" disabled>Choose your option</option>
      <option value="1" selected>Ranking Usuários</option>
      <option value="2" selected>Horas de Carga</option>
      <option value="3" selected>Estado de Saúde</option>
      <option value="4" selected>Indice de Eficiência</option>
      <option value="5" selected>Autonomia</option>
      <option value="6" selected>Horimetro</option>
      <option value="7" selected>Odometro</option>
    </select>
  </div>

        <h5 class="header col s9 light">Manutenção</h5>
        <a class="btn-floating right smallround  tooltipped" data-position='bottom' data-delay='500' data-tooltip='Aqui vão as informações semanais da frota, assim como indica cuidados' id="info">
          <i class='material-icons valign-wrapper'>info_outline</i>
        </a>
        <a class="btn-floating right smallround" id="reload">
          <i class='material-icons valign-wrapper'>loop</i>
        </a>
  </div>
  <div class="divider"></div>

        


<div class="row">

<div class="col s12 m3" id='card-rankuser'>
    <div class="card-panel cardteste big">
        <p class="title">Ranking Usuarios</p>
        <p class="subtitle">De acordo com numero de falhas cometidas</p>
        <div>
          <ul id="user-rank" class="collection" hidden></ul>
       </div>
    </div>
</div>



<div class="col s12 m6" id='card-horascarga'>
    <div class="card-panel cardteste big">
        <p class="title">Horas de Carga</p>
        <p class="subtitle">Porcentagem do período de uso em cargas diferentes</p>
        <div class="wrap">
          <div id="placeholder-carga" class="placeholder"></div>
       </div>
       <div id="legendahorascarga" style="padding-left: 15%;"></div>
    </div>
  </div>


  <div class="col s12 m3" id='card-autonomia'>
     <div class="card-panel cardteste big">
        <p class="title">Autonomia</p>
        <p class="subtitle">Ranking da frotas</p>
        <div>
          <ul id="placeholder-autrank" class="collection" hidden></ul>
       </div>
    </div>
  </div>


<div class="col s3 m3" id='card-soh' >
    <div class="card-panel cardteste medium">
      <div class="row">
        <p class="title col s8">State of Health</p>
        
        <a class="btn-flat smalldrop dropdown-button subtitle" data-activates="dropdown1" id='btnDropdown1'>  Média
        </a>
      </div>
        
        <div class="wrap">
          <div id="placeholder-soh" class="placeholder"></div>
       </div>
       <div class="legendaMedia"></div>
    </div>
  </div>

 
   <div class="col s3 m3" id='card-efi' >
    <div class="card-panel cardteste medium">
      <div class="row">
        <p class="title col s8">Indice de Eficiência</p>
        
        <a class="btn-flat smalldrop dropdown-button subtitle" data-activates="dropdown2" id='btnDropdown2'>Média</a>
        </div>
        
        <div class="wrap">
          <div id="placeholder-efi" class="placeholder"></div>
       </div>
       <div class="legendaMedia"></div>
    </div>
  </div>



 



  <div class="col s12 m3" id='card-horimetro'>
    <div class="card-panel cardteste medium">
        <p class="title">Horímetro</p>
        <div class="wrap">
          <div id="placeholder" class="placeholder"></div>
       </div>
       <div class="legendaPie" style="padding-left: 5%;"></div>
    </div>
  </div>

  <div class="col s12 m3" id='card-odometro'>
    <div class="card-panel cardteste medium">
        <p class="title">Odometro</p>
        <div class="wrap center">
          <div id="placeholder9" class="placeholder"></div>
       </div>
       <div class="legendaPie" style="padding-left: 5%;"></div>
    </div>
  </div>

<!--  <div class="col s12 m3">
     <div class="card-panel cardteste medium">
        <p class="title">Vida da Bateria</p>
        <p class="subtitle">Ranking da frotas</p>
        <div>
          <ul id="placeholder-sohrank" class="collection"></ul>
       </div>
    </div>
  </div>

  <div class="col s12 m6">
     <div class="card-panel cardteste medium">
        <p class="title">Indíce de Eficiência</p>
        <p class="subtitle">Ranking da frotas</p>
        <div>
          <ul id="placeholder-efirank" class="collection"></ul>
       </div>
    </div>
  </div>  
-->

</div>


</div> <!-- fim container -->



</body>
</html>


<!--DropDowns -->
<ul id="dropdown1" class="dropdown-content subtitle drop">
  <li><a href="#!">média</a></li>

</ul>

<ul id="dropdown2" class="dropdown-content subtitle drop" >
  <li><a href="#!">média</a></li>

</ul>