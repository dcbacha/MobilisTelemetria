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

    .btn-flat {
    padding: 0 1rem;
    }

    #delete1{
      display: none;
    }
  
  </style>


<div class="container">

<div class="row center">
    <h5 class="header col s12 light">Diagnóstico</h5>
  </div> <!-- end row -->
  <div class="divider"></div>



<div id="formulario">

          
<div class="row" id='card1'>
      <div class="col s12 m12">
        <div class="card-panel white">
          <a class='btn-flat delete' id='delete1' hidden>
          <i class='material-icons'>delete</i>
          </a>
	
	<div class="row">
		<div class="input-field col s4">
			<select id="dinamicSelect1">
			    <option value="" disabled selected></option>
			</select>
			<label>Selecione o Veículo</label>
		</div>

    <div class="input-field col s8" id='idselect1'>
    <select multiple id='select1'>
      <optgroup label="Problema Elétrico" id='el-1'>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </optgroup>
      <optgroup label="Problema Mecânico" id='mec-1'>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </optgroup>
       <optgroup label="Outros" id='other-1'>
        <option value="outros">Outros</option>
      </optgroup>
    </select>
    <label>Problema</label>
    </div>

    <div class="input-field col s4" id='idother1' hidden>
          <input placeholder="Qual outro tipo de problema?" id="first_name1" type="text" class="validate">
          <label for="first_name1">Outro</label>
    </div>
  
  </div>  <!-- end row -->

    <div class="row">
      
   <!--   <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <textarea id="textarea1" placeholder="Se possivel, descreva brevemente o problema"  class="materialize-textarea"></textarea>
          <label for="textarea1">Descrição do problema</label>
        </div>
      </div>
    </form> -->

  <!--  <div class="input-field col s12">
          <input id="descricao1" type="text" class="validate">
          <label for="descricao1">Descrição do Problema</label>
        </div> -->

         <div class='col s12'>
          Descricao do Problema:
          <div class='input-field inline col s12'>
            <input id='descricao1' type='text'>
          </div>
        </div>
    
    </div>
 

  </div>
  </div>
  </div>

</div> <!-- fim formulario -->
     
    <div class="col s2 right" style="margin-top: 1.5rem">
        <button class="btn waves-effect waves-light mobilisblue" id="btnsolicitar">Solicitar</button>
    </div>

    <div class="col s2 right" style="margin-top: 1.5rem">
        <button class="btn waves-effect waves-light mobilisred" id="btnadicionar">Adicionar</button>
    </div>

 <!--       <div class="preloader-wrapper small active"  style="margin-top: 1.5rem">
        <div class="spinner-layer spinner-blue-only"  id="loading" hidden>
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
    </div> -->


</div><!-- end container -->


     
   





</body>
</html>