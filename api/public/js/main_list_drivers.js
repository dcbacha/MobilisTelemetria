var token = checktoken();

$("#btnmotoristas").parent().addClass("active");
$("#btnmotoristas").addClass("active");
$("#btnmotoristas").parent().siblings().removeClass("active");


$(function(){
	sessions(token);
	styleDropdown(1);
	getDrivers();

	$("#add").click(function(){
		direct(url_cadastro_mot);
	});
});


function getDrivers(){
	$.ajax({
			type: "GET",
			url: url_get_drivers,
			contentType: "application/x-www-form-urlencoded",
			headers: { 'Authorization': 'Bearer ' + token },
			error: function(data, status, xhr) {
				redirect("timeout");
				console.log(data.responseText);
			},
			success: function(data, status) {
				createtable(data);
			}
	});

}

function createtable(data){

	var size = data.length;
	console.log(data);

	for(let i = 0 ; i < size ; i ++){
		var nome = data[i].nome;
		var sobrenome = data[i].sobrenome;
		var nummatricula = data[i].nummatricula;
		var idade = data[i].idade;
		var sexo = data[i].sexo;
		var cnh = data[i].cnh;
		var email = data[i].email;
		var telefone = data[i].telefone;
		var departamento = data[i].departamento;
		var responsavel = data[i].responsavel;
		var turno = data[i].turno;
		var permhoraextra = data[i].permhoraextra;

		var id = data[i].idmotorista;

		var html = "<tr>"+
					"<td>"+nome+"</td>"+
  					"<td>"+sobrenome+"</td>"+
  					"<td>"+nummatricula+"</td>"+
		  			"<td>"+idade+"</td>"+
		  			"<td>"+sexo+"</td>"+
			        "<td>"+cnh+"</td>"+
			        "<td>"+email+"</td>"+
			        "<td>"+telefone+"</td>"+
			        "<td>"+departamento+"</td>"+
			        "<td>"+responsavel+"</td>"+
			        "<td>"+turno+"</td>"+
			        "<td>"+permhoraextra+"</td>"+
					"<td class='center'>"+
						"<a class='btn-flat edit' id='id1_"+id+"'>"+
							"<i class='material-icons valign-wrapper'>mode_edit</i>"+
						"</a>"+
						"<a class='btn-flat delete' id='id2_"+id+"'>"+
							"<i class='material-icons valign-wrapper'>delete_forever</i>"+
						"</a>"+
					"</td>"+
					"</tr>";

		$("#users tbody").append(html);
	}

	$(".edit").click(function(){
		var id = $(this).attr('id');
		id = id.split('_')[1];

		var url = "?t="+token;
		var l = "?id="+id;
		document.location = url_edit_driver+url+l;
	});

	$(".delete").click(function(){
		var id = $(this).attr('id');
		id = id.split('_')[1];
		console.log(id);

		if(confirm("Tem certeza que gostaria de deletar este usuário?")){
			console.log("deletou");
			deleteDriver(id);
		} else{
			console.log("nah");
		}
	}); 
}

function deleteDriver(id) {
	var json = {id: id};

	$.ajax({
			type: "delete",
			url: url_delete_driver,
			contentType: "application/x-www-form-urlencoded",
			data: json,
			headers: {
			  'Authorization': 'Bearer ' + token
			},
			error: function(data, status, xhr) {
				//console.log("erro ajax get Info");
				console.log(data);
				console.log(data.responseText)
				
			},
			success: function(data, status) {
				//console.log("sucesso ajax get Info");
				console.log(data);
				$("#users tbody").empty();
				getDrivers();
			}
	});



}