<?php //require ("navbars.php");
?>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/commonfunctions.js"></script>
  <script src="js/main_faq.js"></script>
  <style type="text/css">
  	
    .faq-questions{
      border-right: 0px;
      border-left: 0px;
    }

  
  </style>


<div class="container faq">

<div class="row center">
    <h5 class="header col s12 light">FAQ</h5>
    <a class="btn-floating right smallround  tooltipped" data-position='bottom' data-delay='500' data-tooltip='Perguntas mais frequentes reposndidas' id="info">
          <i class='material-icons valign-wrapper'>info_outline</i>
        </a>
</div> <!-- end row -->


<div class='row'>
  <ul class="collapsible z-depth-0 faq-questions" data-collapsible="expandable">
    <li>
      <div class="collapsible-header"><i class="material-icons">arrow_drop_down</i>
        Primeira perguta
      </div>
      <div class="collapsible-body"><span>Resposta</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">arrow_drop_down</i>
        Segunda pergunta
      </div>
      <div class="collapsible-body">
        <span>
          Resposta
        </span>
      </div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">arrow_drop_down</i>
        Terceira
      </div>
      <div class="collapsible-body">
        <span>
          Resposta
        </span>
      </div>
    </li>
  </ul>
</div>

<p>
  Não encontrou respostas que estava procurando? Entre em contato conosco <a href='#!' id='contato'>aqui</a>
</p>




</div><!-- end container -->


     
   





</body>
</html>