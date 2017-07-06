//*********************** Variaveis Globais **********************//
var url_global = "https://mobilis.eco.br/api/public"; // "http://192.168.0.35/rds/api/public"; //     

//link views
var url_home = 		url_global + '/home',
url_dashboard =		url_global + '/dashboard',
url_maintenance = 	url_global + '/maintenance',
url_evt_fleet = 	url_global + '/evtfleet',
url_evt_drivers = 	url_global + '/evtdrivers',
url_info_users =	url_global + '/webusers',
url_info_drivers =	url_global + '/drivers',
url_info_cars = 	url_global + '/cars',
url_cadastro = 		url_global + '/reg',
url_cadastro_car = 	url_global + '/regvehicle',
url_cadastro_mot = 	url_global + '/regdriver',
url_edit_user = 	url_global + '/edit',
url_edit_car = 		url_global + '/editcar',
url_edit_driver = 	url_global + '/editdriver',
url_diagnostic = 	url_global + '/diagnostic',
url_faq	=			url_global + '/faq',
url_contato = 		url_global + '/contato',
url_config = 		url_global + '/config',
url_trouble = 		url_global + '/trouble';

// links requisições servidor
var url_post_login = 		url_global + '/client/auth',
url_post_new_password = 	url_global + '/client/newpassword',
url_post_update_user =		url_global + '/client/updateuser',
url_post_update_driver =	url_global + '/client/updatedriver',
url_post_update_car =		url_global + '/client/updatecar',

url_get_events = 			url_global + '/client/readevents',
url_get_log_perm = 			url_global + '/client/readlogperm',
url_get_fleet = 			url_global + '/client/listfleet',
url_get_group =				url_global + '/client/listgroup',
url_get_info_user = 		url_global + '/client/getinfo',
url_get_info_car =			url_global + '/client/getinfo-car',
url_get_info_driver =		url_global + '/client/getinfo-driver',
url_get_webuser = 			url_global + '/client/getwebuser',
url_get_drivers =			url_global + '/client/getdrivers',

url_put_cadastro = 			url_global + '/client/register',
url_put_cadastro_car = 		url_global + '/client/registercar',
url_put_cadastro_driver = 	url_global + '/client/registerdriver',
url_put_diagnostic_mail =	url_global + '/client/maildiagnostic',

url_delete_webuser = 		url_global + '/client/deletewebuser',
url_delete_driver = 		url_global + '/client/deletedriver',
url_delete_car = 			url_global + '/client/deletecar'

url_get_can = 				url_global + '/plotter' ;

//variaveis globais
var arr_danger = ["FI01", "FI02", "FI03", "L5690"];
var arr_warning = ["AI01", "AI02", "AI03", "AI04", "AI05", "AI06", "AI07", "AI08"];
var num_warnings = 0;

var horimetro_total =0;
var odometro_total =0;

//******************* Botões do Tamplate *************************//
$("#logout").click(function(){ 			document.location = url_home; });
$("#btnfleet").click(function(){ 		direct(url_evt_fleet); });
$("#btndriver").click(function(){ 		direct(url_evt_drivers); });
$("#btndiagnostic").click(function(){ 	direct(url_diagnostic); });
$("#btnusers").click(function(){ 		direct(url_info_users); });
$("#btnveiculos").click(function(){ 	direct(url_info_cars); });
$("#btnmotoristas").click(function(){ 	direct(url_info_drivers); });
$("#btndashboard").click(function(){ 	direct(url_dashboard); });
$("#btnmaintenance").click(function(){ 	direct(url_maintenance); });
$("#btnfaq").click(function(){ 			direct(url_faq); });
$("#btncontato").click(function(){ 		direct(url_contato); });
$("#btnconfig").click(function(){ 		direct(url_config); });
$("#btntrouble").click(function(){ 		direct(url_trouble); });

function direct(new_window){
	var url = "?t="+token;
	document.location = new_window+url;
}

//******************* Configurações Menu Lateral ****************//
$('.button-collapse').sideNav({
    menuWidth: 210,
    edge: 'left',
    closeOnClick: false
   	}
);
//************************ Funções comuns ************************//

function minTwoDigits(n) {
	return (n < 100 ? '0' : '') + n;
}

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

//************** Funções de requisições BD ********//

function req_logperm(){
	$.ajax({
		type: "GET",
		url: url_get_log_perm,
		headers: {
		  'Authorization': 'Bearer ' + token
		},
		error: function(data, status) {
			redirect("timeout");
		},
		success: function(data, status) {
			processLogPerm(data);
		}
	});

}

function req_evt(){
	$.ajax({
		type: "GET",
		url: url_get_events,
		headers: {
		  'Authorization': 'Bearer ' + token
		},
		error: function(data, status) {
			redirect("timeout");
		},
		success: function(data, status) {
			processEvt(data);
		}
	});
}

function req_fleet(){
	$.ajax({
		type: "GET",
		url: url_get_fleet,
		dataType: 'json',
		headers: {
			'Authorization': 'Bearer ' + token
		},
		error: function(data, status) {
			redirect("timeout");
		},
		success: function(data, status) {
			processFleet(data);
		}
	});
}


///////nav bar dropdown style///////
function styleDropdown(n){

	switch (n){
		case 1: var elem = $("#btnusers").parent().parent().parent(); break;
		case 2:	var elem = $("#btnfaq").parent().parent().parent();
	}

	elem.css({'display': 'block'});
	elem.prev().css({ 'background-color': 'rgba(0, 0, 0, 0.05)'});
	elem.prev().css({'border-right': '2px solid #ee6e73'});
	
}