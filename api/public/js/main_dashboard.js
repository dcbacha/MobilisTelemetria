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
	//req_evt_teste();
	

	$("#reload").click(function(){
		$(".collection").empty();
		$(".drop").empty();
		req_logperm();
		req_evt();
		req_evt_teste();

	});

	$("#dropdown1 li").click(function () {
		
		var intervalo = $(this).text();
		$("#btnDropdown1").text(intervalo);
		switch (intervalo){
			case "Últimas 24 Horas": densityEvt(dataEvt, "densidadeevt", "dia"); break;
			case "Última Semana": densityEvt(dataEvt, "densidadeevt", "semana"); break
			case "Último Mês": densityEvt(dataEvt, "densidadeevt", "mes"); break;
			case "Último Ano": densityEvt(dataEvt, "densidadeevt", "ano");
		}

	});

	$("#filtro").change(function(){
		var options = $(this);
		filtrar(options);
	});

}); //end do document ready



function begin(){
	sessions(token);

	$('select').material_select();

	$(".legendColorBox").children().css({"width" : "14px", "margin-left": "0px"});
	$(".legendColorBox").css({"max-width":"16px"})

	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 5, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false
    	}
	);

	

	
}

function processEvt(data){
	//console.log(data);
	dataEvt = data;
	densityEvt(data, "densidadeevt", "dia");
	avisos(data);
}


function processEvtTeste(data){
	//console.log(data);
	//dataEvt = data;
	//densityEvt(data, "densidadeevt", "dia");
}

function processLogPerm(data){

	var size = data.length;

	var d1 = [];
	var d2 = [];
	var d3 = [];

	var rawData =[];
	var ticks = [];



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
	plotBarsHorizontal(data, "placeholder3", "temp");
	plotBarsHorizontal(data, "placeholder-temporestante", "restante");
	
	//stacking(data);
	
	multipleBars(data);
	

	//ranking(data, "placeholder6", "soh");
	//ranking(data, "placeholder7", "aut");
	//ranking(data, "placeholder8", "efi");

	
	
	//media2(data, "placeholder10", "soh");
	//media2(data, "placeholder11", "ief");

	ranking(data, "placeholder-lastupdate", "last")

		
	
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




function plotBarsHorizontal(data, placeholder, type){

	var size = data.length;
	var rawData =[];
	var ticks = [];

	for (let i = 0; i < size; i++) {

		var idcarro = data[i].idcarro;
		var	temp_bateria = data[i].temp_max_bateria;
		var soh = data[i].soh;
		
		switch (type){
			case "temp": rawData.push([parseInt(temp_bateria), i]); break;
			case "restante": rawData.push([parseInt(soh), i]);
		}
		
		ticks.push([i, "Carro "+ idcarro ]);

	}
	
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

    $.plot($("#"+placeholder), dataSet, options);

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


function densityEvt(data, placeholder, type){

	var placeholder = $("#"+placeholder);
	//console.log(data);

	var size = data.length;

	var now = new Date().getTime();
	//console.log(new Date());
	var d = [];

	for (let i=0 ; i<size ; i++){
		var time =  new Date(data[i].timestamp_evt).getTime();
		//console.log(time);

		var evt = [time, 1];

		d.push(evt);
	}

	//console.log(d);

	/* create and return new array padding missing days*/

/*  var startDay = now,
    newData = [[new Date(data[0].timestamp_evt).getTime(), 1]];

  for (i = 1; i < size; i++) {
  	var data1 = new Date(data[i-1].timestamp_evt).getTime();
  	var data2 = new Date(data[i].timestamp_evt).getTime();
  	console.log(data1, data2);

    var diff = dateDiff(data1, data2);

    var startDate = data1;

    if (diff > 1) {
      for (j = 0; j < diff - 1; j++) {
        var fillDate = new Date(startDate+ (j + 1)).getTime();
        //console.log(fillDate);
          newData.push([fillDate, 0]);
      }
    }
    var dataTime = new Date(data[i].timestamp_evt).getTime();
    newData.push([dataTime, 1]);
    
  }
 
   console.log(newData);*/



/* helper function to find date differences*/
function dateDiff(d1, d2) {
  return Math.floor((d2 - d1) / (1000 * 60 * 60));
}

	switch (type){
		case "dia": var intervalo = (1000 * 60 * 60 * 24); break;
		case "semana": var intervalo = (1000 * 60 * 60 * 24 * 7); break;
		case "mes": var intervalo = (1000 * 60 * 60 * 24 * 30); break;
		case "ano": var intervalo = (1000 * 60 * 60 * 24 * 30 * 12);
	}


	 $.plot(placeholder, [d], {
		bars: { 
			show: true,
			align: "center", 
			barWidth: 1, 
			fill: 0.9 
		},
		xaxis: {
			mode: "time",
			min: (now - intervalo),
			max: now,
			timezone: "browser"
		},
		yaxis: {
			ticks: 1,
			min: 0,
			max: 1
		},
		grid: { 
			borderWidth: 0,
			hoverable: true
		},
		legend: {
			show: false
		}
		
	});



}

function filtrar(options){

	for(let i=0; i < 8 ; i++){
		
		if(options[0].options[i].selected == false){
			var value = options[0].options[i].value;
			
			switch (value){
				case '1': $("#card-lastupdate").css({'display': 'none'},{'visibility': 'hidden'}); break;
				case '2': $("#card-densidadeeventos").css({'display': 'none'},{'visibility': 'hidden'}); break;
				case '3': $("#card-horimetro").css({'display': 'none'},{'visibility': 'hidden'}); break;
				case '4': $("#card-odometro").css({'display': 'none'},{'visibility': 'hidden'}); break;
				case '5': $("#card-temp1").css({'display': 'none'},{'visibility': 'hidden'}); break;
				case '6': $("#card-temp2").css({'display': 'none'},{'visibility': 'hidden'}); break;
				case '7': $("#card-temp3").css({'display': 'none'},{'visibility': 'hidden'}); break;
			}
		}
		if(options[0].options[i].selected == true){
			var value = options[0].options[i].value;

			switch (value){
				case '1': $("#card-lastupdate").css({'display': 'block'},{'visibility': 'visible'}); break;
				case '2': $("#card-densidadeeventos").css({'display': 'block'},{'visibility': 'visible'}); break;
				case '3': $("#card-horimetro").css({'display': 'block'},{'visibility': 'visible'}); break;
				case '4': $("#card-odometro").css({'display': 'block'},{'visibility': 'visible'}); break;
				case '5': $("#card-temp1").css({'display': 'block'},{'visibility': 'visible'}); break;
				case '6': $("#card-temp2").css({'display': 'block'},{'visibility': 'visible'}); break;
				case '7': $("#card-temp3").css({'display': 'block'},{'visibility': 'visible'}); break;
			}
		}
	}

}


function avisos(data){
	var size = data.length;
	var num_erro =0;
	var num_aviso =0;

	console.log("entrou");

	
	
	
	

	for(let i=0 ; i<size ; i++){
		var erro = data[i].errorcode;

		if( $.inArray(erro, arr_danger) > -1){
			console.log("tem erro");
			
			num_erro ++;
		}
		else if( $.inArray(erro, arr_warning) > -1){
			console.log("tem falha");
			num_aviso ++;
		}
	}

	if(num_erro > 0){
		$("#card-falha").show();
	}
	if(num_aviso > 0){
		$("#card-alerta").show();
	}
	if(num_erro == 0 && num_aviso ==0){
		$("#card-congrats").show();
	}

	// fazer logica de quando nao tem erro e de quando tem;
}