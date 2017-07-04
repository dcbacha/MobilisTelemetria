var token = checktoken();


$("#btncadastro").parent().addClass("active");
$("#btncadastro").addClass("active");
$("#btncadastro").parent().siblings().removeClass("active");


$(function(){
	sessions(token);

	getCars();

	$("#add").click(function(){
		console.log('aeee');
		var url = "?t="+token;
		document.location = url_cadastro+url;
	});

	
});


function getCars(){

	$.ajax({
			type: "GET",
			url: url_global + '/client/listfleet',
			contentType: "application/x-www-form-urlencoded",
			headers: {
			  'Authorization': 'Bearer ' + token
			},
			error: function(data, status, xhr) {
				//console.log("erro ajax get Info");
				console.log(data);
				redirect("timeout");
				
			},
			success: function(data, status) {
				//console.log("sucesso ajax get Info");
				console.log(data);

				createtable(data);

			}
	});

}

function createtable(data){

	var size = data.length;

	for(let i = 0 ; i < size ; i ++){;
		var numserie = data[i].numserie;
		var chaveacesso = data[i].chaveacesso;
		var idresponsavel = data[i].responsavel;
		var id = data[i].idcarro;

		var nome = testAjax(idresponsavel);

		nome.then(function(result){
			console.log(result[0].nome)
			var responsavel = result[0].nome
		


		});

		var html = "<tr>"+
					"<td>"+id+"</td>"+
					"<td>"+numserie+"</td>"+
					"<td>"+chaveacesso+"</td>"+
					"<td>"+responsavel+"</td>"+
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
		document.location = url_edit_user+url+l;
	});

	$(".delete").click(function(){
		var id = $(this).attr('id');
		id = id.split('_')[1];
		console.log(id);

		if(confirm("Tem certeza que gostaria de deletar este usuário?")){
			console.log("deletou");
			deleteCar(id);
		} else{
			console.log("nah");
		}
	});
}

function deleteCar(id) {
	var json = {id: id};
	
	//console.log('nome: ', nome);

	/*$.ajax({
			type: "delete",
			url: url_global + "/client/deletewebuser",
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
				getCars();
			}
	});*/



}

function testAjax(id) {
	var json = {id: id};
  return Promise.resolve($.ajax({
     		type: "get",
			url: url_global + "/client/getInfo",
			contentType: "application/x-www-form-urlencoded",
			data: json,
			headers: {
			  'Authorization': 'Bearer ' + token
			}
  }));
}