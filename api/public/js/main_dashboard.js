var token = checktoken();

$("#btndashboard").parent().addClass("active");
$("#btndashboard").parent().siblings().removeClass("active");

var mobilisblue = "#2A1856";
var mobilislightblue = "#4Ec1E0";
var mobilisred = "#E6354D";
var orange = "#e06d4e";
var colors = ["#4ec1e0", "#4e78e0", "#4ee0b6"];

$(function(){

	sessions(token);
	$(".legendColorBox").children().css({"width" : "14px", "margin-left": "0px"});
	$(".legendColorBox").css({"max-width":"16px"})
	//$(".legendLabel").children().css({"max-width": "50px"});
		

}); //end do document ready

$.ajax({
	type: "GET",
	//url: url_req_readdata,
	url: url_req_log_perm,
	headers: {
	  'Authorization': 'Bearer ' + token
	},
	error: function(data, status) {
		console.log("erro ajax -> main fleet");
		//console.log(data);
		console.log(data.responseText);
		//redirect("timeout");
	},
	success: function(data, status) {
		console.log(data);
		processData(data);
		//inicializacao();
	}
});

function processData(data){

	var size = data.length;
	console.log(size);

	var d1 = [];
	var d2 = [];
	var d3 = [];

	var rawData =[];
	var ticks = [];

	var b = 224;


	for (let i = 0; i < size; i++) {

		var	horimetro = data[i].horimetro;
		var odometro = data[i].odometro;
		var idcarro = data[i].idcarro;
		var	temp_bateria = data[i].temp_max_bateria;
	

		if(i > 2){
			var rest = i % 3;
			var azul = colors[rest];
		}
		else{
			var azul = colors[i];
		}
		

		d1[i] = {
			label: "Carro " + (idcarro),
			data: horimetro,
			color: azul
		}

		d2[i] = {
			label: "Carro " + (idcarro),
			data:[ [i, parseInt(temp_bateria)]],
			color: "#333"
		}

		d3[i] = {
			label: "Carro " + (idcarro),
			data: odometro,
			color: azul
		}

		rawData.push([parseInt(temp_bateria), i]);
		ticks.push([i, "Carro "+ idcarro ]);

	}



	plotPie(d1, "placeholder");
	plotPie(d3, "placeholder9")

	plotBars(d2 , "placeholder2");
	plotBarsHorizontal(rawData, ticks);
	stacking(data);
	multipleBars(data);
	ranking(data, "placeholder6", "soh");
	ranking(data, "placeholder7", "aut");
	ranking(data, "placeholder8", "efi");
	
	media2(data, "placeholder10", "soh");
	media2(data, "placeholder11", "ief");

		
	
}

function plotPie(data, placeholder){

	var placeholder = $("#"+placeholder);
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
}

function labelFormatter(label, series) {
	return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
}

function plotBars(d2, placeholder){
	var placeholder = $("#"+placeholder);
	placeholder.unbind();

	console.log(d2[0].data);

	var size = d2.length;
	console.log(size);
	var value = [];
	var tmp = [];
	var ticks = [];

	var markings = [ { color: "#f6f6f6", yaxis: { from: 100 } }];

	for (let x = 0 ; x < size ; x++){
		value[x] = d2[x].data[0][1];
		tmp[x] = { label: d2[x].label, data:[ [x, 0]], color: "#4Ec1E0"};

		ticks.push([x, d2[x].label]);
	}

	max = Math.max.apply( Math, value );

	var plot = $.plot(placeholder, tmp, {
		bars: { 
			show: true,
			align: "center", 
			barWidth: 0.5, 
			fill: 0.9 
		},
		xaxis: {
			ticks: ticks,
			tickLength: 0
		},
		yaxis: {
			max: max,
			min: 0
		},
		grid: { 
			markings: markings,
			borderWidth: 0
		},
		legend: {
			show: false
		}
		
	});

	var updateInterval = 1;
	var loop = 0;
	function update() {

		if(loop < max){
	        
	        for(let i = 0; i < size; i++){
	        	
	        	if(loop < d2[i].data[0][1]){
	        		tmp[i] = { label: d2[i].label, data:[ [i, loop]], color: "#4Ec1E0"};
	        	}
	        }
			loop += 2;
			
			plot.setData(tmp);
	 		plot.draw();
	        setTimeout(update, updateInterval);
		}
    }
    update();
}




