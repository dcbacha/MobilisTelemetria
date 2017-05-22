var token = checktoken();

$("#btndriver").parent().addClass("active");
$("#btndriver").parent().siblings().removeClass("active");

$(function(){

	$("#loadingUsers").addClass("active");

		sessions(token);

		$.ajax({
			type: "GET",
			//url: "http://192.168.0.35/rds/api/public/carros/readdata-motor",
			url: url_req_readdata_driver,
			headers: {
			  'Authorization': 'Bearer ' + token
			},
			error: function(data, status) {
				console.log(data);
				redirect("timeout");
	
			},
			success: function(data, status) {
				console.log(data);
				processData(data);
				//inicializacao_hover();
				warningset();
				inicializacao();
			}
		
		});

			
}); //fim on ready

console.time('processData');
console.timeEnd('processData');


//************************************ Funções ************************************//

function processData(data){
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
	var obj = {	user: user,
		  		data: "<div id='"+idmotorista+"' class='section scrollspy' style='padding:0px'>"+
		  				"<div class='card drivercard'>"+
						"<div class='card-content '>"+
							"<span class='card-title'>"+user+"</span>"+
							"<ul class='collapsible z-depth-0' data-collapsible='expandable'>"}; // hidden>"};  //para hover, esse hover tem q começar com hidden
	return obj;								            
}


function createObjCarros(user, idcarro){

	var obj = { user: user,
                idcarro: idcarro,
                data: "<li>"+
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

function inicializacao(){
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

}
