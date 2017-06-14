<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_register_driver.js"></script>

<style type="text/css">
  
  .input-field input{
    margin-bottom: 5px;
  }  

  .row{
    margin-bottom: 5px;
  }
</style>

<div class="container">
	
  <div class="row center">
    <h5 class="header col s12 light">Cadastro de Motoristas</h5>
  </div>
  <div class="divider"></div>

    <div class="row" style="margin-left: 10%; margin-right: 10%;">
    
    <form class="col s12">

    <div class="row">
        <div class="input-field col s12 m6">
          <input id="first_name" type="text" class="validate">
          <label for="first_name">Nome</label>
        </div>
      
        <div class="input-field col s12 m6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Sobrenome</label>
        </div>
    </div>

    <div class="row">
        <div class="input-field col s12 m6">
          <input id="first_name" type="text" class="validate">
          <label for="first_name">Matricula</label>
        </div>
      
        <div class="input-field col s12 m3">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Idade</label>
        </div>

        <div class="input-field col s12 m3">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Sexo</label>
        </div>
    </div>

    <div class="row">
        <div class="input-field col s12 m3">
          <input id="first_name" type="text" class="validate">
          <label for="first_name">CNH</label>
        </div>
      
        <div class="input-field col s12 m6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Email</label>
        </div>

        <div class="input-field col s12 m3">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Telefone</label>
        </div>
    </div>


      <div class="row">
        <div class="input-field col s12 m6">
          <input id="first_name" type="text" class="validate">
          <label for="first_name">Departamento</label>
        </div>
      
        <div class="input-field col s12 m6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Responsável</label>
        </div>

    </div>
      	
		<div class="row">
        <div class="input-field col s6">
	    <select id="grupo">
	      	<option value="" disabled selected>Selecione</option>
	  	    <option value="1">Matutino</option>
          <option value="2">Vespertino</option>
	    </select>
	    <label>Turno de Trabalho</label>
	  	</div>

	  	<div class="input-field col s6">
	    <select id="nivel">
	      <option value="" disabled selected>Selecione</option>
	      <option value="0">Sim</option>
        <option value="1">Não</option>
	    </select>
	    <label>Permissão Hora Extra</label>
	  	</div>
	  </div>

    </form>
    <button class="btn waves-effect waves-light mobilisblue col s12" id="btnsubmit">Cadastrar</button>
    
   
      <div class="col s12">
        <div class="card-panel mobilisred"  id="emailerror" hidden>
          <span class="white-text">Insira um Email válido.</span>
        </div>
      </div>
  

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