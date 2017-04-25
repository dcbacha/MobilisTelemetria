
$(function(){
	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('?'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};

	var token = getUrlParameter('token');

	console.log(token);



	$.ajax({
		type: "POST",
		url: "http://192.168.0.35/rds/api/carros/readdata",
		contentType: "application/json",
		dataType: 'json',
		data: {
		  alt: 'json-in-script'
		},
		headers: {
		  'Authorization': 'Bearer ' + token
		},
		error: function(data) {
			console.log("session time out");

			 var url = "?error=timeout";

         //   document.location = "http://localhost/rds/api/app/iniciate.html"+url;
		//	console.log(data);
		},
		success: function(data, status) {
			console.log(data);

			///////////////// grupo ////////////////////
			var num_users = data[0].grupo.length;
			//console.log(num_users);

			
		 /* 	for(let x=0; x < num_users ; x++){

		  		var lista =[];

		 		var user = data[0].grupo[x].nome;
		  		//console.log(user);
		  		var id = data[0].grupo[x].id;

				var corpo_tabela = "<div class='card drivercard hoverable'>"+
								        "<div class='card-content'>"+
								            "<span class='card-title'>"+user+"</span>"+
								            "<ul class='collapsible hover' data-collapsible='accordion' hidden>";
				$("#MotoristaDinamico").append(corpo_tabela);

				/////////////////// carros //////////////////*/



				var num_carros = data[0].carros.length;
				//console.log(num_carros);

			  	for(let y=0; y < num_carros ; y++){

			  		var num_evt = data[0].carros[y].evt.length;

			  		var lista =[];

			 		var id_carro = data[0].carros[y].idcarro;
			  		//console.log(id_carro);

			  		for(let z=0; z < num_evt; z++){
			  			var idmotorista = data[0].carros[y].evt[z].idmotorista;
						console.log("id do motora: "+idmotorista);

			  		}

			  		//var num_evt = data[0].carros[x].evt.length;
			  		//console.log("num eventos: "+num_evt);

					// var corpo_tabela = "<tr class='hoverable'>"+
						//	"<ul class='collapsible popout' data-collapsible='accordion'>";


			  		/////////////// eventos ///////////////
			  	/*	for(let z=0; z < num_evt; z++){

			  			var nome_evt = data[0].carros[y].evt[z].evento;
			  			var dados = data[0].carros[y].evt[z].dados;
			  			
			  			var time_evt = data[0].carros[y].evt[z].time_evt;

			  			var data_evt = dateconvert(time_evt);
			  			var horario_evt = timeconvert(time_evt)

			  			var time_rcv = data[0].carros[y].evt[z].time_rcv;

			  			var data_rcv = dateconvert(time_rcv);
			  			var horario_rcv = timeconvert(time_rcv);
			  		
			  			lista[y] = "<li>"+
										"</span>"+
										"</div>"+
									"</li>";
						//console.log(lista);
		
			  		} /////fim for eventos*/

						
				//	console.log(lista.length);

				//	var tabela_total = corpo_tabela + lista.join("");
				//	console.log(tabela_total);

					//$("#tabelaDinamica tbody").append(tabela_total);
					


				} /// fim for carros
											
				
				//************///////**********///////////***********/////////////*********
				//var tabela_total = corpo_tabela + lista.join("");
				//console.log(tabela_total);

				//$("#tabelaComunidade").append(corpo_tabela);
				


		//	} /// fim for grupos 

			
			


			

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


			//faz a pagina de loading
			setTimeout(function(){
	      		$("#loadingMotoristas").hide();
    		}, 1000);

    		

			
		}
	}); // fim ajax


//***************** inicia quando doc ready	
	$('.collapsible').collapsible();

	var timer;
	var delay = 1000;
	$(".drivercard").hover(function(){
		
		var hover = $(this).find($(".hover"));

	 		if(timer) {
	            clearTimeout(timer);
	            timer = null;
	        }

	        timer = setTimeout(function() {
	           
	        	hover.stop().slideDown(500);

	        }, delay);

	}, function(){
		
			$(this).find($(".hover")).stop().slideUp(500);
	});
});



///////////////////////////////// outras config /////////////////////////////////////////////////
$('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
);


function dateconvert(variable){
	var parts = variable.split(" ");
	
	var date = parts[0].split("-");
   	var dia = date[2];
   	var mes = date[1];
   	var ano = date[0];

   	var data = dia+"/"+mes+"/"+ano;

   	return data;

}

function timeconvert(variable){
	var parts = variable.split(" ");
	//var date_evt = parts_evt[0];
	var horario = parts[1];

	return horario;
}