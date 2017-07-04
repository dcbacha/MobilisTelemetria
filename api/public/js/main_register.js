var token = checktoken();
sessions(token);

$("#btnusers").parent().addClass("active");
$("#btnusers").addClass("active");
$("#btnusers").parent().siblings().removeClass("active");


$(function(){

//console.log($("#btncadastro").parent().parent().parent())
//$("#btncadastro").parent().parent().parent().css({'display': 'block'});
//$("#btncadastro").parent().parent().parent().prev().css({ 'background-color': 'rgba(0, 0, 0, 0.05)'});
//$("#btncadastro").parent().parent().parent().parent().addClass("active");

	styleDropdown(1);

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

	//console.log(form_json);

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
			url: url_put_cadastro,
			contentType: "application/x-www-form-urlencoded",
			data: form_json,
			headers: { 'Authorization': 'Bearer ' + token },
			error: function(data, status, xhr) {
				if(data.responseText == "sucesso"){
					//console.log("erro de sucesso ??")
					$("#sucesso").slideToggle(400);
					setTimeout(function(){
						$("#sucesso").slideToggle(400);
						direct(url_info_users);
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
				//console.log(data);

				$("#sucesso").slideToggle(400);
				setTimeout(function(){
					$("#sucesso").slideToggle(400);
					direct(url_info_users);
				}, 2000);
				
			}
	});
}