function plotBarsHorizontal(rawData, ticks){
	
 	var dataSet = [{data: rawData, color: "#E6354D" }]; 

        var options = {
            series: {
                bars: {
                    show: true
                }
            },
            bars: {
                align: "center",
                barWidth: 0.5,
                horizontal: true,
                fillColor: { colors: [{ opacity: 0.5 }, { opacity: 1}] },
                lineWidth: 1
            },
            xaxis: {
                axisLabelUseCanvas: true,
                axisLabelPadding: 10,
                tickColor: "#5E5E5E",
                color: "black"

            },
            yaxis: {
                axisLabelUseCanvas: true,
                axisLabelPadding: 3,
                tickColor: "#5E5E5E",
                ticks: ticks,
                color: "black",
                tickLength: 0
            },
            legend: {
                noColumns: 0,
                labelBoxBorderColor: "#858585",
                position: "ne"
            },
            grid: {
                hoverable: true,
                borderWidth: 0,
                backgroundColor: "#2A1856"
            }
        };

          $.plot($("#placeholder3"), dataSet, options);

}

function stacking(data){

		var d1 = [],
			d2 = [],
			d3 = [];
		var teste = [];
		var ticks = [];
		var value = [];

		var porc_carga0 = [];
		var porc_carga1 = [];
		var porc_carga2 = [];

		var perm;
		var size = data.length;

		for(let i = 0 ; i < size ; i++){
			var carga0 = parseInt(data[i].carga0);
			var carga1 = parseInt(data[i].carga1);
			var carga2 = parseInt(data[i].carga2);

			var idcarro = data[i].idcarro;

			var total = carga0 + carga1 + carga2;
			//console.log(total);

			porc_carga0[i] = carga0/total;
			porc_carga1[i] = carga1/total;
			porc_carga2[i] = carga2/total;

	

			d1[i] = [i, porc_carga0];
			d2[i] = [i, porc_carga1];
			d3[i] = [i, porc_carga2];

			perm = [ {data: d1, label: "Carga 0", color: mobilislightblue},
					 {data: d2, label: "Carga 1", color: mobilisblue}, 
					 {data: d3, label: "Carga 2", color: mobilisred} ];

			d1[i] = [i, 0];
			d2[i] = [i, 0];
			d3[i] = [i, 0];

			value.push(porc_carga0[i].toFixed(3));
			value.push(porc_carga1[i].toFixed(3));
			value.push(porc_carga2[i].toFixed(3));

			ticks.push([(i), "Carro "+ idcarro ]);

		}

	
		//console.log("teste", teste);
		console.log(value);
		var max = (Math.max.apply( Math, value )*100);
		var legendcontainer = $("#legenda4");

		

		var tmp = [ {data: d1, label: "Carga 0", color: mobilislightblue},
					 {data: d2, label: "Carga 1", color: mobilisblue}, 
					 {data: d3, label: "Carga 2", color: mobilisred} ];

		var plot = $.plot("#placeholder4", perm , {
				series: {
					stack: 0,
					bars: {
						align: "center",
						show: true,
						barWidth: 0.9,
						lineWidth: 0
					}
				},
				xaxis: {
					ticks: ticks,
					tickLength: 0
				},
				yaxis: {
					max: 1,
					tickFormatter: function (n) {
						return (n*100).toFixed(0) + "%";
					}
				},
				legend: {
					container: legendcontainer,
					labelFormatter: function(label, series) {
					    return label;
					},
					sorted: "ascending",
					noColumns: 0,
					labelBoxBorderColor: "none",
				},
				grid: {
		            hoverable: true,
		            clickable: false,
		            borderWidth: 0
		        },
		});
////////////////////////////////////////////////////////////////////////////////////////////////////
		
	var updateInterval = 1;
	//console.log(max);
	var loop = 0;
	function update() {
	//console.log("size: ",size);
	

		if(loop/100 < 1){
	       
	  
	        for(let i = 0; i < size; i++){

				//console.log("loop: ", loop);
	        	
	        	if(loop/100 < porc_carga0[i]){ d1[i] = 0; d1[i] = [i, loop/100];}
	        	if(loop/100 < porc_carga1[i]){ d2[i] = 0; d2[i] = [i, loop/100];}
				if(loop/100 < porc_carga2[i]){ d3[i] = 0; d3[i] = [i, loop/100];}	
	        }
			

			var tmp = [ {data: d1, label: "Carga 0", color: mobilislightblue},
						{data: d2, label: "Carga 1", color: mobilisblue}, 
						{data: d3, label: "Carga 2", color: mobilisred} ];
			
			plot.setData(tmp);
	 		plot.draw();

	 		if(loop/100 > 0.5){
	 			//plot.setData(perm);
	 			//console.log("perm: ", perm)
	 			//plot.draw();
	 			loop +=0.2;
	 		}
	 		else{ loop += .2;}
	       	setTimeout(update, updateInterval);
		}
		else{
			console.log("acabou: ", perm);
    		

    		//finaliza();
   		}


		
    }

    update();

    function finaliza(){
    	console.log("final: ", perm);
    	plot.setData(perm);
    	plot.draw();

    	$.plot("#placeholder4", perm , {
				series: {
					stack: 0,
					bars: {
						align: "center",
						show: true,
						barWidth: 0.9,
						lineWidth: 0
					}
				},
				xaxis: {
					ticks: ticks,
					tickLength: 0
				},
				yaxis: {
					max: 1,
					tickFormatter: function (n) {
						return (n*100).toFixed(0) + "%";
					}
				},
				legend: {
					container: legendcontainer,
					labelFormatter: function(label, series) {
					    return label;
					},
					sorted: "ascending",
					noColumns: 0,
					labelBoxBorderColor: "none",
				},
				grid: {
		            hoverable: false,
		            clickable: false,
		            borderWidth: 0
		        },
		});
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////
}

function multipleBars(data){

	var d1 = [],
		d2 = [],
		d3 = [];
	var ticks = [];
	var size = data.length;

	for(let i = 0 ; i < size ; i++){
		var temp_max_bateria = parseInt(data[i].temp_max_bateria);
		var temp_max_inversor = parseInt(data[i].temp_max_inversor);
		var temp_max_motor = parseInt(data[i].temp_max_motor);

		var idcarro = data[i].idcarro;

		d1.push([temp_max_bateria, i]);
		d2.push([temp_max_inversor, i]);
		d3.push([temp_max_motor, i]);

		ticks.push([i, "Carro "+ idcarro]);

	}
 
    var data1 = [
        {
            label: "Temperatura Máxima Bateria", 
            data: d1,
            bars: {
                show: true,
                barWidth: 0.15,
                fill: true,
                lineWidth: 1,
                order: 3,
                fillColor:  { colors: [{ opacity: 0.5 }, { opacity: 1}] },//  "#AA4643",
                horizontal: true
            },
            color: mobilisblue//"#AA4643"
        },
        {
            label: "Temperatura Máxima Inversor", 
            data: d2,
            bars: {
                show: true,
                barWidth: 0.15,
                fill: true,
                lineWidth: 1,
                order: 2,
                fillColor:  { colors: [{ opacity: 0.5 }, { opacity: 1}] },// "#89A54E",
                horizontal: true
            },
            color: mobilisred//orange// "#89A54E"
        },
        {
            label: "Temperatura Máxima Motor", 
            data: d3,
            bars: {
                show: true,
                barWidth: 0.15,
                fill: true,
                lineWidth: 1,
                order: 1,
                fillColor: { colors: [{ opacity: 0.5 }, { opacity: 1}] },//	  "#4572A7",
                horizontal: true
            },
            color: mobilislightblue//"#4572A7"
        }
    ];

    var containerlegenda = $("#legenda5");
     
    $.plot($("#placeholder5"), data1, {
        yaxis: {
           tickLength: 0,
           ticks: ticks
        },
     	xaxis: {
			tickFormatter: function (n) {
				return (n).toFixed(0) + "ºC";
			}
		},
        grid: {
            hoverable: true,
            clickable: false,
            borderWidth: 0
        },
        legend: {
            labelBoxBorderColor: "none",
            position: "right",
            container: containerlegenda,
            noColumns: 0 
        },
        series: {
          //  shadowSize: 1
        }
    });
}



function ranking(data, placeholder, param){

	var placeholder = $("#"+placeholder);
	var size = data.length;
	var arr = [];

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
		}
	}

	arr.sort();
	var ranking = arr.reverse();

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
		}

		
	}
}


