<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_edit_driver.js"></script>


<div class="container">
  <div class="row center">
          <h5 class="header col s12 light">Editar Veículo</h5>
  </div>
  <div class="divider"></div>
     


  <div class="row">
      

  </div> <!-- row -->

<div class="row">
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
          <input id="matricula" type="text" class="validate">
          <label for="matricula">Matricula</label>
        </div>
      
        <div class="input-field col s12 m3">
          <input id="idade" type="text" class="validate">
          <label for="idade">Idade</label>
        </div>

        <div class="input-field col s12 m3">
          <select id="sexo">
            <option value="" disabled selected>Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
          <label>Sexo</label>
        </div>
    </div>

    <div class="row">
        <div class="input-field col s12 m3">
          <input id="cnh" type="text" class="validate">
          <label for="cnh">CNH</label>
        </div>
      
        <div class="input-field col s12 m6">
          <input id="cad_email" type="email" class="validate">
          <label for="cad_email">Email</label>
        </div>

        <div class="input-field col s12 m3">
          <input id="telefone" type="number" class="validate">
          <label for="telefone">Telefone</label>
        </div>
    </div>


      <div class="row">
        <div class="input-field col s12 m6">
          <input id="departamento" type="text" class="validate">
          <label for="departamento">Departamento</label>
        </div>
      
        <div class="input-field col s12 m6">
           <select id="responsavel">
              <option value="" disabled selected>Selecione</option>
           </select>
           <label>Responsável</label>
        </div>

    </div>
        
    <div class="row">
        <div class="input-field col s6">
      <select id="turno">
          <option value="" disabled selected>Selecione</option>
          <option value="Matutino">Matutino</option>
          <option value="Vespertino">Vespertino</option>
      </select>
      <label>Turno de Trabalho</label>
      </div>

      <div class="input-field col s6">
      <select id="permhoraextra">
        <option value="" disabled selected>Selecione</option>
        <option value="S">Sim</option>
        <option value="N">Não</option>
      </select>
      <label>Permissão Hora Extra</label>
      </div>
    </div>



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