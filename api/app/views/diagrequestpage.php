<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_diag_request.js"></script>


<div class="container">

	<div class="rowr">
		<h5 class="header col s12 light">Pedido de Diagnóstico</h5>
	</div> <!-- end row -->

	<div class="row">
		<div class="input-field col s4">
			<select multiple id="dinamicSelect">
			    <option value="" disabled selected></option>
			</select>
			<label>Escolha o Carro</label>
		</div>
		
		<div class="col s2" style="margin-top: 1.5rem">
     		<button class="btn waves-effect waves-light mobilisblue" id="btnsolicitar">Solicitar</button>
      	</div>



    </div>  <!-- end row -->


</div><!-- end container -->

</body>
</html>