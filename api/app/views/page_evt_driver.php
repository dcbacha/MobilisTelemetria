<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_evt_driver.js"></script>

  <style type="text/css">
    
    .btn-flat {
      padding: 0 1rem;
    }

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
    <h5 class="header col s12 light">Usuários</h5>
    <a class="btn-floating smallround  tooltipped hide-on-small-only" data-position='bottom' data-delay='500' data-tooltip='Log de Eventos dos usuários' id="info">
      <i class='material-icons valign-wrapper'>info_outline</i>
    </a>
  </div>
  <div class="divider"></div>
   
   <!-- gif loading  -->
  <div class="row center">
    <div class="preloader-wrapper small" id="loadingUsers">
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
  </div>

  <div class="row">
    <div id="MotoristaDinamico" class="col s12 m11">
    </div>
    
    <div class="col m1 hide-on-small-only " id='scrollSpyId'>
      <div class="toc-wrapper pinned" >
        <ul class="section table-of-contents" id='tablescrollspy'>
        </ul>
      </div>
    </div>

  </div>

  
</div> <!-- container -->

</body>
</html>