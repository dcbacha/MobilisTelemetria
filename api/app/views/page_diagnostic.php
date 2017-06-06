<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="../vendor/flot/jquery.flot.js"></script>
  <script src="../vendor/flot/jquery.flot.selection.js"></script>
  <script src="../vendor/flot/jquery.flot.navigate.js""></script>
  <script src="../vendor/flot/jquery.flot.resize.js""></script>
  <script src="js/main_diagnostic.js"></script>
  <style type="text/css">
  	
  	.painel{
  		visibility: hidden;
  	}
  
  </style>


<div class="container">

	<div class="row center">
		<h5 class="header col s12 light">Diagnóstico</h5>
	</div> <!-- end row -->
	<div class="divider"></div>

	<div class="row">
		<div class="input-field col s4">
			<select multiple id="dinamicSelect">
			    <option value="" disabled selected></option>
			</select>
			<label>Selecione o Veículo</label>
		</div>
		
		<div class="col s2" style="margin-top: 1.5rem">
     		<button class="btn waves-effect waves-light mobilisblue" id="btnsolicitar">Solicitar</button>
      	</div>

      	<div class="preloader-wrapper small active"  style="margin-top: 1.5rem">
		    <div class="spinner-layer spinner-blue-only"  id="loading" hidden>
		      <div class="circle-clipper left">
		        <div class="circle"></div>
		      </div><div class="gap-patch">
		        <div class="circle"></div>
		      </div><div class="circle-clipper right">
		        <div class="circle"></div>
		      </div>
		    </div>
		</div>


    </div>  <!-- end row -->


</div><!-- end container -->

<!--/////////////////////////////////////////////////////////////////////////////////// -->
<!--/////////////////////////////////////////////////////////////////////////////////// -->
<!--/////////////////////////////////////////////////////////////////////////////////// -->

  <!--[if lte IE 8]><script language="javascript" type="text/javascript" src="../vendor/flot/excanvas.min.js"></script><![endif]-->
<div class="painel">

<!--////////////////////////////////////////////////////// -->
<div class="divider"></div>
    	

  <div class="container">
    <h5>Velocidade X Tempo</h5>
    <div class="demo-container">
      <div id="placeholder_vel" class="demo-placeholder navigate"></div>
    </div>
    <div class="demo-container" style="height:150px;">
      <div id="overview_vel" class="demo-placeholder"></div>
    </div>
      <table id="table_vel" class="plot_values"></table>
  </div>


<!--/////////////////////////////////////////////////////////////////////////////////// -->
<div class="divider"></div>

  <div class="container">
    <h5>Tensão e Corrente x Tempo</h5>
    <div class="demo-container">
      <div id="placeholder_choices2" class="demo-placeholder"></div>
      <p id="choices2"></p>
    </div>
    <div class="demo-container" style="height:150px;">
      <div id="overview_choices2" class="demo-placeholder overview"></div>
    </div>
    <table id="table_corrente" class="plot_values"></table>
  </div>

<!--/////////////////////////////////////////////////////////////////////////////////// -->
<div class="divider"></div>

  <div class="container">
    <h5>Acelerador e Freio x Tempo</h5>
    <div class="demo-container">
      <div id="placeholder_choices1" class="demo-placeholder"></div>
      <div id="choices1"></div>
    </div>
    <div class="demo-container" style="height:150px;">
      <div id="overview_choices1" class="demo-placeholder overview"></div>
    </div>
    <p id="params_acel" ></p>
    <table id="table_acel" class="plot_values"></table>
  </div>

<!--/////////////////////////////////////////////////////////////////////////////////// -->
<div class="divider"></div>

  <div class="container">
    <h5>Torque X Tempo</h5>
    <div class="demo-container">
      <div id="placeholder_torque" class="demo-placeholder navigate"></div>
    </div>
    <div class="demo-container" style="height:150px;">
      <div id="overview_torque" class="demo-placeholder"></div>
    </div>		
    <h5>Torque X Rotação</h5>
    <div class="demo-container">
      <div id="placeholder_torque_rotacao" class="demo-placeholder navigate"></div>
    </div>   
    <table id="table_torque" class="plot_values"></table>
  </div>



