var token = checktoken();


$("#btnveiculos").parent().addClass("active");
$("#btnveiculos").addClass("active");
$("#btnveiculos").parent().siblings().removeClass("active");


$(function(){
	sessions(token);
	styleDropdown(1);

	getCars();

	$("#add").click(function(){
		console.log('aeee');
		direct(url_cadastro_car);
	});

	
});


function getCars(){
	$.ajax({
			type: "GET",
			url: url_get_fleet,
			contentType: "application/x-www-form-urlencoded",
			headers: { 'Authorization': 'Bearer ' + token },
			error: function(data, status, xhr) {
				redirect("timeout");
			},
			success: function(data, status) {
				createtable(data);
			}
	});

}

function createtable(data){

	var size = data.length;
	console.log(data);

	for(let i = 0 ; i < size ; i ++){;
		var numserie = data[i].numserie;
		var chaveacesso = data[i].chaveacesso;
		var responsavel = data[i].nome;
		var id = data[i].idcarro;

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
		document.location = url_edit_car+url+l;
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
	

	$.ajax({
			type: "delete",
			url: url_delele_car,
			contentType: "application/x-www-form-urlencoded",
			data: json,
			headers: {'Authorization': 'Bearer ' + token },
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
	});



}
