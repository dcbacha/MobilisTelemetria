<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
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
    <a class="btn-floating right smallround  tooltipped hide-on-small-only" data-position='bottom' data-delay='500' data-tooltip='Informe os problemas que você está tendo com o veículo e retornamos um diagnóstico assim que possivel' id="info">
          <i class='material-icons valign-wrapper'>info_outline</i>
        </a>
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
    <select id='problem1'>
        <option value="" disabled selected></option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="outros">Outros</option>
    </select>
    <label>Problema</label>
    </div>

    <div class="input-field col s4" id='idother1' hidden>
          <input placeholder="Qual outro tipo de problema?" id="outro1" type="text" class="validate">
          <label for="outro1">Outro</label>
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
    <div class="row">
        <div class="col s12">
        <div class="card-panel red"  id="errodados" hidden>
          <span>Preencha os dados corretamente</span>
        </div>
        </div>

        <div class="col s12">
        <div class="card-panel green"  id="success" hidden>
          <span>Solicitação enviada com sucesso</span>
        </div>
        </div>

         <div class="col s12">
        <div class="card-panel yellow"  id="erromail" hidden>
          <span>Algo deu errado, favor entrar em contato com suporte@mobilis.me</span>
        </div>
        </div>

    </div>

 <!--   <div class="col s2 right" style="margin-top: 1.5rem">
        <button class="btn waves-effect waves-light mobilisred" id="btnadicionar">Adicionar</button>
    </div> -->

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


</div><!-- end container -->


     
   





</body>
</html>