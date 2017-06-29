$.get('../static/LogEventosTeste.csv', function(data) {
  // alert(data);
   //process text file line by line
  // $('#div').html(data.replace('n',''));

  //console.log(data);

  var encData = btoa(data);

  //console.log(encData);

  var obj = {
  		status: "TesteLogOK-enc",
  		dados: encData
  };

  var json = JSON.stringify(obj);
  //console.log(json);

  	$.ajax({
			type: "POST",
			//url: "http://192.168.0.35/rds/api/public/rpi",
			url: url_global + "/car/dados/eventos",
			//url: url_req_readdata_driver,
			contentType: "application/json",
			//dataType: 'json',
			data: json,
			//data: {
			//  alt: 'json-in-script'
			//},
			//headers: {
			//  'Authorization': 'Bearer ' + token
			//},
			error: function(data, status) {
				console.log("erro ajax");
				console.log(data);
				console.log(data.responseText)
				//redirect("timeout");
	
			},
			success: function(data, status) {
				console.log("sucesso ajax");
				console.log(data);
				
			}
		
	});

});