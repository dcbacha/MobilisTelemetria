var token = checktoken();

$("#btnconfig").parent().addClass("active");
$("#btnconfig").addClass("active");
$("#btnconfig").parent().siblings().removeClass("active");



$(function(){

	sessions(token);
	$('select').material_select();
	//$("#btnconfig").parent().parent().parent().css({'display': 'block'});
	styleDropdown(1);
});