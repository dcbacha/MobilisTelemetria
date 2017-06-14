var token = checktoken();

$("#btntrouble").parent().addClass("active");
$("#btntrouble").addClass("active");
$("#btntrouble").parent().siblings().removeClass("active");



$(function(){

	sessions(token);
	$('select').material_select();
	//$("#btntrouble").parent().parent().parent().css({'display': 'block'});
	styleDropdown(2);
});