function media(data, placeholder, param){

	var size = data.length;
	var media = [];
	var value = 0;

	for(i=0; i<size ; i++){

		switch (param){
			case "soh": var soma = parseInt(data[i].soh); break;
			case "ief": var soma = parseInt(data[i].indice_eficiencia*100);
		}
		value += soma;
	}

	value = value/size;

	media[1] = {
			data: value,
			color: "#4Ec1E0"
		};

	media[0] = {
			data: 100-value,
			color: "white"
	}

	plotPieMedia(media, placeholder);

	var containerlegenda = $("#"+placeholder).next();
	var a = $("#"+placeholder).height();
	var l = $("#"+placeholder).width();

	var style = {
		position: "relative",
		top: "-"+a/2+"px",
		left: l/2+"px",
		color: "#4Ec1E0",
		"font-size": "2em"
	}

	containerlegenda.css(style);

	containerlegenda.append(media[1].data+"%");
}



function plotPieMedia(data, placeholder){

	var placeholder = $("#"+placeholder);
	placeholder.unbind();

	$.plot(placeholder, data, {
		series: {
			pie: { 
				radius: 1,
				innerRadius: 0.8,
				show: true,
				label: {
					 show: false,
                radius: .75,
               // formatter: labelFormatter,
                threshold: 0.1
				}
			}
		},
		legend: {
			show: false
		}
	});
}

