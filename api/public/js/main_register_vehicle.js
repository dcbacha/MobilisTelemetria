var token = checktoken();
sessions(token);

$("#btncadastroveiculo").parent().addClass("active");
$("#btncadastroveiculo").addClass("active");
$("#btncadastroveiculo").parent().siblings().removeClass("active");

$(function(){
	$('select').material_select();

	$("#btnsubmit").click(function(){
		formSender();
	});
});

function formSender(){

	var num_serie = $("#num_serie").val();
	var chave_acesso = $("#chave_acesso").val();
	var responsavel = $("#responsavel").val();
	var grupo = $("#grupo").val();

	var form_json = {
		numserie: num_serie,
		chaveacesso: chave_acesso,
		responsavel: responsavel,
		grupo: grupo
	};

	console.log(form_json);

	
	if(!num_serie || !chave_acesso || !responsavel || !grupo){
		$("#dataerror").slideToggle(400);
		setTimeout(function(){
			$("#dataerror").slideToggle(400);
		}, 2000);
	}
	else{
		cadastra(form_json);
	}
}

function cadastra(form_json){

	$.ajax({
			type: "PUT",
			url: url_req_cadastro_car,
			contentType: "application/x-www-form-urlencoded",
			//dataType: 'json',
			data: form_json,
			headers: {
			  'Authorization': 'Bearer ' + token
			},
			error: function(data, status, xhr) {
				console.log("erro ajax cadastro");
				console.log(data);
				console.log(data.responseText);
				console.log(status);
				console.log(xhr);
				//redirect("timeout");
				if(data.responseText == "sucesso"){
					//console.log("erro de sucesso ??")
					$("#sucesso").slideToggle(400);
					setTimeout(function(){
						$("#sucesso").slideToggle(400);
					}, 2000);
				}
				else{
					$("#outroerro").slideToggle(400);
					setTimeout(function(){
						$("#outroerro").slideToggle(400);
					}, 2000);
				}
			},
			success: function(data, status) {
				console.log("sucesso ajax cadastro");
				console.log(data);

				$("#sucesso").slideToggle(400);
				setTimeout(function(){
					$("#sucesso").slideToggle(400);
				}, 2000);
				
			}
	});
}