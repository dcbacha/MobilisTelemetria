var token = checktoken();

$("#btnmotoristas").parent().addClass("active");
$("#btnmotoristas").addClass("active");
$("#btnmotoristas").parent().siblings().removeClass("active");



$(function(){

	sessions(token);

	styleDropdown(1);

	$('select').material_select();
	//$("#btncadastromotorista").parent().parent().parent().css({'display': 'block'});
	
});