function media2(data, placeholder, param){

	var size = data.length;
	var value = 0;
	var loop = 0;
	var updateInterval = 1;
	var valores = [];
	valores[1] = { data: 0,	color: "#4Ec1E0" };
	valores[0] = { data: 100, color: "white" };
	
	var placeholder = $("#"+placeholder);


	for(i=0; i<size ; i++){

		switch (param){
			case "soh": var soma = parseInt(data[i].soh); break;
			case "ief": var soma = parseInt(data[i].indice_eficiencia*100);
		}
		value += soma;
	}

	value = value/size;
	
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
	
	var containerlegenda = placeholder.parent().next();

	var style = {
		position: "absolute",
		top: "62%",//"-"+a/2+"px",
		left: "50%",//l/2+"px",
		color: "#4Ec1E0",
		"font-size": "2em" }

	containerlegenda.css(style);


	function update() {
		containerlegenda.empty();
		
		if(loop < value && (value - loop) > 2){
	        valores[1] = {data: loop, color: "#4Ec1E0"};
			valores[0] = {data: 100-loop, color: "white"};
			
			loop += 2;
		}
		else if (loop < value && (value - loop) > 1){
			valores[1] = {data: loop, color: "#4Ec1E0"};
			valores[0] = {data: 100-loop, color: "white"};

			loop+= 1;
		}
		else if (loop < value && (value - loop) < 1){
			valores[1] = {data: loop, color: "#4Ec1E0"};
			valores[0] = {data: 100-loop, color: "white"};

			loop+=0.1;
		}

		plot.setData(valores);

 		plot.draw();
 		containerlegenda.append(valores[1].data.toFixed(1)+"%");
         if(loop < value){
         	  setTimeout(update, updateInterval);
         }
      
    }
 
    update();

}

