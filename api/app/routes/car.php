<?php
/*  API de acesso do carro
In�cio das rotinas de redirecionamento da API
-Para acesso do carro:
--/car/update/events
--/car/update/metrics
--/car/download/update
--/car/update/engineering
*/

/*  Rotina para receber dados de eventos do carro
Recebe um JSON com todos os eventos ainda n�o sincronizados do ve�culo e retorna
um JSON com o resultado da opera��o.

*/
$app->get("/car/update/events", function ($request, $response, $arguments) {
       $numserie = $this->get('jwt')->idcarro; 
              
           
       return $response->write("0"); 
});


?>