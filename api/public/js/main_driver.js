var token = checktoken();

$("#btndriver").parent().addClass("active");
$("#btndriver").addClass("active");
$("#btndriver").parent().siblings().removeClass("active");

$(function(){
	
	$("#loadingUsers").addClass("active");

	sessions(token);

	req_evt();

			
}); //fim on ready

console.time('processData');
console.timeEnd('processData');


//************************************ Funções ************************************//

function processEvt(data){
	var num_evt = data.length;
			//console.log(num_evt);		
	var listausers = [];
	var listacarros = [];	

  	var objEvt = [];
  	var objCarros = [];
  	var objUsers = [];
  	$i = 0;
  	$j = 0;
  	$k = 0;

  	for(let x=0; x < num_evt ; x++){
  		///////variaveis
 		var user = data[x].nome;
  		var idmotorista = data[x].idmotorista
  		var idcarro = data[x].idcarro;
		var errorcode = data[x].errorcode;
		var timestamp_rcv = data[x].timestamp_rcv;
		var timestamp_evt = data[x].timestamp_evt;
		var dados = data[x].data;
		
  		if ($.inArray(user, listausers) >= 0){

  			var carros = listacarros[user].split(" ");

 			if($.inArray(idcarro, carros) == -1){
 				
  				listacarros[user] += (idcarro+" ");

  				objCarros[$j] = createObjCarros(user, idcarro);
			    objEvt[$k] = createObjEvt(user, idcarro, errorcode, timestamp_evt, timestamp_rcv, dados);
                $j++;
                $k++;
  			}
  			else{	

  				objEvt[$k] = createObjEvt(user, idcarro, errorcode, timestamp_evt, timestamp_rcv, dados);
                $k++;
            }
  		}
  		else{
		  			
			listausers.push(user);

			processScrollSpy(user, idmotorista);
		  			
  			objUsers[$i] = createObjUsers(user, idmotorista);
  			objCarros[$j] = createObjCarros(user, idcarro);
  			objEvt[$k] = createObjEvt(user, idcarro, errorcode, timestamp_evt, timestamp_rcv, dados); 
		  			
  			listacarros[user] = (idcarro)+" ";
            $i++; 
            $j++;
            $k++;
  		} 
	} //fim for

	var num_users = objUsers.length; 	//console.log("tamanho objUsers: "+num_users);
	var num_carros = objCarros.length; 	//console.log("tamanho objCarros: "+num_carros);
	var num_evt = objEvt.length; 		//console.log("tamanho eventos: "+ num_evt); 

	for(let x=0; x < num_users ; x++){
				
		var motorista = objUsers[x].user;

		var dados_motorista = objUsers[x].data;
		var lista1 = [];
		for(let y=0; y < num_carros; y++){
					
			if(objUsers[x].user == objCarros[y].user){
						
				lista1 += objCarros[y].data

				var lista2 = [];
				for(let z=0; z<num_evt;z++){
							
					if(objUsers[x].user == objEvt[z].user && objCarros[y].idcarro == objEvt[z].idcarro){

						lista2.push(objEvt[z].data);
					}	
				}
				lista1 += lista2.join("") + ("</ul></div></li>");
			}
		}

		var tabela_total = dados_motorista + lista1;
		$("#MotoristaDinamico").append(tabela_total);
	}
}

function processScrollSpy(user, idmotorista){

	$("#tablescrollspy").append("<li><a href='#"+idmotorista+"'>"+user+"</a></li>");
}


function createObjUsers(user, idmotorista){
	getInfo(idmotorista);

	var obj = {	user: user,
		  		data: "<div id='"+idmotorista+"' class='section scrollspy' style='padding:0px'>"+
		  				"<div class='card drivercard cardteste'>"+
						"<div class='card-content '>"+
							"<span class='card-title'>"+user+""+
								"<span class='right'>"+
								"<a class='btn-flat tooltipped' data-html='true' data-position='bottom' data-delay='50' data-tooltip='' id='id1_"+idmotorista+"'>"+
									"<i class='material-icons valign-wrapper'>info_outline</i>"+
								"</a>"+
								"<a class='btn-flat edit tooltipped' id='id2_"+idmotorista+"'  data-position='bottom' data-delay='50' data-tooltip='Clique para editar'>"+
									"<i class='material-icons valign-wrapper '>mode_edit</i>"+
								"</a>"+
								"</span>"+
							"</span>"+
							"<ul class='collapsible z-depth-0' data-collapsible='expandable'>"}; // hidden>"};  //para hover, esse hover tem q começar com hidden
	return obj;								            
}


