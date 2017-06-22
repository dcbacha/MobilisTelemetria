
function ranking(data, placeholder, param){

	var placeholder = $("#"+placeholder);
	var size = data.length;
	var arr = [];

  	var dataAtual = new Date().getTime();

	for (let i = 0 ; i < size ; i++){
		switch (param){
			case "soh": 
				var d = [data[i].soh, data[i].idcarro];
				arr.push(d);
				break;
			case "aut":
				var d = [data[i].km_kwh, data[i].idcarro];
				arr.push(d);
				break;
			case "efi":
				var d = [data[i].indice_eficiencia, data[i].idcarro];
				arr.push(d);
				break;
			case "last":
				var date = new Date(data[i].last_update).getTime();
				var d = [date, data[i].idcarro];
				arr.push(d);	
		}
	}
	//console.log(arr);
	arr.sort();
	var ranking = arr.reverse();
	//console.log(ranking)

	for(let i = 0 ; i < 5 ; i++){  // ranking dos 5 melhores
		var value = ranking[i][0];
		var id = ranking[i][1];

		switch(param){
			case "soh":
				placeholder.append("<li class='collection-item'><div><strong>"+(i+1)+"º</strong> Carro "+id+""+
			"<span class='secondary-content'>"+value+" %</span></div></li>");
				break;
			case "aut":
				placeholder.append("<li class='collection-item'><div><strong>"+(i+1)+"º</strong> Carro "+id+""+
			"<span class='secondary-content'>"+value+" km</span></div></li>");
				break;
			case "efi":
				placeholder.append("<li class='collection-item'><div><strong>"+(i+1)+"º</strong> Carro "+id+""+
			"<span class='secondary-content'>"+(value*100).toFixed(0)+" %</span></div></li>");
				break;
			case "last":
				value = dataAtual - value;
				var horas = ((value/60000)/60);
				var dias = horas / 24;
					
				if (dias > 0){
					dias = Math.floor(dias);
					horas = horas - dias*24;
				}
					
				var dec = horas %1;
				var min = (((dec*60)/100)*100);

				min = Math.floor(min);
				min = (min < 10 ? '0' : '') + min;
				horas = Math.floor(horas);

				if(dias> 0){ var msg = dias+"d "+horas+"h "+min+"min";}
				else if(dias ==0 && horas > 0 ){ var msg = (horas.toFixed(0))+"h "+min+"min";}
				else { var msg = min+"min";}
						
				placeholder.append("<li class='collection-item'><div><strong>"+(i+1)+"º</strong> Carro "+id+""+
			"<span class='secondary-content'>"+msg+"</span></div></li>");
		}

		
	}
	placeholder.slideDown();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function media(data, placeholder, param, type){

	var placeholder = $("#"+placeholder);
	var containerlegenda = placeholder.parent().next();
	containerlegenda.empty();
	var size = data.length;
	var value = 0;
	var soma = 0;
	
	var updateInterval = 1;
	var valores = [];
	valores[1] = { data: 0,	color: mobilislightblue};
	valores[0] = { data: 100, color: "white" };
	
		
	if(type == "média"){
		for(let i=0; i<size ; i++){
			switch (param){
				case "soh": soma = parseInt(data[i].soh); break;
				case "efi": soma = parseInt(data[i].indice_eficiencia*100);
			}
			value += soma;
		}
		value = value/size;
	}
	else{
		var id = type.split(" ")[1];
		for(let i=0; i<size ; i++){		
			if(data[i].idcarro == id){
				switch (param){
					case "soh": value = parseInt(data[i].soh); break;
					case "efi": 
					//console.log(Math.ceil(data[i].indice_eficiencia*100));
					value = Math.ceil(data[i].indice_eficiencia*100);
				}
			}
		}
	}

	if(value > 80){
		stylelegenda("#26a69a");
	}
	else if(value > 60){
		stylelegenda(colors[1]);
	}
	else{
		stylelegenda("#E6354D");
	}

	function stylelegenda(cor){
		var style = {
			position: "relative",
			top: "-42%",
			left: "52%",
			height: '50px',
			color: cor,
			"font-size": "1.8em",
			"font-weight": 900};

		containerlegenda.css(style);
	}
	
	var plot = $.plot(placeholder, valores, {
		series: {
			pie: { 
				radius: 1,
				innerRadius: 0.85,
				show: true,
				label: {
					 show: false,
                radius: .75,
                formatter: labelFormatter,
                threshold: 0.1
				}
			}

		},
		legend: {
			show: false
		}
	});
	

	var loop = 0;
	function update() {
		containerlegenda.empty();

		if (value > 80){ var cor = "#26a69a"}
		else if (value > 60){ var cor = colors[1]; }
		else{ var cor = "#E6354D";	}
		

		if(loop < value && (value - loop) > 5){
	        valores[1] = {data: 100-loop, color: "grey"};
			valores[0] = {data: loop, color: cor};
			
			loop += 2;
		}
		else if (loop < value && (value - loop) > 2){
			valores[1] = {data: 100-loop, color: "grey"};
			valores[0] = {data: loop, color: cor};

			loop+= 0.5;
		}
		else if (loop < value && (value - loop) > 0){
			valores[1] = {data: 100-loop, color: "grey"};
			valores[0] = {data: loop, color: cor};

			loop+=0.1;
		}
		//console.log(loop, value);

		plot.setData(valores);

 		plot.draw();
 		containerlegenda.append(valores[0].data.toFixed(1)+"%");
 		var plus = 0;
         if(loop - value < 0){
         	  setTimeout(update, updateInterval);
         	  plus = 1;
         }
        
      
    }
 
    update();

}

function labelFormatter(label, series) {
	return "<div style='font-size:0.7em; text-align:center; padding:2px; color:white;'>" + label + "</div>";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function plotPie(data, placeholder, type){

	var placeholder = $("#"+placeholder);
	var size = data.length;
	var total = 0;
	var parcial = [];
	var label = [];

	for(let i=0 ; i < size ; i++){
		total += parseInt(data[i].data);
		parcial[i] = parseInt(data[i].data);
		label[i] = data[i].label;

	}

	

	placeholder.unbind();

	$.plot(placeholder, data, {
		series: {
			pie: { 
				radius: 1,
				innerRadius: 0.5,
				show: true,
				label: {
					 show: true,
                radius: .75,
                formatter: labelFormatter,
                threshold: 0.1
				}
			}
		},
		legend: {
			show: false
		},
		grid: {
            hoverable: true,
            borderWidth: 0
        }
	});

		function toolTip(f, h, x,y, leg, index) {
			var legenda = leg.parent().next();
			//console.log('legenda: ',legenda);
			var place = leg;
			//console.log('place: ',place)
			var pos = place.position();
			var height = place.height();
			var width = place.width();
			
			var absoluto = parseInt(y[0][1]);

			x = Math.round(x);

			absoluto= (absoluto < 100 ? '0' : '') + absoluto;

			switch(type){
				case 'odo': var unidade = ' km'; break;
				case 'hor': var unidade = ' hrs';
			}
			

	 /*     $('<div id="tooltip"><p style="font-size: 1.5em; font-weight: 900;margin: 0px">'+absoluto+'<span style="font-weight: 500; padding-left:5px; margin-bottom:25px;">'+unidade+'</span></p></div>').css({
	        position: 'relative',
	        width: '50px',
	       "font-size": "0.8em",
			"font-weight": 500,
	        color: colors[1],
	        top: top,
	        left: left,
	        'background-color': "transparent",
	        opacity: 0.8
	      }).appendTo(legenda).fadeIn(200)*/

	      	$('<div id="tooltip"><p style="font-size: 1.5em; font-weight: 900;margin: 0px">'+absoluto+'<span id="tooltip2">'+unidade+'</span></p></div>'
	      		).appendTo(legenda).fadeIn(200);

	      	 $("#tooltip2").css({
	      		position: 'relative',
		       "font-size": "0.8em",
				"font-weight": 500,
		        top: -15,
		        left: 7.5
		    });

	      	$("#tooltip").css({
	      		position: 'relative',
		        width: '50px',
		        color: colors[1],
		        top: -(height/2)-33,
		        left: (width/2) - 22,
		        'background-color': "transparent",
		        opacity: 0.8
		    }).fadeIn(200);

		 
	      
	    }

	    var b = null;

	    placeholder.bind('plothover', function (i, k, h) {
	      if (h) {
	        if (b != h.datapoint) {
	          b = h.datapoint;
	          $('#tooltip').remove();
	          var x = h.datapoint[0],
	          	y = h.datapoint[1];
	      
	          var leg = $(this);
	          var index = h.seriesIndex;
	          toolTip(h.pageX, h.pageY, x,y, leg, index);
	        }
	      } else {
	        //$("#tooltip").remove();
	        b = null;
	      }
	    });
}

