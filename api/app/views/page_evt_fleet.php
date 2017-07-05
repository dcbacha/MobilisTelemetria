<?php
?>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/materialize.js"></script>
<script src="js/commonfunctions.js"></script>
<script src="js/main_evt_fleet.js"></script>

<style type="text/css">
   
  .collapsible-body{
    border-top: 0;
  }
  .collapsible-header.active{
    border-bottom: 0;
  }

  .row {
    margin-bottom: 0px;
  }
    
</style>

<div class="container">

  <div class="row center">
    <h5 class="header col s12 light">Resumo da frota</h5>
    <a class="btn-floating smallround tooltipped hide-on-small-only" data-position='bottom' data-delay='500' data-tooltip='Log de Eventos dos veículos' id="info">
      <i class='material-icons valign-wrapper'>info_outline</i>
    </a>
  </div>

  <div class="divider"></div>
      
  <div class="row center"> 

    <!-- gif loading tabela -->
    <div class="preloader-wrapper small" id="loadingFrota">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>

    <table class="bordered" id="tabelaDinamica" hidden>
      <thead>
        <tr>
          <th></th>
          <th>Carro</th>
          <th>Número de série</th>
          <th>Total de Km</th>
          <th>Total de Horas</th>
          <th></th>
        </tr>
      </thead>
      <tbody style="background-color: white">
      </tbody>
    </table>   
  </div>
  

</div> <!-- fim container tabela -->

<!--*****************************************************************-->
<div class="container"> <!-- container infos -->
  <div class="section">
    <div class="row">
        
      <div class="col s12 m4" id='section-economy'> <!-- economia -->
        <div class="icon-block">
          <h2 class="center yellow-text"><i class="small material-icons">flash_on</i></h2>
          <h5 class="center">Economia</h5>
          <div class="divider"></div>
          <p class="light" id='economy'>Frase motivacional para usuário ver que carro elétrico é melhor.
        </div>
      </div> <!-- fim economia -->

      <div class="col s12 m4" id='section-group'> <!-- comunidade -->
        <div class="icon-block">
          <h2 class="center light-blue-text"><i class="small material-icons">group</i></h2>
          <h5 class="center">Comunidade</h5>
          <div class="divider"></div>
          <p class="light" id="tabelaComunidade" hidden>
        </div>
      </div> <!-- fim comunidade  -->

      <div class="col s12 m4" id='section-warning'> <!-- alertas -->
        <div class="icon-block">
          <h2 class="center red-text"><i class="small material-icons">report_problem</i></h2>
          <h5 class="center">Alerta</h5>
          <div class="divider"></div>
            <p class="light" id='warning' hidden>  
        </div>
      </div> <!-- fim alertas-->

      <div class="col s4" id='section-congrats' hidden> <!-- congrats -->
        <div class="icon-block">
          <h2 class="center blue-text"><i class="small material-icons">thumb_up</i></h2>
          <h5 class="center">Parabéns</h5>
          <div class="divider"></div>
          <p class="light" id='economy'>Sem erros registrados.
        </div>
      </div> <!-- fim congrats -->

    </div> <!-- fim row -->
  </div> <!-- fim section -->
</div> <!-- fim container infos -->


</body>
</html>
