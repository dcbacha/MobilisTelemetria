//*********************** Variaveis Globais **********************//
var url_global = "http://192.168.0.3/rds/MobilisTelemetria/api/public";

//link views
var url_fleet = 	url_global + "/fleet",
url_drivers = 		url_global + "/drivers",
url_home = 			url_global + "/home",
url_diagnostic = 	url_global + "/diagnostic",
url_cadastro = 		url_global + "/register",
url_cadastro_car = 	url_global + "/registervehicle",
url_dashboard =		url_global + "/dashboard",
url_edit_user = 	url_global + "/edit",
url_maintenance = 	url_global + "/maintenance";

 

// links servidor
var url_req_readdata = 		url_global + "/carros/readdata",
url_req_readdata_driver = 	url_global + "/carros/readdata-motor",
url_req_login = 			url_global + "/login",
url_req_cadastro = 			url_global + "/cadastro",
url_req_cadastro_car = 		url_global + "/cadastroveiculo",
url_req_log_perm = 			url_global + "/listlogperm",
url_req_getInfo = 			url_global + "/getInfo",
url_req_refresh_user =		url_global + "/refreshuser";

//variaveis globais
var arr_danger = ["FI01", "FI02", "FI03", "L5690"];//["L5690"]; //["FI01", "FI02", "FI03"];
var arr_warning = ["erro1"]; //["AI01", "AI02", "AI03", "AI04", "AI05", "AI06", "AI07", "AI08"];
var num_warnings = 0;

var horimetro_total =0;
var odometro_total =0;


//******************* Botões do Tamplate *************************//
$("#logout").click(function(){
	document.location = url_home;
});

$("#btnfleet").click(function(){
	var url = "?t="+token;
	document.location = url_fleet+url;
});

$("#btndriver").click(function(){
	var url = "?t="+token;
	document.location = url_drivers+url;
});

$("#btndiagnostic").click(function(){
	var url = "?t="+token;
	document.location = url_diagnostic+url;
});

$("#btncadastro").click(function(){
	var url = "?t="+token;
	document.location = url_cadastro+url;
});

$("#btncadastroveiculo").click(function(){
	var url = "?t="+token;
	document.location = url_cadastro_car+url;
});

$("#btndashboard").click(function(){
	var url = "?t="+token;
	document.location = url_dashboard+url;
});

$("#btnmaintenance").click(function(){
	var url = "?t="+token;
	document.location = url_maintenance+url;
});


$('.button-collapse').sideNav({
    menuWidth: 200, // Default is 200
    edge: 'left', // Choose the horizontal origin
    closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
   	}
);
//***************************************************************//





function dateconvert(variable){
	var parts = variable.split(" ");
	var date = parts[0].split("-");
   	var dia = date[2];
   	var mes = date[1];
   	var ano = date[0];

   	var data = dia+"/"+mes+"/"+ano;

   	return data;
}

function timeconvert(variable){
	var parts = variable.split(" ");
	//var date_evt = parts_evt[0];
	var horario = parts[1];

	return horario;
}

var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('?'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
};

function redirect(erro){
	var url = "?error="+erro;
    document.location = url_home+url;
}

function sessions(token){

	var arr = token.split('.');
    var claims = arr[1];
    var claims_decoded = jQuery.parseJSON(atob(claims));
   // console.log(claims_decoded);
    var user = claims_decoded.nme;
    var email = claims_decoded.eml;

    $("#usuario").text(user);
    $("#email").text(email);

}

function checktoken(){
	var token = getUrlParameter('t');

	if(token){
		return token;
	}
	else{
		console.log("nao tem token em");
		redirect("unauthorized");
	}
}

function warningcheck(errorcode, dados, id_carro){

	if($.inArray(errorcode, arr_warning) > -1){
		status = "warning";
		num_warnings++;
		$("#warning").append("- "+dados+" no carro "+id_carro+"</br>");
		$("#warning").show();

	}
	else if($.inArray(errorcode, arr_danger) > -1){
		status = "danger";

		$("#warning").append("- "+dados+" no carro "+id_carro+"</br>");
		$("#warning").show();
		num_warnings++;
	}
	else{
		status = 'ok';
	}

	return status;
}

function warningset(){

	if(num_warnings == 0){
		$("#section-warning").hide();
		$("#section-congrats").show();
	}
	else{

		$("#loadingWarning").removeClass("active");
		$(".warning").addClass("warningcolor");
		$(".danger").addClass("dangercolor");
	}
}

function req_logperm(){
	$.ajax({
	type: "GET",
	//url: url_req_readdata,
	url: url_req_log_perm,
	headers: {
	  'Authorization': 'Bearer ' + token
	},
	error: function(data, status) {
		console.log("erro ajax -> main fleet");
		//console.log(data);
		console.log(data.responseText);
		//redirect("timeout");
	},
	success: function(data, status) {
		//console.log(data);
		processLogPerm(data);
		//inicializacao();
	}
	});

}

function req_evt(){
	$.ajax({
			type: "GET",
			//url: url_req_readdata,
			url: url_req_readdata_driver,
			headers: {
			  'Authorization': 'Bearer ' + token
			},
			error: function(data, status) {
				console.log("erro ajax -> main fleet");
				//console.log(data);
				console.log(data.responseText);
				redirect("timeout");
			},
			success: function(data, status) {
				//console.log(data);
				processEvt(data);
				begin();
			}
		});
}