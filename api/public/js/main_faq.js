var token = checktoken();

$("#btnfaq").parent().addClass("active");
$("#btnfaq").addClass("active");
$("#btnfaq").parent().siblings().removeClass("active");



$(function(){

	sessions(token);
	$('select').material_select();
	styleDropdown(2);

	$("#contato").click(function(){
		direct(url_contato);
	});

});