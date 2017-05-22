var token = checktoken();
sessions(token);

$("#btncadastro").parent().addClass("active");
$("#btncadastro").parent().siblings().removeClass("active");

$(function(){

	$('select').material_select();

	$("#btnsubmit").click(function(){
		formSender();
	});
});

function formSender(){

	var nome = $("#first_name").val();
	var sobrenome = $("#last_name").val();
	var user = $("#user_name").val();
	var email = $("#cad_email").val();
	var senha = $("#password").val();
	var grupo = $("#grupo").val();
	var nivel = $("#nivel").val();

	var form_json = {
		nome: nome,
		sobrenome: sobrenome,
		user: user,
		email: email,
		senha: senha,
		grupo: grupo,
		nivel: nivel
	};

	console.log(form_json);

	if($("#cad_email")[0].className == "validate invalid"){
		$("#emailerror").slideToggle(400);
		setTimeout(function(){
			$("#emailerror").slideToggle(400);
		}, 2000);	
	}
	else if(!nome || !sobrenome || !user || !email || !senha || !grupo || !nivel){
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
			url: url_req_cadastro,
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

				$("#sucesso").slideToggle(400);
				setTimeout(function(){
					$("#sucesso").slideToggle(400);
				}, 2000);
				
			}
	});
}