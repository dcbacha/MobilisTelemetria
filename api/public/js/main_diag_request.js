var token = checktoken();

$("#btndiagnostic").parent().addClass("active");
$("#btndiagnostic").parent().siblings().removeClass("active");

$(function(){

	sessions(token);
	//$('select').material_select();

	$("#btnsolicitar").click(function(){
		console.log("solicitou - btn não tem ação");
	});
	
});

$.ajax({
	type: "GET",
	url: "http://192.168.0.35/rds/api/public/listfleet",
	dataType: 'json',
	data: {
		alt: 'json-in-script'
	},
	headers: {
		'Authorization': 'Bearer ' + token
	},
	error: function(data, status) {
		console.log("erro ajax");
		console.log(data);
		console.log(data.responseText)
		//redirect("timeout");
	},
	success: function(data, status) {
		console.log("sucesso ajax");
		console.log(data);
		processData(data);
	
	}
});

function processData(data){

	var num_carros = data.length;

	for(let i =0; i < num_carros ; i++){

		var idcarro = data[i].idcarro;
		var numserie = data[i].numserie;

		$("#dinamicSelect").append("<option value='"+idcarro+"'>Carro "+idcarro+"</option>");
	}

	$('select').material_select();
}
