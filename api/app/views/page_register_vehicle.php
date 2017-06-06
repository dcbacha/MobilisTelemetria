<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_register_vehicle.js"></script>


<div class="container">
	
  <div class="row center">
    <h5 class="header col s12 light">Cadastro de Veículos</h5>
  </div>
  <div class="divider"></div>

    <div class="row" style="margin-left: 10%; margin-right: 10%;">
    
    <form class="col s12">

      	<div class="row">
        <div class="input-field col s12">
          <input id="num_serie" type="number" class="validate">
          <label for="num_serie">Numero de Série</label>
        </div>
       	</div>

       
	
		    <div class="row">
       	<div class="input-field col s12">
          <input id="chave_acesso" type="number" class="validate">
          <label for="chave_acesso">Chave de Acesso</label>
        </div>
        </div>

        <div class="row">
        <div class="input-field col s8">
          <input id="responsavel" type="text" class="validate">
          <label for="responsavel">Responsável</label>
        </div>
        
          <div class="input-field col s4">
            <select id="grupo">
                <option value="" disabled selected>Selecione</option>
                <option value="1">Grupo 1</option>
                <option value="2">Grupo 2</option>
            </select>
            <label>Grupo</label>
            </div>

        </div>

    </form>
    <button class="btn waves-effect waves-light mobilisblue col s12" id="btnsubmit">Cadastrar</button>

    <div class="col s12">
        <div class="card-panel mobilisred"  id="dataerror" hidden>
          <span class="white-text">Preencha todos os dados.</span>
        </div>
    </div>

    <div class="col s12">
        <div class="card-panel green"  id="sucesso" hidden>
          <span>Cadastro feito com sucesso.</span>
        </div>
    </div>

     <div class="col s12">
        <div class="card-panel yellow"  id="outroerro" hidden>
          <span>Algo deu errado :(</span>
        </div>
      </div>


</div>


</body>
</html>