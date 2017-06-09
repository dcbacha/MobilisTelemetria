var token = checktoken();

$("#btndashboard").parent().addClass("active");
$("#btndashboard").addClass("active");
$("#btndashboard").parent().siblings().removeClass("active");

var mobilisblue = "#2A1856";
var mobilislightblue = "#4Ec1E0";
var mobilisred = "#E6354D";
var orange = "#e06d4e";
var colors = ["#4ec1e0", "#4e78e0", "#4ee0b6"];

$(function(){
	req_logperm();
	req_evt();
	
	//$(".legendLabel").children().css({"max-width": "50px"});
		

}); //end do document ready



function begin(){
	sessions(token);
	$(".legendColorBox").children().css({"width" : "14px", "margin-left": "0px"});
	$(".legendColorBox").css({"max-width":"16px"})
}

function processEvt(data){
	console.log(data);
}

function processLogPerm(data){

	var size = data.length;

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
	
	//stacking(data);
	
	multipleBars(data);
	ranking(data, "placeholder6", "soh");
	ranking(data, "placeholder7", "aut");
	ranking(data, "placeholder8", "efi");
	
	//media2(data, "placeholder10", "soh");
	//media2(data, "placeholder11", "ief");

		
	
}

function plotPie(data, placeholder){

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

			var place = leg;
			//console.log(legenda);
			var pos = place.position();
			var height = place.height();
			var width = place.width();
			

			x = Math.round(x);
			

	      $('<div id="tooltip"><p style="font-size: 2em; font-weight: 900;margin: 0px">'+x+'%</p><p style="font-size: 0.8em; margin: 0px; padding-left: 8px; top: "10"">'+label[index]+'</p></div>').css({
	        position: 'relative',
	        width: '50px',
	        color: mobilislightblue,
	        top: - (pos.top + height/2 - 15),
	        left: - (pos.left - width/2 + 11.5),
	        'background-color': "transparent",
	        opacity: 0.8
	      }).appendTo(legenda).fadeIn(200)
	    }

	    var b = null;

	    placeholder.bind('plothover', function (i, k, h) {
	      if (h) {
	        if (b != h.datapoint) {
	          b = h.datapoint;
	          $('#tooltip').remove();
	          var x = h.datapoint[0],
	          	y = h.datapoint[1];
	         
	 
	          //console.log(h.datapoint[0]);
	          //console.log("tooltip");
	      
	          var leg = $(this);
	          //console.log($(this).parent().next());
	          var index = h.seriesIndex;
	          toolTip(h.pageX, h.pageY, x,y, leg, index);
	        }
	      } else {
	        //$("#tooltip").remove();
	        b = null;
	      }
	    });
}

function labelFormatter(label, series) {
	return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
}

