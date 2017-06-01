var token = checktoken();

$("#btnfleet").parent().addClass("active");
$("#btnfleet").parent().siblings().removeClass("active");


$(function(){

	$("#loadingFrota").addClass("active");

	$("#loadingEconomy").addClass("active");
	$("#loadingGroup").addClass("active");
	$("#loadingWarning").addClass("active");

	sessions(token);

		$.ajax({
			type: "GET",
			//url: url_req_readdata,
			url: url_req_readdata_driver,
			headers: {
			  'Authorization': 'Bearer ' + token
			},
			error: function(data, status) {
				console.log("erro ajax -> main fleet");
				//console.log(data);
				console.log(data.responseText);
				redirect("timeout");
			},
			success: function(data, status) {
				//console.log(data);
				processData(data);
				inicializacao();
			}
		});

}); //end do document ready

//************************************ Funções ************************************//
function processData(data){
	var num_evt = data.length;
	
	var listacarros = [];	

  	var objEvt = [];
  	var objCarros = [];
  	var i = 0;
  	var j = 0;

  	
	for(let x=0; x < num_evt ; x++){
  		
  		var idcarro = data[x].idcarro;
  		var errorcode = data[x].errorcode;
  		var timestamp_evt = data[x].timestamp_evt;
  		var timestamp_rcv = data[x].timestamp_rcv;
		var dados = data[x].data;
		var nome = data[x].nome;
		
  		if ($.inArray(idcarro, listacarros) == -1){
  			listacarros.push(idcarro);

  			objCarros[i] = createObjCarros(idcarro); //vou precisar do numero de serie e etc
  			i++;
  		}

  		objEvt[j] = createObjEvt(idcarro, errorcode, timestamp_evt, timestamp_rcv, dados, nome);
  		j++;
  	
	} //fim for

	var num_carros = objCarros.length; 	//console.log("tamanho objCarros: "+num_carros);
	var tabela_total;
	for(let x=0; x < num_carros ; x++){
				
		var idcarro = objCarros[x].idcarro;
		var html_carro = objCarros[x].data;
		
		var html_lista_evt = [];
		
		for(let y=0 ; y < num_evt ; y++){

			var carro = objEvt[y].idcarro;
			if(carro == idcarro){
				html_lista_evt += objEvt[y].data;
			}
		}
		
		tabela_total += html_carro + html_lista_evt;
	}
	//console.log(tabela_total);
	$("#tabelaDinamica").append(tabela_total);

	getPermLog();
}


function createObjCarros(idcarro, numserie, odometro, horimetro){

	var obj = { idcarro: idcarro,
                data: "<tr id=tr_"+idcarro+">"+
					"</tr>"+
					"<tr class=' grey lighten-4'>"+
						"<td colspan='6'>"+
							"<ul class='collapsible z-depth-0' data-collapsible='accordion' style='margin-left: 10px; margin-right: 10px; '>"};
	return obj;
}

function createObjEvt(idcarro, errorcode, timestamp_evt, timestamp_rcv, dados, nome){

	var status = warningcheck(errorcode, dados, idcarro);

	var date_rcv = dateconvert(timestamp_rcv);
	var time_rcv = timeconvert(timestamp_rcv);

	var date_evt = dateconvert(timestamp_evt);
	var time_evt = timeconvert(timestamp_evt);

	var obj = { idcarro: idcarro,
		  		data: "<li>"+
							"<div class='collapsible-header "+status+"'>"+errorcode+" <span class='right'>"+timestamp_evt+"</span></div>"+
								"<div class='collapsible-body grey lighten-5' style='padding: 20px;'>"+
								"<span>"+
									"<strong>Dados: </strong>"+dados+"<br/>"+
									"<strong>Código de Erro: </strong>"+errorcode+"<br/>"+
									"<strong>Horário de Envio: </strong>"+timestamp_rcv+"<br/>"+
									"<strong>Responsável: </strong>"+nome+""+
								"</span>"+
							"</div>"+
						"</li>"};
	return obj;
}

function getPermLog(){
	
	$.ajax({
			type: "GET",
			//url: "http://192.168.0.35/rds/api/public/listlogperm",
			url: url_req_log_perm,
			headers: {
			  'Authorization': 'Bearer ' + token
			},
			error: function(data, status) {
				console.log("erro ajax -> get perm log");
				console.log(data);
				console.log(data.responseText);
			},
			success: function(data, status) {
				var num_carros = data.length;

				for(let x=0 ; x < num_carros; x++){
					
					var idcarro=data[x].idcarro;
					var odometro= data[x].odometro;
					var	horimetro= data[x].horimetro;
					var	numserie= data[x].numserie;

					horimetro_total += parseInt(horimetro);
					odometro_total += parseInt(odometro);

					$("#tr_"+idcarro).append("<td>"+(x+1)+"</td>"+
											"<td>"+idcarro+"</td>"+
											"<td>"+numserie+"</td>"+
											"<td>"+odometro+"</td>"+
											"<td>"+horimetro+"</td>"+
											"<td>"+
												"<i class='material-icons' id=locate_'"+idcarro+"'>my_location</i>"+
											"</td>");
				}
				setEconomy();
			}
		});
}

function setEconomy(){

	$("#economy").append("</br>- você rodou "+odometro_total+"km no total");
	$("#loadingEconomy").removeClass("active");
}

function getGroup(){
	$.ajax({
			type: "GET",
			url: "http://192.168.0.35/rds/api/public/listgroup",
			headers: {
			  'Authorization': 'Bearer ' + token
			},
			error: function(data, status) {
				console.log("erro ajax -> get perm log");
				console.log(data);
				console.log(data.responseText);
			},
			success: function(data, status) {
				var num_users = data.length;
				
			  	for(let x=0; x < num_users ; x++){

			  		var lista =[];
			 		var user = data[x].nome;

					var corpo_tabela = "<li class='light'>"+user+"</li>";		
					$("#tabelaComunidade").append(corpo_tabela);
				}
				$("#tabelaComunidade").show();
			}
		});
}


function inicializacao(){
	$('.collapsible').collapsible();

	$("#tabelaDinamica tr:odd").addClass("odd");
	$("#tabelaDinamica tr:not(.odd)").hide();
	$("#tabelaDinamica tr:first-child").show();


	$("#tabelaDinamica tr.odd").click(function(){
		$(this).next("tr").toggle(250);
		$(this).find(".row").toggleClass("up");
	});
	
	$("#loadingFrota").removeClass("active");
	$("#tabelaDinamica").fadeIn(500);

	getGroup();
	warningset();
}





