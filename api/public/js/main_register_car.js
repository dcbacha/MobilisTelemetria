var token = checktoken();
sessions(token);

$("#btnveiculos").parent().addClass("active");
$("#btnveiculos").addClass("active");
$("#btnveiculos").parent().siblings().removeClass("active");

$(function(){
	//$("#btncadastroveiculo").parent().parent().parent().css({'display': 'block'});
	getGroup();
	styleDropdown(1);
	$('select').material_select();

	$("#btnsubmit").click(function(){
		formSender();
	});
});

function getGroup(){
	$.ajax({
		type: "GET",
		url: url_get_group,
		contentType: "application/x-www-form-urlencoded",
		headers: { 'Authorization': 'Bearer ' + token },
		error: function(data, status, xhr) {
			console.log(data);
			console.log(data.resposeText);	
		},
		success: function(data, status) {
			console.log(data);

			for(let i =0 ; i < data.length ; i++){
				var id = data[i].idusuario;
				var nome = data[i].nome;

				var html =  "<option value="+id+">"+nome+"</option>";
				$("#responsavel").append(html);
				$('select').material_select();
			}
		}
	});
}

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

	//console.log(form_json);

	
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
	console.log(form_json);

	$.ajax({
			type: "PUT",
			url: url_put_cadastro_car,
			contentType: "application/x-www-form-urlencoded",
			data: form_json,
			headers: { 'Authorization': 'Bearer ' + token },
			error: function(data, status, xhr) {
				//console.log("erro ajax cadastro");
				console.log(data);
				//console.log(data.responseText);
				//console.log(status);
				//console.log(xhr);
				//redirect("timeout");
				if(data.responseText == "sucesso"){
					//console.log("erro de sucesso ??")
					$("#sucesso").slideToggle(400);
					setTimeout(function(){
						$("#sucesso").slideToggle(400);
						direct(url_info_cars);
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
				//console.log("sucesso ajax cadastro");
				console.log(data);

				$("#sucesso").slideToggle(400);
				setTimeout(function(){
					$("#sucesso").slideToggle(400);
					direct(url_info_cars);
				}, 2000);
				
			}
	});
}