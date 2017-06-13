var token = checktoken();

$("#btnfaq").parent().addClass("active");
$("#btnfaq").addClass("active");
$("#btnfaq").parent().siblings().removeClass("active");



$(function(){

	sessions(token);
	$('select').material_select();
	$("#btnfaq").parent().parent().parent().css({'display': 'block'});

	$("#contato").click(function(){
		var url = "?t="+token;
	document.location = url_contato+url;
	});

});