var token = checktoken();

$("#btncadastromotorista").parent().addClass("active");
$("#btncadastromotorista").addClass("active");
$("#btncadastromotorista").parent().siblings().removeClass("active");



$(function(){

	sessions(token);
	$('select').material_select();
	$("#btncadastromotorista").parent().parent().parent().css({'display': 'block'});
	
});