function getInfo(id){

	var json = {id: id};

	$.ajax({
			type: "GET",
			url: url_req_getInfo,
			contentType: "application/x-www-form-urlencoded",
			data: json,
			headers: {
			  'Authorization': 'Bearer ' + token
			},
			error: function(data, status, xhr) {
				console.log("erro ajax get Info");
				console.log(data);
				
			},
			success: function(data, status) {
				console.log("sucesso ajax get Info");
				console.log(data);

				var nome = data[0].nome;
				var email = data[0].email;
				
				if(data[0].sobrenome){var sobrenome = data[0].sobrenome;}
				else { var sobrenome = "";}

				var tooltip = "Nome: "+nome+" "+sobrenome+"<br>"+
							"Email:"+email+"";

				$("#id1_"+id).attr("data-tooltip", tooltip);
				console.log($("#id1_"+id));
				$('.tooltipped').tooltip({delay: 50});

			}
	});

}


function createObjCarros(user, idcarro){

	var obj = { user: user,
                idcarro: idcarro,
                data: "<li class='car'>"+
						" <div class='collapsible-header'><i class='material-icons'>keyboard_arrow_down</i>Carro "+idcarro+"</div>"+
						" <div class='collapsible-body grey lighten-4' style='padding: 10px;'>"+
							" <ul class='collapsible z-depth-0' data-collapsible='expandable' style='margin: 0px'>"};
	return obj;
}

function createObjEvt(user, idcarro, errorcode, timestamp_evt, timestamp_rcv, dados){

	var status = warningcheck(errorcode, dados, idcarro);

	var date_rcv = dateconvert(timestamp_rcv);
	var time_rcv = timeconvert(timestamp_rcv);

	var date_evt = dateconvert(timestamp_evt);
	var time_evt = timeconvert(timestamp_evt);

	var obj = { user: user,
		  		idcarro: idcarro,
		  		data: "<li>"+
				    	"<div class='collapsible-header "+status+"'>"+errorcode+" <span class='right'>"+time_evt+"</span></div>"+
				    	"<div class='collapsible-body  grey lighten-5' style='padding: 20px'>"+          
					        "<strong>Dados:</strong> "+dados+"<br/>"+
					        "<strong>Código de Erro:</strong> "+errorcode+"<br/>"+
					        "<strong>Horário de Envio:</strong>"+date_rcv+" - "+time_rcv+""};
	return obj;
}

function inicializacao_hover(){
	//$('.collapsible').collapsible();

	var timer;
	var delay = 1000;
	var hover;
				
	$(".drivercard").hover(function(){
		
		$('.collapsible').collapsible();
		hover = $(this).find($(".hover"));
		hover.children().children().removeClass("active");
			if(timer) {
				clearTimeout(timer);
				timer = null;
			}

			timer = setTimeout(function() {
				           
				hover.stop().slideToggle(500);

			}, delay);

	}, function(){
		
		hover.stop().slideToggle(500);
	});	
}

function begin(){
	$("#loadingUsers").hide();
	$('.collapsible').collapsible();
	$('.scrollspy').scrollSpy();

	var timer;
	var delay = 1000;
				
	$(".drivercard").hover(function(){
		hover = $(this).find($(".hover"));

	}, function(){

		hover.find(".collapsible-body").stop().slideUp(1000);

	});

	
	$(".warning").addClass("warningcolor");
	$(".danger").addClass("dangercolor");

	var click =0;
	$(".car .collapsible-header").click(function(){
		click++;

		if(click == 1){
			$(this).find("i").css({
		        "-webkit-transform": "rotate(270deg)",
		        "-moz-transform": "rotate(270deg)"
		    });
		}
		if(click == 2){
			$(this).find("i").css({
		        "-webkit-transform": "rotate(0deg)",
		        "-moz-transform": "rotate(0deg)"
		    });
			click =0;
		}
	});

	$(".edit").click(function(){
		var url = "?t="+token;

		var id = $(this).attr("id").split("_")[1];
		var l = "?id="+id;
		document.location = url_edit_user+url+l;
	});

}
