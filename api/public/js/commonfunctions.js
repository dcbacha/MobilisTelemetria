//*********************** Variaveis Globais **********************//
var url_global = "http://192.168.0.35/rds/api/public";

//link views
var url_fleet = 	url_global + "/fleet";
var url_drivers = 	url_global + "/drivers";
var url_home = 		url_global + "/home";
var url_diag_req = 	url_global + "/diagRequest";
var url_cadastro = 	url_global + "/cadastro";

// links servidor
var url_req_readdata = 			url_global + "/carros/readdata";
var url_req_readdata_driver = 	url_global + "/carros/readdata-motor";
var url_req_login = 			url_global + "/login";
var url_req_cadastro = 			url_global + "/subscribe";

//variaveis globais
var arr_danger = ["L5690"]; //["FI01", "FI02", "FI03"];
var arr_warning = ["erro1"]; //["AI01", "AI02", "AI03", "AI04", "AI05", "AI06", "AI07", "AI08"];
var num_warnings = 0;

var horimetro_total =0;
var odometro_total =0;

//***************************************************************//


//******************* Botões do Tamplate *************************//
$("#logout").click(function(){
	document.location = url_home;
});

$("#btnfleet").click(function(){
	var url = "?t="+token;
	//document.location = "http://192.168.0.35/rds/api/public/fleet"+url;
	document.location = url_fleet+url;
});

$("#btndriver").click(function(){
	var url = "?t="+token;
	//document.location = "http://192.168.0.35/rds/api/public/drivers"+url;
	document.location = url_drivers+url;
});

$("#btndiagnostic").click(function(){
	var url = "?t="+token;
	//document.location = "http://192.168.0.35/rds/api/public/drivers"+url;
	document.location = url_diag_req+url;
});

$("#btncadastro").click(function(){
	var url = "?t="+token;
	//document.location = "http://192.168.0.35/rds/api/public/drivers"+url;
	document.location = url_cadastro+url;
});


$('.button-collapse').sideNav({
    menuWidth: 240, // Default is 240
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
    var user = claims_decoded.nome;
    var email = claims_decoded.email;

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
