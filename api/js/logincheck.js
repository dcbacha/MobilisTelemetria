$(function(){
  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('?'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }
  };

  var erro = getUrlParameter('error');

  if(erro == "timeout"){
    $("#errortimeout").stop().slideToggle();

    setTimeout(function(){
      $("#errortimeout").stop().slideToggle(250);
    }, 2500);
  }

  console.log(erro);
});



$("#login").click(function(){
	console.log("clicou");


	var email = $("#email").val();
	var password = $("#password").val();
	//var data = $('form').serialize();
	console.log(email);
	console.log(password);

	var data = {
			email: email,
			password: password
		}

	console.log(data);

	var tablejson = JSON.stringify(data);
	console.log(tablejson);
	//var resposta = $.post('http://localhost/rds/api/login', data);
    var resposta = $('form').serialize();
	console.log(resposta);

  $.ajax({
                type: "POST",
              //  contentType: "application/json",
                //crossDomain: true,
                contentType: "application/x-www-form-urlencoded",
                url:  "http://192.168.0.35/rds/api/login",//"http://localhost/rds/api/login",
                data: data,
                dataType: 'json',
                success: function(data) {
                    //console.error(JSON.stringify(response));

                    
                   // alert(data);
                   console.log("deu bom");
                   console.log(data)
                   var status = data.status;
                   var token = data.token;

                   console.log(status);
                   console.log(token);

                   var arr = token.split('.');
                   var headers = arr[0];
                   var claims = arr[1];
                   var signature = arr[2];
                   console.log("headres:"+headers)
                   console.log("claims:"+claims)
                   console.log("signature:"+signature)

                   var headers_decoded = atob(headers); //decodifica base64 usado no jwt
                   var claims_decoded = atob(claims); 

                   console.log("decoded headers: "+headers_decoded);
                   console.log("decoded claims: "+claims_decoded);
               

                   var url = "?token="+token;

                   document.location = "http://192.168.0.35/rds/api/app/userpage.html"+url;

                   if (data == "Wrong username or password"){
                     $("#loginerror").stop().slideToggle();

                     setTimeout(function(){
                        $("#loginerror").stop().slideUp(250);
                    }, 2500);
                   }

                   
                },
                error: function(data) {
                    
                    console.log(data);
                    console.log("deu ruim");
                     $("#loginerror").stop().slideToggle();

                     setTimeout(function(){
                        $("#loginerror").stop().slideUp(250);
                    }, 2500);


                }


            });

return false;
});