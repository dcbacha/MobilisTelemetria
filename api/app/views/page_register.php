<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_register.js"></script>


<div class="container">
	
  <div class="row center">
    <h5 class="header col s12 light">Cadastro</h5>
  </div>
  <div class="divider"></div>

    <div class="row" style="margin-left: 10%; margin-right: 10%;">
    
    <form class="col s12">

      	<div class="row">
        <div class="input-field col s12">
          <input id="first_name" type="text" class="validate">
          <label for="first_name">Nome</label>
        </div>
       	</div>

       	<div class="row">
        <div class="input-field col s12">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Sobrenome</label>
        </div>
      	</div>
	
		<div class="row">
       	<div class="input-field col s12">
          <input id="user_name" type="text" class="validate">
          <label for="user_name">Nome de usuário</label>
        </div>
        </div>
    
      	<div class="row">
        <div class="input-field col s12">
          <input id="cad_email" type="email" class="validate">
          <label for="cad_email">Email</label>
        </div>
        </div>
     
       	<div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Senha</label>
        </div>
        </div>
      	
		<div class="row">
        <div class="input-field col s6">
	    <select id="grupo">
	      	<option value="" disabled selected>Selecione</option>
	  	    <option value="1">Grupo 1</option>
          <option value="2">Grupo 2</option>
	    </select>
	    <label>Grupo</label>
	  	</div>

	  	<div class="input-field col s6">
	    <select id="nivel">
	      <option value="" disabled selected>Selecione</option>
	      <option value="0">Nível 0</option>
        <option value="1">Nível 1</option>
	      <option value="2">Nível 2</option>
	    </select>
	    <label>Nível de Acesso</label>
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