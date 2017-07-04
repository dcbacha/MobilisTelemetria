<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_edit_car.js"></script>


<div class="container">
  <div class="row center">
          <h5 class="header col s12 light">Editar Veículo</h5>
  </div>
  <div class="divider"></div>
     


  <div class="row">
      

  </div> <!-- row -->

<div class="row">
          <div class="input-field col s12 m6">
            <input id="num_serie" type="number" class="validate" disabled>
            <label for="num_serie">Numero de Série</label>
          </div>
        
          <div class="input-field col s12 m6">
            <input id="chave_acesso" type="number" class="validate" disabled>
            <label for="chave_acesso">Chave de Acesso</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12 m8">
         <!--   <input id="responsavel" type="text" class="validate">
            <label for="responsavel">Responsável</label> -->
             <select id="responsavel">
                  <option value="" disabled selected>Selecione</option>
              </select>
              <label>Responsável</label>
          </div>
          
            <div class="input-field col s12 m4">
              <select id="grupo">
                  <option value="" disabled selected>Selecione</option>
                  <option value="1">Grupo 1</option>
                  <option value="2">Grupo 2</option>
              </select>
              <label>Grupo</label>
              </div>
        </div>

          <div class="row">
          <div class="input-field col s12 m3">
            <input id="num_serie" type="text" class="validate">
            <label for="num_serie">Data de Entrada</label>
          </div>
        
          <div class="input-field col s12 m3">
            <input id="chave_acesso" type="number" class="validate">
            <label for="chave_acesso">Km Inicial</label>
          </div>

          <div class="input-field col s12 m3">
            <input id="num_serie" type="number" class="validate">
            <label for="num_serie">Ano</label>
          </div>
        
          <div class="input-field col s12 m3">
            <input id="chave_acesso" type="number" class="validate">
            <label for="chave_acesso">Modelo</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12 m4">
            <input id="num_serie" type="text" class="validate">
            <label for="num_serie">Versão</label>
          </div>
        
          <div class="input-field col s12 m8">
            <input id="chave_acesso" type="text" class="validate">
            <label for="chave_acesso">Acessórios</label>
          </div>
          </div>
          <div class="row">
          <div class="input-field col s12 m6">
            <input id="num_serie" type="number" class="validate">
            <label for="num_serie"># Patrimonio Empresa</label>
          </div>
        
          <div class="input-field col s12 m6">
            <input id="chave_acesso" type="text" class="validate">
            <label for="chave_acesso">cor</label>
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