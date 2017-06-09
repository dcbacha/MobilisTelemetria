
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
			"<span class='secondary-content'>"+value+"%</span></div></li>");
				break;
			case "aut":
				placeholder.append("<li class='collection-item'><div><strong>"+(i+1)+"º</strong> Carro "+id+""+
			"<span class='secondary-content'>"+value+"km/kwh</span></div></li>");
				break;
			case "efi":
				placeholder.append("<li class='collection-item'><div><strong>"+(i+1)+"º</strong> Carro "+id+""+
			"<span class='secondary-content'>"+(value*100)+" %</span></div></li>");
				break;
			case "last":
					value = dataAtual - value;
					var minutos = (value/60000);
					var horas = (minutos/60);

					var dec = horas %1;
					var min = (((dec*60)/100)*100).toFixed(0);
					min = minTwoDigits(min);


						
				placeholder.append("<li class='collection-item'><div><strong>"+(i+1)+"º</strong> Carro "+id+""+
			"<span class='secondary-content'>Há "+(horas.toFixed(0))+"h "+min+"min</span></div></li>");
		}

		
	}
}

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
					case "efi": value = parseInt(data[i].indice_eficiencia*100);
				}
			}
		}
	}

	if(value > 80){
		stylelegenda(mobilisgreen)
	}
	else if(value > 60){
		stylelegenda(mobilislightblue)
	}
	else{
		stylelegenda(mobilisred)
	}

	function stylelegenda(cor){
		var style = {
			position: "absolute",
			top: "50%",
			left: "50%",
			color: cor,
			"font-size": "1.8em",
			"font-weight": 900 };

		containerlegenda.css(style);
	}
	
	var plot = $.plot(placeholder, valores, {
		series: {
			pie: { 
				radius: 1,
				innerRadius: 0.9,
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

		if (value > 80){ var cor = mobilisgreen}
		else if (value > 60){ var cor = mobilislightblue; }
		else{ var cor = mobilisred;	}
		

		if(loop < value && (value - loop) > 5){
	        valores[1] = {data: loop, color: cor};
			valores[0] = {data: 100-loop, color: "white"};
			
			loop += 2;
		}
		else if (loop < value && (value - loop) > 2){
			valores[1] = {data: loop, color: cor};
			valores[0] = {data: 100-loop, color: "white"};

			loop+= 0.5;
		}
		else if (loop < value && (value - loop) > 0){
			valores[1] = {data: loop, color: cor};
			valores[0] = {data: 100-loop, color: "white"};

			loop+=0.1;
		}

		plot.setData(valores);

 		plot.draw();
 		containerlegenda.append(valores[1].data.toFixed(1)+"%");
         if(loop - value < 0){
         	  setTimeout(update, updateInterval);
         }
      
    }
 
    update();

}