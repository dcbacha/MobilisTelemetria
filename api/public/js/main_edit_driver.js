var token = checktoken();
$("#btnmotoristas").parent().addClass("active");
$("#btnmotoristas").addClass("active");
$("#btnmotoristas").parent().siblings().removeClass("active");


$(function(){
	sessions(token);
	styleDropdown(1);

	getGroup();
	setTimeout(getInfo, 200);

	var click = 0;
	$("#checksenha").change(function(){
		$("#senhacontainer").slideToggle();
		click ++;
		
		if(click == 1){$(this).attr("checked", true);}
		if(click == 2){$(this).attr("checked", false); click = 0;}
		
	});

	$("#voltar").click(function(){
		direct(url_info_drivers);
	});
	
	$("#envia").click(function(){
		enviar();
	});

}); //end do document ready

function getGroup(){
	$.ajax({
		type: "GET",
		url: url_get_group,
		contentType: "application/x-www-form-urlencoded",
		headers: { 'Authorization': 'Bearer ' + token },
		error: function(data, status, xhr) {
			//console.log(data);
			//console.log(data.resposeText);
			redirect('timeout');	
		},
		success: function(data, status) {
			//console.log(data);

			for(let i =0 ; i < data.length ; i++){
				var id = data[i].idusuario;
				var nome = data[i].nome;

				var html =  "<option value="+id+">"+nome+"</option>";
				$("#responsavel").append(html);
				Materialize.updateTextFields();
				$('select').material_select();
			}
		}
	});
}

function getInfo(){
	var id = getUrlParameter('id');

	var json = {id: id};
	
	$.ajax({
			type: "GET",
			url: url_get_info_driver,
			contentType: "application/x-www-form-urlencoded",
			data: json,
			headers: { 'Authorization': 'Bearer ' + token },
			error: function(data, status, xhr) {
				//console.log(data.responseText);
				redirect('timeout');
			},
			success: function(data, status) {
				fillInfo(data);
			}
	});
}

function fillInfo(data){

	var nome = data[0].nome;
	var sobrenome = data[0].sobrenome;
	var nummatricula = data[0].nummatricula;
	var idade = data[0].idade;
	var sexo = data[0].sexo;
	var cnh = data[0].cnh;
	var email = data[0].email;
	var telefone = data[0].telefone;
	var departamento = data[0].departamento;
	var responsavel = data[0].responsavel;
	var turno = data[0].turno;
	var permhoraextra = data[0].permhoraextra;
				
	if(!sobrenome){sobrenome = ""}

	$("#first_name").attr('value', nome);
	$("#last_name").attr('value', sobrenome);
	$("#matricula").attr('value', nummatricula);
	$("#idade").attr('value', idade);
	$("#cnh").attr('value', cnh);
	$("#cad_email").attr('value', email);
	$("#telefone").attr('value', telefone);
	$("#departamento").attr('value', departamento);
	
	$("#responsavel").find("[value="+responsavel+"]").attr('selected', true);
	$("#turno").find("[value="+turno+"]").attr('selected', true);
	$("#permhoraextra").find("[value="+permhoraextra+"]").attr('selected', true);
	$("#sexo").find("[value="+sexo+"]").attr('selected', true);
		

	Materialize.updateTextFields();
	$('select').material_select();
}

function enviar(){
	var id = getUrlParameter('id');

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
	
	var json = {
		id: id,
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
	}
	
	console.log(json);
	requisicaoEnviar(json);
	
}

function requisicaoEnviar(json){
	$.ajax({
			type: "POST",
			url: url_post_update_driver,
			contentType: "application/x-www-form-urlencoded",
			data: json,
			headers: { 'Authorization': 'Bearer ' + token },
			error: function(data, status, xhr) {
				
			
				if(data.responseText == "Usuario alterado com sucesso"){
					$("#success").slideToggle();
					setTimeout(function(){
						$("#success").slideToggle(400);
						direct(url_info_drivers);
					}, 2000);
				} else {
					$("#erromisc").slideToggle();
					setTimeout(function(){
						$("#erromisc").slideToggle(400);
					}, 2000);
				}
				
			},
			success: function(data, status) {
				$("#success").slideToggle();
				setTimeout(function(){
					$("#success").slideToggle(400);
					direct(url_info_drivers);
				}, 2000);


			}
	});
}