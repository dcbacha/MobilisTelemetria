var token = checktoken();
sessions(token);

$("#btnmotoristas").parent().addClass("active");
$("#btnmotoristas").addClass("active");
$("#btnmotoristas").parent().siblings().removeClass("active");


$(function(){

	styleDropdown(1);
	getGroup();

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
			}
			$('select').material_select();
		}
	});
}

function formSender(){

	var nome = $("#first_name").val();
	var sobrenome = $("#last_name").val();
	var nummatricula = $("#matricula").val();
	var idade = $("#idade").val();
	var sexo = $("#sexo").val();
	var cnh = $("#cnh").val();
	var email = $("#cad_email").val();
	var telefone = $("#telefone").val();
	var departamento = $("#departamento").val();
	var responsavel = $("#responsavel").val();
	var turno = $("#turno").val();
	var permhoraextra = $("#permhoraextra").val();

	var form_json = {
		nome: nome,
		sobrenome: sobrenome,
		nummatricula: nummatricula,
		idade: idade,
		sexo: sexo,
		cnh: cnh,
		email: email,
		telefone: telefone,
		departamento: departamento,
		responsavel: responsavel,
		turno: turno,
		permhoraextra: permhoraextra
	};

	//console.log(form_json);

	if($("#cad_email")[0].className == "validate invalid"){
		$("#emailerror").slideToggle(400);
		setTimeout(function(){
			$("#emailerror").slideToggle(400);
		}, 2000);	
	}
	else if(!nome || !sobrenome || !matricula || !idade || !sexo || !cnh || !email || !telefone || !departamento || !responsavel || !turno || !permhoraextra){
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
			url: url_put_cadastro_driver,
			contentType: "application/x-www-form-urlencoded",
			data: form_json,
			headers: { 'Authorization': 'Bearer ' + token },
			error: function(data, status, xhr) {
				console.log(data);
				console.log(data.responseText);

				if(data.responseText == "sucesso"){

					$("#sucesso").slideToggle(400);
					setTimeout(function(){
						$("#sucesso").slideToggle(400);
						direct(url_info_drivers);
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
					direct(url_info_drivers);
				}, 2000);
				
			}
	});
}