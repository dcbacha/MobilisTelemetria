var token = checktoken();

/*
$("#btnusers").parent().addClass("active");
$("#btnusers").addClass("active");
$("#btnusers").parent().siblings().removeClass("active");
*/
$("#btnusers").parent().addClass("active");
$("#btnusers").addClass("active");
$("#btnusers").parent().siblings().removeClass("active");


$(function(){
	sessions(token);
	styleDropdown(1);
	getWebUsers();

	$("#add").click(function(){
		direct(url_cadastro);
	});
});


function getWebUsers(){
	$.ajax({
			type: "GET",
			url: url_get_webuser,
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

	for(let i = 0 ; i < size ; i ++){
		var nome = data[i].nome;
		var sobrenome = data[i].sobrenome;
		var email = data[i].email;
		var username = data[i].username;
		var nivel = data[i].nivelpermissao;
		var id = data[i].idusuario;

		var html = "<tr>"+
					"<td>"+(i+1)+".</td>"+
					"<td>"+nome+"</td>"+
					"<td>"+sobrenome+"</td>"+
					"<td>"+email+"</td>"+
					"<td>"+username+"</td>"+
					"<td>"+nivel+"</td>"+
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
			deleteUser(id);
		} else{
			console.log("nah");
		}
	});
}

function deleteUser(id) {
	var json = {id: id};

	$.ajax({
			type: "delete",
			url: url_delete_webuser,
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
				getWebUsers();
			}
	});



}