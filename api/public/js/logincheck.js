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
                   document.location = url_fleet + url;

                   if (data == "Wrong username or password"){
                     $("#loginerror").stop().slideToggle();

                     setTimeout(function(){
                        $("#loginerror").stop().slideUp(250);
                    }, 2500);
                   } 
                },
                error: function(data) {
                    
                    console.log(data);
                    console.log("Erro no login");
                     $("#loginerror").stop().slideToggle();

                     setTimeout(function(){
                        $("#loginerror").stop().slideUp(250);
                    }, 2500);
                }
            });

return false;
});
