<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_edit.js"></script>

<div class="container">
  <div class="row center">
          <h5 class="header col s12 light">Editar</h5>
  </div>
  <div class="divider"></div>
     


  <div class="row">
      

  </div> <!-- row -->

  <div class="row">
      <div class="input-field col s6">
      <input value="" id="name" type="text" class="validate">
      <label class="active" for="name">Nome</label>
      </div>

      <div class="input-field col s6">
      <input value="" id="lastname" type="text" class="validate">
      <label class="active" for="lastname">Sobrenome</label>
      </div>
  </div>

  <div class="row">
      <div class="input-field col s12">
      <input value="" id="email_edit" type="text" class="validate">
      <label class="active" for="email_edit">Email</label>
      </div>

      
  </div>

  <div class="row">
    <div class="input-field col s6">
      <input value="" id="username" type="text" class="validate">
      <label class="active" for="username">Username</label>
      </div>

      <div class="input-field col s6">
      <select id="nivel">
        <option value="-1" disabled selected>Selecione</option>
        <option value="0">Nível 0</option>
        <option value="1">Nível 1</option>
        <option value="2">Nível 2</option>
      </select>
      <label>Nível de Acesso</label>
      </div>

  </div>

  <div class="row">
      <input type="checkbox" class="filled-in" id="checksenha" />
      <label for="checksenha">Alterar Senha</label>
  </div>
<div id="senhacontainer" hidden>
  <div class="row">
    <div class="input-field col s6">
    <input id="senhaatual" type="password" class="validate">
    <label class="active" for="senhaatual">Senha atual</label>
    </div>

  </div>

   <div class="row">
    <div class="input-field col s6">
    <input id="novasenha" type="password" class="validate">
    <label class="active" for="novasenha">Nova Senha</label>
    </div>

  </div>

   <div class="row">
    <div class="input-field col s6">
    <input id="novasenha2" type="password" class="validate">
    <label class="active" for="novasenha2">Repetir Nova Senha</label>
    </div>

  </div>

</div> <!--senha -->

<div class="row">
  <div class="col s6 center">
  <a class="waves-effect waves-light btn mobilisblue" style="width: 180px" id="envia">Enviar</a>
  </div>

  <div class="col s6 center">
  <a class="waves-effect waves-light btn mobilisred" style="width: 180px" id="voltar">Voltar</a>
  </div>

</div>

      <div class="col s12">
        <div class="card-panel green"  id="success" hidden>
          <span>Usuario atualizado com sucesso</span>
        </div>
      </div>

       <div class="col s12">
        <div class="card-panel mobilisred"  id="errodados" hidden>
          <span>Preencha os dados corretamente</span>
        </div>
      </div>

       <div class="col s12">
        <div class="card-panel mobilisred"  id="errosenha" hidden>
          <span>Senha atual inválida</span>
        </div>
      </div>

       <div class="col s12">
        <div class="card-panel yellow"  id="erromisc" hidden>
          <span>Algo deu errado :(</span>
        </div>
      </div>

    
</div> <!-- container -->


  </body>
</html>