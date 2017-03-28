<?php
/*  API de acesso do carro
Inэcio das rotinas de redirecionamento da API
-Para acesso do carro:
--/car/update/events
--/car/update/metrics
--/car/download/update
--/car/update/engineering
*/

/*  Rotina para receber dados de eventos do carro
Recebe um JSON com todos os eventos ainda nуo sincronizados do veэculo e retorna
um JSON com o resultado da operaчуo.

*/
$app->get("/car/update/events", function ($request, $response, $arguments) {
       $numserie = $this->get('jwt')->idcarro; 
              
           
       return $response->write("0"); 
});


?>