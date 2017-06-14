var token = checktoken();

$("#btncontato").parent().addClass("active");
$("#btncontato").addClass("active");
$("#btncontato").parent().siblings().removeClass("active");



$(function(){

	sessions(token);
	$('select').material_select();
	//$("#btncontato").parent().parent().parent().css({'display': 'block'});
	styleDropdown(2);
});