function plotBars(d2, placeholder){
	var placeholder = $("#"+placeholder);
	placeholder.unbind();

	var size = d2.length;
	var value = [];
	var tmp = [];
	var ticks = [];

	var markings = [ { color: "#ffcdd2", yaxis: { from: 100 } }];

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
			borderWidth: 0,
			hoverable: true
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
			
			if(max - loop < 5){ loop += 1; }
			else{ loop += 2; }
			
			
			plot.setData(tmp);
	 		plot.draw();
	        setTimeout(update, updateInterval);
		}
    }
    update();


    function toolTip(f, h, x,y) {
	      $('<div id="tooltip">'+y+'ºC</div>').css({
	        position: 'absolute',
	        display: 'none',
	        'font-size': '1em',
	        'font-weight': 900, 
	        top: h + 5,
	        left: f + 15,
	        padding: '0 4px',
	        'background-color': "white",
	        opacity: 0.8
	      }).appendTo("body").fadeIn(200)
	    }

	    var b = null;

	    placeholder.bind('plothover', function (i, k, h) {
	      if (h) {
	        if (b != h.datapoint) {
	          b = h.datapoint;
	          $('#tooltip').remove();
	          var x = h.datapoint[0],
	          	y = h.datapoint[1];
	          toolTip(h.pageX, h.pageY, x,y)
	        }
	      } else {
	        $("#tooltip").remove();
	        b = null;
	      }
	    });
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
		var v1 = [],
			v2 = [],
			v3 = [];
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

			var int_carga0 =  (carga0/total).toFixed(2);
			var int_carga1 =  (carga1/total).toFixed(2);
			var int_carga2 =  (carga2/total).toFixed(2);

			porc_carga0[i] = Math.round(int_carga0*100);
			porc_carga1[i] = Math.round(int_carga1*100);
			porc_carga2[i] = Math.round(int_carga2*100);

			d1[i] = [i, 0];
			d2[i] = [i, 0];
			d3[i] = [i, 0];

			value.push(porc_carga0[i].toFixed(2));
			value.push(porc_carga1[i].toFixed(2));
			value.push(porc_carga2[i].toFixed(2));

			ticks.push([(i), "Carro "+ idcarro ]);

		}

		
		var max = (Math.max.apply( Math, value ));
		var legendcontainer = $("#legenda4");

		var tmp = [ {data: d1, label: "Carga 0", color: mobilislightblue},
					{data: d2, label: "Carga 1", color: mobilisblue}, 
					{data: d3, label: "Carga 2", color: mobilisred} ];
		var placeholder = $("#placeholder4");

		var plot = $.plot("#placeholder4", tmp , {
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
					max: 100,
					tickFormatter: function (n) {
						return (n).toFixed(0) + "%";
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
		
	var updateInterval = 1;
	var loop = 0;
	
	function update() {
	
		if(loop < max){
	     	  		
	        for(let i = 0; i < size; i++){
	        	
	        	if(loop <= porc_carga0[i]){ d1[i] = 0; d1[i] = [i, loop];}
	        	if(loop <= porc_carga1[i]){ d2[i] = 0; d2[i] = [i, loop];}
				if(loop <= porc_carga2[i]){ d3[i] = 0; d3[i] = [i, loop];}	
	        }

			var tmp = [ {data: d1, label: "Carga 0", color: mobilislightblue},
						{data: d2, label: "Carga 1", color: mobilisblue}, 
						{data: d3, label: "Carga 2", color: mobilisred} ];
			
			plot.setData(tmp);
	 		plot.draw();

	 		loop += 1;
	       	setTimeout(update, updateInterval);
		}
    }

    update();


		function toolTip(f, h, x,y, porcent) {
	      $('<div id="tooltip">'+porcent+'%</div>').css({
	        position: 'absolute',
	        display: 'none',
	        'font-size': '1em', 
	        'font-weight': 900,
	        top: h + 5,
	        left: f + 15,
	        padding: '0 4px',
	        'background-color': "white",
	        opacity: 0.8
	      }).appendTo("body").fadeIn(200)
	    }

	    var b = null;

	    placeholder.bind('plothover', function (i, k, h) {
	      if (h) {
	        if (b != h.datapoint) {
	          b = h.datapoint;
	          $('#tooltip').remove();
	          var x = h.datapoint[0],
	          	y = h.datapoint[1];
	          	console.log(h);
	          var porcent = h.datapoint[1] - h.datapoint[2] ;
	          console.log($(this).position());
	          toolTip(h.pageX, h.pageY, x,y, porcent);
	        }
	      } else {
	        $("#tooltip").remove();
	        b = null;
	      }
	    });
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
 	var barwidth = 0.2;
    var data1 = [
        {
            label: "Temperatura Máxima Bateria", 
            data: d1,
            bars: {
                show: true,
                barWidth: barwidth,
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
                barWidth: barwidth,
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
                barWidth: barwidth,
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

    var placeholder = $("#placeholder5");

    function toolTip(f, h, x,y) {
	      $('<div id="tooltip">'+x+'ºC</div>').css({
	        position: 'absolute',
	        display: 'none',
	        'font-size': '1em',
	        'font-weight': 900, 
	        top: h + 5,
	        left: f + 15,
	        padding: '0 4px',
	        'background-color': "white",
	        opacity: 0.8
	      }).appendTo("body").fadeIn(200)
	    }

	    var b = null;

	    placeholder.bind('plothover', function (i, k, h) {
	      if (h) {
	        if (b != h.datapoint) {
	          b = h.datapoint;
	          $('#tooltip').remove();
	          var x = h.datapoint[0],
	          	y = h.datapoint[1];
	          toolTip(h.pageX, h.pageY, x,y)
	        }
	      } else {
	        $("#tooltip").remove();
	        b = null;
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
		"font-size": "1.8em",
		"font-weight": 900 }

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

