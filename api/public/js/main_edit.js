var token = checktoken();
$("#btnusers").parent().addClass("active");
$("#btnusers").addClass("active");
$("#btnusers").parent().siblings().removeClass("active");


$(function(){

/*	$("#loadingFrota").addClass("active");

	$("#loadingEconomy").addClass("active");
	$("#loadingGroup").addClass("active");
	$("#loadingWarning").addClass("active");
*/
	sessions(token);
	styleDropdown(1);

	getInfo();

	var click = 0;
	$("#checksenha").change(function(){
		$("#senhacontainer").slideToggle();
		click ++;
		
		if(click == 1){$(this).attr("checked", true);}
		if(click == 2){$(this).attr("checked", false); click = 0;}
		
	});

	$("#voltar").click(function(){
		direct(url_info_users);
	});
	
	$("#envia").click(function(){
		enviar();
	});

}); //end do document ready

function getInfo(){
	var id = getUrlParameter('id');

	var json = {id: id};
	
	$.ajax({
			type: "GET",
			url: url_get_info_user,
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

	var nome = data[0].nome;
	var sobrenome = data[0].sobrenome;
	var email = data[0].email;
	var user = data[0].username;
	var nivel = data[0].nivelpermissao;
				
	if(!sobrenome){sobrenome = ""}
	if(!nivel){nivel = "-1"}

	$("#name").attr('value', nome);
	$("#lastname").attr('value', sobrenome);
	$("#username").attr('value', user);
	$("#email_edit").attr('value', email);
	$("#nivel").find("[value="+nivel+"]").attr("selected", true);

	Materialize.updateTextFields();
	$('select').material_select();
}

function enviar(){
	var id = getUrlParameter('id');

	var nome = $("#name").val();
	var sobrenome = $("#lastname").val();
	var username = $("#username").val();
	var email = $("#email_edit").val();
	var nivel = $("#nivel").val();
	
	var json;

	if($("#checksenha").attr("checked")){
		//console.log("selecionado");
		var senhaatual = $("#senhaatual").val();
		var senhanova = $("#novasenha").val();
		var senhanova2 = $("#novasenha2").val();

		if(senhanova == senhanova2){
			console.log("igual");
			json = {
				id:id,
				nome: nome,
				sobrenome: sobrenome,
				username: username,
				email: email,
				nivel: nivel,
				senhaatual: senhaatual,
				senhanova: senhanova
			}

			requisicaoEnviar(json);
		}
		else{
			//console.log("diferente");
		}
		
	}
	else {

		var senhaatual = '';
		var senhanova = '';

		json = {
				id: id,
				nome: nome,
				sobrenome: sobrenome,
				username: username,
				email: email,
				nivel: nivel,
				senhaatual: senhaatual,
				senhanova: senhanova
			}

		requisicaoEnviar(json);
	}
}

function requisicaoEnviar(json){
	$.ajax({
			type: "POST",
			url: url_post_update_user,
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
						direct(url_info_users);
					}, 2000);
				}
				
			},
			success: function(data, status) {
				$("#success").slideToggle();
				setTimeout(function(){
					$("#success").slideToggle(400);
					direct(url_info_users);
				}, 2000);


			}
	});
}