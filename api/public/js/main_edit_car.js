var token = checktoken();
$("#btnveiculos").parent().addClass("active");
$("#btnveiculos").addClass("active");
$("#btnveiculos").parent().siblings().removeClass("active");


$(function(){
	
	sessions(token);
	styleDropdown(1);
	$('select').material_select();

	getGroup();
	getInfo();

	$("#voltar").click(function(){
		direct(url_info_cars);
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

function getInfo(){
	var id = getUrlParameter('id');

	var json = {id: id};
	
	$.ajax({
			type: "GET",
			url: url_get_info_car,
			contentType: "application/x-www-form-urlencoded",
			data: json,
			headers: { 'Authorization': 'Bearer ' + token },
			error: function(data, status, xhr) {
				redirect('timeout');
			},
			success: function(data, status) {
				fillInfo(data);
			}
	});
}

function fillInfo(data){
console.log(data);
	
	var numserie = data[0].numserie;
	var chaveacesso = data[0].chaveacesso;
	var idresponsavel = data[0].responsavel;
	var nomeresponsavel = data[0].nome;
	var idgrupo = data[0].idgrupo;
				

	$("#num_serie").attr('value', numserie);
	$("#chave_acesso").attr('value', chaveacesso);
	$("#grupo").find("[value="+idgrupo+"]").attr("selected", true);
	$("#responsavel").find("[value="+idresponsavel+"]").attr("selected", true);

	Materialize.updateTextFields();
	$('select').material_select();
	
}

function enviar(){
	var id = getUrlParameter('id');

	var responsavel = $("#responsavel").val();
	var grupo = $("#grupo").val();
	
	var json;


	json = {
		idcar: id,
		idresponsavel: responsavel,
		grupo: grupo
	}

	requisicaoEnviar(json);

}

function requisicaoEnviar(json){
	console.log('enviou');
	$.ajax({
			type: "POST",
			url: url_post_update_car,
			contentType: "application/x-www-form-urlencoded",
			data: json,
			headers: { 'Authorization': 'Bearer ' + token },
			error: function(data, status, xhr) {
				
				if(data.responseText == "Senha errada"){ 
					$("#errosenha").slideToggle();
					setTimeout(function(){
						$("#errosenha").slideToggle(400);
					}, 2000);
				}
				else if(data.responseText == "Usuario não existe" || data.responseText == "Unauthorized"){
					$("#erromisc").slideToggle();
					setTimeout(function(){
						$("#erromisc").slideToggle(400);
					}, 2000);
				}

				else if(data.responseText == "Usuario alterado com sucesso"){
					$("#success").slideToggle();
					setTimeout(function(){
						$("#success").slideToggle(400);
						direct(url_info_cars);
					}, 2000);
				}
				
			},
			success: function(data, status) {
				$("#success").slideToggle();
				setTimeout(function(){
					$("#success").slideToggle(400);
					direct(url_info_cars);
				}, 2000);


			}
	});
}