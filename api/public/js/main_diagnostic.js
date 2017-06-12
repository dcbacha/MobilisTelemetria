var token = checktoken();

$("#btndiagnostic").parent().addClass("active");
$("#btndiagnostic").addClass("active");
$("#btndiagnostic").parent().siblings().removeClass("active");

var total = 1;

$(function(){
	sessions(token);
	$('select').material_select();
	

	$("#btnsolicitar").click(function(){
		
		solicitar();
	});

	$("#btnadicionar").click(function(){
		addProblem();
		$("#delete1").show();
	});

	$("#problem1").change(function(){
		console.log($(this).val());

		var arr = $(this).val();

		if( arr == "outros"){
			var id = $("#idselect1");
			id.removeClass("s8");
			id.addClass("s4");

			$("#idother1").show();

		}
	});

	var del = $(".delete");
	var position = del.parent().position();
	var width = del.parent().width();
	$(".delete").css({
		position: "relative",
		top: 0,
		left: width -50
	})

	del.click(function(){
		$("#card1").slideUp();
		setTimeout(function(){
			$("#card1").remove();
		}, 500);
		
	});
	
	return false;
});

$.ajax({
	type: "GET",
	//url: "http://192.168.0.35/rds/api/public/listfleet",
	url: url_req_fleet,
	dataType: 'json',
	data: {
		alt: 'json-in-script'
	},
	headers: {
		'Authorization': 'Bearer ' + token
	},
	error: function(data, status) {
		console.log("erro ajax");
		console.log(data);
		console.log(data.responseText)
		//redirect("timeout");
	},
	success: function(data, status) {
		console.log("sucesso ajax");
		//console.log(data);
		processData(data);
	
	}
});

function processData(data){

	var num_carros = data.length;

	for(let i =0; i < num_carros ; i++){

		var idcarro = data[i].idcarro;
		var numserie = data[i].numserie;

		$("#dinamicSelect1").append("<option value='"+idcarro+"'>Carro "+idcarro+"</option>");
	}

	$('select').material_select();
}


function addProblem(){
	total ++;

	var html = "<div class='row' id='card"+total+"' hidden>"+
		      "<div class='col s12 m12'>"+
		        "<div class='card-panel white'>"+
		        	"<a class='btn-flat delete' id='delete"+total+"'>"+
		          	"<i class='material-icons'>delete</i>"+
		          	"</a>"+
				"<div class='row'>"+
					"<div class='input-field col s4'>"+
						"<select id='dinamicSelect"+total+"'>"+
						    "<option value='' disabled selected></option>"+
						"</select>"+
						"<label>Selecione o Veículo</label>"+
					"</div>"+

				    "<div class='input-field col s8'  id='idselect"+total+"'>"+
				    "<select multiple id='problem"+total+"'>"+
				        "<option value='1'>Option 1</option>"+
				        "<option value='2'>Option 2</option>"+
				        "<option value='3'>Option 3</option>"+
				        "<option value='4'>Option 4</option>"+
				        "<option value='outros'>Outros</option>"+
				    "</select>"+
				    "<label>Problema</label>"+
				    "</div>"+

				    "<div class='input-field col s4' id='idother"+total+"' hidden>"+
				          "<input placeholder='Qual outro tipo de problema?' id='outro"+total+"' type='text' class='validate'>"+
				          "<label for='outro"+total+"'>Outro</label>"+
				    "</div>"+
	  
	  			"</div>"+

	    		"<div class='row'>"+
				     "<div class='col s12'>"+
				         " Descricao do Problema:"+
				          "<div class='input-field inline col s12'>"+
				            "<input id='descricao1' type='text'>"+
				          "</div>"+
				        "</div>"+
	    
	    		"</div>"
	    		 "</div>"+
			  "</div>"+
			  "</div>";

    $("#formulario").append(html);
    $("#card"+total).slideDown();

    iniciate(total);
    

}
var htmlfleet;
var click = 0;

function iniciate(total){
	click++;
	var del = $(".delete");
	var position = del.parent().position();
	var width = del.parent().width();
	$(".delete").css({
		position: "relative",
		top: 0,
		left: width -50
	})
	
	$("#select"+total).change(function(){
		console.log($(this).val());


		var arr = $(this).val();
		if( $.inArray("outros", arr ) > -1 ){
			console.log("entrou");
			var id = $("#idselect"+total);
			id.removeClass("s8");
			id.addClass("s4");

			$("#idother"+total).show();

		}
	});

	$("#delete"+total).click(function(){
		$("#card"+total).slideUp();
		setTimeout(function(){
			$("#card"+total).remove();
		}, 500);
		
		$('select').material_select();
	});
	
	if(click == 1){
		htmlfleet = $("#dinamicSelect1")[0].innerHTML;
	}
	
	$("#dinamicSelect"+total).append(htmlfleet);

    $('select').material_select();

}

function solicitar(){

		if(!$("#dinamicSelect1").val() || !$("#problem1").val() || !$("#descricao1").val()){
			$("#errodados").stop().slideToggle();
			setTimeout(function(){
				$("#errodados").stop().slideToggle(400);
			}, 2000);
		}
		else{

			$("#loading").show();
			if($("#problem1").val() == "outros"){
				var outro = $("#outro1").val();
			}
			else{
				var outro = "";
			}
			var carro = $("#dinamicSelect1").val();
			var problema = $("#problem1").val();
			var descricao = $("#descricao1").val();

			var json = {
				carro: carro,
				problema: problema,
				outro: outro,
				descricao: descricao
			}	

			$.ajax({
				type: "PUT",
				url: url_req_diagnostic_mail,
				dataType: 'json',
				data: json,
				headers: {
					'Authorization': 'Bearer ' + token
				},
				error: function(data, status) {
					console.log("erro ajax diagnostico mail");
					console.log(data);
					console.log(data.responseText)

					if(data.responseText == "Email enviado com sucesso"){
						$("#success").stop().slideToggle();
						setTimeout(function(){
							$("#success").stop().slideToggle(400);
						}, 5000);
					}
					else{
						$("#erromail").stop().slideToggle();
					}

					$("#loading").hide();
				},
				success: function(data, status) {
					console.log("sucesso ajax diagnostico mail");
					console.log(data);
					if(data.responseText == "Email enviado com sucesso"){
						$("#success").stop().slideToggle();
						setTimeout(function(){
							$("#success").stop().slideToggle(400);
						}, 5000);
					}
					else{
						$("#erromail").stop().slideToggle();
					}
					
					$("#loading").hide();
				}
			});

		}
}