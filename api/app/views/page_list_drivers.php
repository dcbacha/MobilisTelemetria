<?php
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_list_drivers.js"></script>

<style type="text/css">
  
  .row{
    margin-bottom: 0px;
  }

  .btn-flat {
    padding: 0 1rem;
  }

  td{
  	padding: 5px;
  }

</style>

<div class="container">
	
	<div class="row center">
    	<h5 class="header col s12 light">Motoristas Cadastrados</h5>
  	</div>
  	<div class="divider"></div>

  	<table class='striped' id='users'>
  		<thead>
  			<th>Nome</th>
  			<th>Sobrenome</th>
  			<th>Nº Matr.</th>
  			<th>Idade</th>
  			<th>Sexo</th>
        <th>CNH</th>
        <th>Email</th>
        <th>Telefone</th>
        <th>Depart.</th>
        <th>Responsável</th>
        <th>Turno</th>
        <th>Perm. HE</th>
        <th></th>
  		</thead>
  		<tbody>
  			
  		</tbody>
  	</table>

  	<div class="fixed-action-btn">
    	<a class="btn-floating btn-large mobilisblue" id='add'>
      		<i class="large material-icons">add</i>
    	</a>
    </div>

</div>