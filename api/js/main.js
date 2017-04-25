///////////////////////////////////////QUANDO A PÁGINA CARREGA/////////////////////////////////////////////////


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
		//crossDomain: true,
		url: "http://192.168.0.35/rds/api/carros/readdata",
		contentType: "application/json",
		//dataType: 'jsonp',
		data: {
		  alt: 'json-in-script'
		},
		headers: {
		  'Authorization': 'Bearer ' + token
		},
		error: function(data) {
			console.log("erro ajax main");

			 var url = "?error=timeout";

         //   document.location = "http://192.168.0.35/rds/api/app/iniciate.html"+url;
		//	console.log(data);
		},
		success: function(data, status) {
			console.log(data);
			console.log("novo codigo");
			var num_carros = data[0].carros.length;
			console.log(num_carros);

			
			/////////////////// carros //////////////////
		  	for(let x=0; x < num_carros ; x++){

		  		var lista =[];

		 		var id_carro = data[0].carros[x].idcarro;
		  		console.log(id_carro);

		  		var num_evt = data[0].carros[x].evt.length;
		  		console.log("num eventos: "+num_evt);

		  		var numserie = data[0].carros[x].numserie;
		  		console.log(numserie);

		  		var odometro = data[0].carros[x].odometro;
		  		var horimetro = data[0].carros[x].horimetro
		  		console.log(odometro);
		  		console.log(horimetro);

				 var corpo_tabela = "<tr class='hoverable'>"+
						"<td>"+(x+1)+"</td>"+
						"<td>"+id_carro+"</td>"+
						"<td>"+numserie+"</td>"+
						"<td>"+odometro+"</td>"+
						"<td>"+horimetro+"</td>"+
						"<td>"+
							"<i class='material-icons' id=locate_'"+id_carro+"'>my_location</i>"+
						"</td>"+
					"</tr>"+
					"<tr class=' grey lighten-3'>"+
						"<td colspan='6'>"+
						"<ul class='collapsible popout' data-collapsible='accordion'>";


		  		/////////////// eventos ///////////////
		  		for(let y=0; y < num_evt; y++){

		  			var nome_evt = data[0].carros[x].evt[y].evento;
		  			var dados = data[0].carros[x].evt[y].dados;
		  			
		  			var time_evt = data[0].carros[x].evt[y].time_evt;

		  			var data_evt = dateconvert(time_evt);
		  			var horario_evt = timeconvert(time_evt)

		  			var time_rcv = data[0].carros[x].evt[y].time_rcv;

		  			var data_rcv = dateconvert(time_rcv);
		  			var horario_rcv = timeconvert(time_rcv);
		  		
		  			lista[y] = "<li>"+
									"<div class='collapsible-header'>"+nome_evt+" <span class='right'>"+horario_evt+"</span></div>"+
									"<div class='collapsible-body grey lighten-5'>"+
									"<span>"+
										"<strong>Horário de Envio: </strong>"+horario_rcv+"<br/>"+
										"<strong>Código de Erro: </strong>"+nome_evt+"<br/>"+
										"<strong>Dados: </strong>"+dados+""+
									"</span>"+
									"</div>"+
								"</li>";
					//console.log(lista);
	
		  		} /////fim for eventos

					
				//console.log(lista.length);

				var tabela_total = corpo_tabela + lista.join("");
				//console.log(tabela_total);

				$("#tabelaDinamica tbody").append(tabela_total);
				


			} /// fim for carros


			///////////////// grupo ////////////////////
			var num_users = data[0].grupo.length;
			//console.log(num_users);

			
		  	for(let x=0; x < num_users ; x++){

		  		var lista =[];

		 		var user = data[0].grupo[x].nome;
		  		//console.log(user);

				 var corpo_tabela = "<li class='light'>"+user+"</li>";
											
				

				var tabela_total = corpo_tabela + lista.join("");
			//	console.log(tabela_total);

				$("#tabelaComunidade").append(corpo_tabela);
				


			} /// fim for grupos 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			$('.collapsible').collapsible();

			$("#tabelaDinamica tr:odd").addClass("odd");
			$("#tabelaDinamica tr:not(.odd)").hide();
			$("#tabelaDinamica tr:first-child").show();

			//animacao();

			$("#tabelaDinamica tr.odd").click(function(){
				$(this).next("tr").toggle(250);
				$(this).find(".row").toggleClass("up");
			});

			//faz a pagina de loading
			setTimeout(function(){
	      		$("#loadingFrota").hide();
    			$("#tabelaDinamica").fadeIn(500);
    		}, 1000);

    		

			
		}
	}); // fim ajax

	$("#buttonusuario").click(function(){

		var url = "?token="+token;
		//document.location = "http://192.168.0.35/rds/api/app/driverpage.html"+url;
	});

}); //end do document ready



///////////////////////////////////////////////////////////////////////////////////////////////////////////////


$('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
);

function animacao(){
	setTimeout(function(){
		$("#tabelaCarros tbody tr:first-child").css('background-color','#f5f5f5');
	}, 400);

	setTimeout(function(){
		$("#tabelaCarros tbody tr:first-child").css('background-color','white');
		$("#tabelaCarros tbody tr:first-child").next("tr").toggle(1000);
	}, 600);
}


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