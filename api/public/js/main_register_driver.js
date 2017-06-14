var token = checktoken();

$("#btncadastromotorista").parent().addClass("active");
$("#btncadastromotorista").addClass("active");
$("#btncadastromotorista").parent().siblings().removeClass("active");



$(function(){

	sessions(token);

	styleDropdown(1);

	$('select').material_select();
	//$("#btncadastromotorista").parent().parent().parent().css({'display': 'block'});
	
});