<!--/////////////////////////////////////////////////////////////////////////////////// -->
<div class="divider"></div>

  <div class="container">
    <div class="row">
      <h5>Potencia e Rotação X Tempo</h5>
      <div class="demo-container">
        <div id="placeholder_pot_tempo" class="demo-placeholder"></div>
        <p id="choices3"></p>
      </div>
      <div class="demo-container" style="height:150px;">
        <div id="overview_choices3" class="demo-placeholder overview"></div>
      </div>
    </div>
    <div class="row">
      <h5>Potencia X Rotacao</h5>
      <div class="demo-container">
        <div id="placeholder_pot_rotacao" class="demo-placeholder navigate"></div>
      </div>
      <table id="table_potencia" class="plot_values"></table>
    </div>
  </div>

<!--/////////////////////////////////////////////////////////////////////////////////// -->
<div class="divider"></div>

  <div class="container">
    <h5>Todos x Tempo</h5>
    <div class="demo-container">
      <div id="placeholder_all" class="demo-placeholder"></div>
    <p id="choices_all"></p>
    </div>
    <div class="demo-container" style="height:150px;">
      <div id="overview_all" class="demo-placeholder overview"></div>
    </div>
    <table id="table_all" class="plot_values"></table>
  </div>

<!--/////////////////////////////////////////////////////////////////////////////////// -->
<div class="divider"></div>
    
  <div class="container">

    <div class="row">
            
      <select class="browser-default col s3" style="margin-top: 1.5rem" id="eixo-y">
        <option value="" disabled selected>Eixo Y</option>
        <option value="tempo">Tempo</option>
        <option value="vel">Velocidade</option>
        <option value="acel">Acelerador</option>
        <option value="freio">Freio</option>
        <option value="torque">Torque</option>
        <option value="rotacao">Rotação</option>
        <option value="tensao_bat">Tensão Bateria</option>
        <option value="tensao_motor">Tensão Motor</option>
        <option value="corrente_pack">Corrente Pack</option>
        <option value="corrente_motor">Corrente Motor</option>
        <option value="potencia">Potência</option>
      </select>
        
      <div class="col s1" style="margin-top: 20px"><h5>X</h5></div>
              
      <select class="browser-default col s3" style="margin-top: 1.5rem" id="eixo-x">
        <option value="" disabled selected>Eixo X</option>
        <option value="tempo">Tempo</option>
        <option value="vel">Velocidade</option>
        <option value="acel">Acelerador</option>
        <option value="freio">Freio</option>
        <option value="torque">Torque</option>
        <option value="rotacao">Rotação</option>
        <option value="tensao_bat">Tensão Bateria</option>
        <option value="tensao_motor">Tensão Motor</option>
        <option value="corrente_pack">Corrente Pack</option>
        <option value="corrente_motor">Corrente Motor</option>
        <option value="potencia">Potência</option>
      </select>

      <div class="col s2" style="margin-top: 1.8rem">
        <button class="btn waves-effect waves-light mobilisblue" id="btnplot">Plotar</button>
      </div>

    </div>
              
    <div class="row">      
      <div class="demo-container">
        <div id="placeholder_misc" class="demo-placeholder navigate"></div>
      </div>
    </div>

    <div class="demo-container" style="height:150px;">
      <div id="overview_misc" class="demo-placeholder overview"></div>
    </div>
  
  </div>
     
</div> <!-- fim painel -->
<!--/////////////////////////////////////////////////////////////////////////////////// -->
<!--/////////////////////////////////////////////////////////////////////////////////// -->
<!--/////////////////////////////////////////////////////////////////////////////////// -->
     
   





</body>
</html>