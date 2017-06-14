$(function(){

  var erro = getUrlParameter('error');

  if(erro == "timeout"){
    $("#errortimeout").stop().slideToggle(400);

    setTimeout(function(){
      $("#errortimeout").stop().slideToggle(400);
    }, 5000);
  }
  else if(erro == 'unauthorized'){
      $("#errorunauthorized").stop().slideToggle(400);
  }
});



$("#login").click(function(){
	var email = $("#email").val();
	var password = $("#password").val();

	var data = {
			email: email,
			password: password
		};

  $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: url_req_login,
                data: data,
                dataType: 'json',
                success: function(data) {
                   console.log(data)
                   var status = data.status;
                   var token = data.token;

                   var arr = token.split('.');
                   var url = "?t="+token;
                   document.location = url_dashboard + url;

                   if (data == "Wrong username or password"){
                     $("#loginerror").stop().slideToggle();

                     setTimeout(function(){
                        $("#loginerror").stop().slideUp(250);
                    }, 2500);
                   } 
                },
                error: function(data, status, message) {
                     console.log(data);
                    console.log(data.responseText);
                    console.log(status);
                  //  console.log(message);
                    console.log("Erro no login");
                     $("#loginerror").stop().slideToggle();

                     setTimeout(function(){
                        $("#loginerror").stop().slideUp(250);
                    }, 2500);
                }
            });

return false;
});


$("#esqueci").click(function(){

  $("#principal").slideToggle(500);
  $("#secundario").slideToggle(500);
});

$("#voltar").click(function(){

  $("#principal").slideToggle(500);
  $("#secundario").slideToggle(500);

});

$("#generate").click(function(){
  $("#loading").slideToggle();
  console.log("generate");
  console.log($("#name2").val());

  var email = $("#email2").val();
  var name = $("#name2").val();

  var data = {
      email: email,
      name: name
    };

    console.log(data);

    $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                url: url_req_new_password,
                data: data,
                dataType: 'json',
                success: function(data) {
                   console.log(data);
                   $("#loading").slideToggle();

                     $("#success2").stop().slideToggle();

                     


                },
                error: function(data, status, message) {
                  $("#loading").slideToggle();
                    console.log(data);
                    console.log(data.responseText);

                    if(data.responseText == "Usuario nao existe"){
                      console.log("deuruim");
                      $("#erroruser").stop().slideToggle();

                     setTimeout(function(){
                        $("#erroruser").stop().slideUp(250);
                      }, 2500);
                    
                    }
                    console.log(status);
               
                }
    });

});
