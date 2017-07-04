var token = checktoken();

$("#btndashboard").parent().addClass("active");
$("#btndashboard").addClass("active");
$("#btndashboard").parent().siblings().removeClass("active");

var mobilisblue = "#2A1856";
var mobilislightblue = "#4Ec1E0";
var mobilisred = "#E6354D";
var orange = "#e06d4e";
var colors = ["#4ec1e0", "#4e78e0", "#4ee0b6"];
var barcolor = { red: "#e90e20",
			 	yellow : "#fcd054",
			 	blue: "#4e78e0",
			 	green: "#2ecc71"};

$(function(){
	
	sessions(token);
	req_logperm();
	req_evt();
	begin();

	setTimeout(function(){
		var $toastContent = $('<span> Dados referentes às últimas atualizações de cada veículo</span>');
  		Materialize.toast($toastContent, 5000, 'rounded');
	}, 10000);

	$("#reload").click(function(){
		$(".collection").empty();
		$(".loadingcard").show();
		
		req_logperm();
		req_evt();
		begin();
	});

	$("#dropdown-densidade li").click(function () {	
		var intervalo = $(this).text();
		$("#btnDropdownDensidade").text(intervalo);
		switch (intervalo){
			case "Últimas 24 Horas": densityEvt(dataEvt, "densidadeevt", "dia"); break;
			case "Última Semana": densityEvt(dataEvt, "densidadeevt", "semana"); break
			case "Último Mês": densityEvt(dataEvt, "densidadeevt", "mes"); break;
			case "Último Ano": densityEvt(dataEvt, "densidadeevt", "ano");
		}
	});

	$("#dropdown-falhas li").click(function () {	
		var intervalo = $(this).text();
		$("#btnDropdownFalhas").text(intervalo);
		switch (intervalo){
			case "Últimas 24 Horas": avisos(dataEvt,"dia", 50); break;
			case "Última Semana": avisos(dataEvt,"semana", 50); break
			case "Último Mês": avisos(dataEvt,"mes", 50); break;
			case "Último Ano": avisos(dataEvt, "ano", 50);
		}
	});

	$(".fechar").click(function(){
		$(this).parent().parent().slideUp(400);
		var id = $(this).parent().parent().attr('id');
		var link = $("#dropdown-select li a[value="+id+"]");
		link.children().text('visibility_off');
	});

	$("#dropdown-select li").click(function () {	
		var intervalo = $(this).text();
		var id= $(this).children().attr('value');
		$("#"+id).slideToggle();
		if($(this).children().children().text() == "visibility"){
			$(this).children().children().text('visibility_off');
		} else{
			$(this).children().children().text('visibility');
		}
	});

}); //end do document ready

function begin(){
	$('select').material_select();
	$(".legendColorBox").children().css({"width" : "14px", "margin-left": "0px"});
	$(".legendColorBox").css({"max-width":"16px"})
	$(".loadingcard").hide();

	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, 
      hover: false, 
      gutter: 25,
      belowOrigin: true,
      alignment: 'left',
      stopPropagation: false
    	}
	);

}

function processEvt(data){
	dataEvt = data;
	densityEvt(data, "densidadeevt", "dia");
	useEvt(data, "placeholder-uso", "dia");

	typeEvt(data, "placeholder-type", "dia");
	avisos(data, "dia", 5000);

	
}

function processLogPerm(data){
	plotPie(data, "placeholder-hor", 'hor');
	plotPie(data, "placeholder-odo", 'odo');
	
	plotBarsHorizontal(data, "placeholder-estadocarga", "soc");
	plotBarsHorizontal(data, "placeholder-autonomia", "kmleft");
	//plotBarsHorizontal(data, "placeholder-tbateria", "temp");
	plotBarsHorizontal(data, "placeholder-horimetro-barra", "hor");
	plotBarsHorizontal(data, "placeholder-odometro-barra", "odo");
	
	multipleBars(data);
	ranking(data, "placeholder-lastupdate", "last")
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function plotBarsHorizontal(data, placeholder, type){

	var size = data.length;
	var rawData =[];
	var ticks = [];
	var json = [];
	var value =[];
	var zero = [];

	var arr_colors = [];

	for (let i = 0; i < size; i++) {

		var idcarro = parseInt(data[i].idcarro);
		var	temp_bateria = parseInt(data[i].temp_max_bateria);
		var odometro = parseInt(data[i].odometro);
		var horimetro = parseInt(data[i].horimetro);
		var soh = parseInt(data[i].soh);
		var autono = parseInt(data[i].km_kwh);
		switch (type){
			case "temp": 
				json.push({carro: idcarro, value: temp_bateria});
				value[i] = temp_bateria;
				var legenda = 'ºC'; var tick = ' ºC';
				var reverse = true;
				break;
			case "soc": 
				json.push({carro: idcarro, value: soh});
				value[i] = soh;
				var legenda = '%'; var tick = ' %';
				var reverse = true;
				break;
			case "hor":
				json.push({carro: idcarro, value: horimetro});
				value[i] = horimetro;
				var legenda = ''; var tick = ' h';
				var reverse = false;
				break;
			case "odo":
				json.push({carro: idcarro, value: odometro});
				value[i] = odometro;
				var legenda = ''; var tick = ' km';
				var reverse = false;
				break;
			case 'kmleft':
				var kmleft =  (soh*autono/100)
				json.push({carro: idcarro, value: kmleft});
				value[i] = kmleft;
				var legenda = 'km'; var tick = ' km';
				var reverse = true;
		}
	}
	max = Math.max.apply( Math, value );

	function keysrt(key,desc) {
	  return function(a,b){
	   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
	  }
	}

	if(reverse){ var ranking = json.sort(keysrt('value')).reverse(); }
	else{ var ranking = json.sort(keysrt('value')); }
	
	for(let i=0 ; i<ranking.length ; i++){
		rawData.push([ranking[i].value, i]);
		zero.push([0,i]);
		ticks.push([i, "Carro "+ ranking[i].carro ]);
	}

 	
 	var info=  [{data: [[ rawData[0][0] , rawData[0][1] ]], color: colors[1]}, 
            	{data: [[ rawData[1][0] , rawData[1][1] ]], color: colors[1]},
            	{data: [[ rawData[2][0] , rawData[2][1] ]], color: colors[1]},
            	{data: [[ rawData[3][0] , rawData[3][1] ]], color: colors[1]},
            	{data: [[ rawData[4][0] , rawData[4][1] ]], color: colors[1]}];

    var options = {
        series: {
            bars: {
                show: true
            }
        },
        bars: {
            align: "center",
            barWidth: 0.4,
            horizontal: true,
            lineWidth: 0,
            fill: 0.8
        },
        xaxis: {
            tickFormatter: function (n) {
				return (n).toFixed(0) + legenda;
			},
            min:0,
            max: max
        },
        yaxis: {
            ticks: ticks,
            tickLength: 0,
        },

        grid: {
            hoverable: true,
            borderWidth: 0,
        }
    };

    var plot = $.plot($("#"+placeholder), info, options);
    var placeholder = $("#"+placeholder);

    var updateInterval = 30;
	var loop = 0;
	var increment = 5;

	/*if(type == "soc"){
	   	console.log(rawData);
	   	for(let i = 0 ; i < rawData.length ;i++){
			if (rawData[i][0] < 20){ var finalcolor = barcolor.red;}
			else if (rawData[i][0] < 50){ var finalcolor = barcolor.yellow;}
			else if (rawData[i][0] < 100){var finalcolor = barcolor.blue;}
			else {var finalcolor = barcolor.green;}
	   	}
	} else{
		var finalcolor = colors[1];
	}*/
	function update() {
		var tmp = [];
		

		if(loop < max){
	        
	        for(let i = 0; i < rawData.length; i++){

	        	if (type == "soc"){
	        		if(rawData[i][0] < 20){	var finalcolor = barcolor.red;} 
	        		else if (rawData[i][0] < 50){ var finalcolor= barcolor.yellow; } 
	        		else if (rawData[i][0] < 99){ var finalcolor= barcolor.blue;} 
	        		else { var finalcolor= barcolor.green;}
	        	
	        	} else { var finalcolor = colors[1]; }

	        	if(loop < rawData[i][0]){
		        	tmp.push({data: [[ loop , rawData[i][1] ]], color: finalcolor});
			    }else{
			       	tmp.push({data: [[ rawData[i][0] , rawData[i][1] ]], color: finalcolor})
			    }
			
	        }
	       

			if(max < 300){ increment= 5 ;}
			else if(max > 300){ increment= 20 ;  }
			if(max - loop < 50){ increment= 2 ;}
			else if(max - loop < 10){increment= 1 ;}
			
			loop += increment;

			plot.setData(tmp);
	 		plot.draw();
	        setTimeout(update, updateInterval);
		}
    }
    update();

    function toolTip(f, h, x,y, cor) {
      $('<div id="tooltip">'+x+tick+'</div>').css({
        position: 'absolute',
        display: 'none',
        'font-size': '0.8em',
        'font-weight': 900, 
        top: h -25,
        left: f -1,
        padding: '0 4px',
        'background-color': "white",
        opacity: 0.9,
        'border-radius':'25px',
        border: '2px solid '+cor,
	    color: cor
      }).appendTo("body").fadeIn(200)
    }

	var b = null;

	placeholder.bind('plothover', function (i, k, h) {
	    if (h) {
	    if (b != h.datapoint) {
	        b = h.datapoint;
	        $('#tooltip').remove();
	        var x = h.datapoint[0],
	        	y = h.datapoint[1],
	        	cor = colors[1];

	        if (type == "soc"){
	        	if(x < 20){
	        		cor = barcolor.red;
	        	} else if (x < 50){
	        		cor= barcolor.yellow;
	        	} else if (x < 99){
	        		cor= barcolor.blue;
				} else {
	        		cor= barcolor.green;
				}
	        } else {
	        	cor = colors[1];
	        }

	        toolTip(h.pageX, h.pageY, x,y, cor)
	    }
	    } else {
	        $("#tooltip").remove();
	        b = null;
	    }
	});

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                fill: 0.8,
                lineWidth: 0,
                order: 3,
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
                fill: 0.8,
                lineWidth: 0,
                order: 2,
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
                fill: 0.8,
                lineWidth: 0,
                order: 1,
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
	        'font-size': '0.9em',
	        'font-weight': 900, 
	        top: h - 30,
	        left: f,
	        padding: '0 4px',
	        'background-color': "white",
	        opacity: 0.8,
	        'border-radius':'25px',
	        border: '2px solid '+mobilisblue,
	        color: mobilisblue
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	switch (type){
		case "dia": 
			var intervalo = (1000 * 60 * 60 * 24);
			var xformat = {
				mode: "time",
				min: (now - intervalo),
				max: now,
				timezone: "browser"
			};
			break;
		case "semana": 
			var intervalo = (1000 * 60 * 60 * 24 * 7);
			var xformat = {
				mode: "time",
				min: (now - intervalo),
				max: now,
				timezone: "browser",
				timeformat: "%a",
				minTickSize: [1, "day"]
			};
			break;
		case "mes": 
			var intervalo = (1000 * 60 * 60 * 24 * 30);
			var xformat = {
				mode: "time",
				min: (now - intervalo),
				max: now,
				timezone: "browser",
				timeformat: "%d",
				ticks: 30
			};
			break;
		case "ano": 
			var intervalo = (1000 * 60 * 60 * 24 * 30 * 12);
			var xformat = {
				mode: "time",
				min: (now - intervalo),
				max: now,
				timezone: "browser",
				ticks: 12
			};
	}

	$.plot(placeholder, [{data:d, color: colors[1]}], {
		bars: { 
			show: true,
			align: "center", 
			barWidth: 1, 
			fill: 0.9,
		},
		xaxis: xformat,
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function avisos(data, type, waittime){
	var size = data.length;
	var num_erro =0;
	var num_aviso =0;

	$("#placeholder-falha").empty();
	$("#placeholder-alerta").empty();

	var now = new Date().getTime();

	switch (type){
		case "dia": var intervalo = 24; break;
		case "semana": var intervalo = 24*7; break;
		case "mes": var intervalo = 24*30; break;
		case "ano": var intervalo = 24*30*12;
	}

	data.reverse(); //para colocar na ordem do mais recente para o mais velho

	for(let i=0 ; i<size ; i++){
		var erro = data[i].errorcode;
		var carro = data[i].idcarro;
		var timeevt = data[i].timestamp_evt;
		var nome = data[i].nome;
		var dados = data[i].data;

		var time = new Date(timeevt).getTime();

		var diff = Math.floor((now - time)/(1000 * 60 * 60)); //para diferença de horas
		

		if( $.inArray(erro, arr_danger) > -1 && diff < intervalo){
			var html ="<li class='collection-item'><div><strong>"+erro+"</strong> Carro "+carro+" time: "+ timeevt+""+
							"<span class='secondary-content'>"+dados+"</span></div></li>";
			$("#placeholder-falha").append(html);
			num_erro ++;
		}
		else if( $.inArray(erro, arr_warning) > -1 && diff < intervalo){
			var html ="<li class='collection-item'><div><strong>"+erro+"</strong> Carro "+carro+" time: "+ timeevt+""+
							"<span class='secondary-content'>"+dados+"</span></div></li>";
			$("#placeholder-alerta").append(html);
			num_aviso ++;
		}
	}

	if(num_erro > 0){
		setTimeout(function(){
			$("#card-falha").slideDown();
			$("#card-congrats").slideUp();
		}, waittime);
	}
	if(num_aviso > 0){
		setTimeout(function(){
			$("#card-alerta").slideDown();
			$("#card-congrats").slideUp();
		}, waittime);
	}
	if(num_erro == 0 && num_aviso ==0){
		setTimeout(function(){
			$("#card-congrats").slideDown();
			$("#card-falha").slideUp();
			$("#card-alerta").slideUp();
		}, waittime);
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function useEvt(data, placeholder, type){

	var placeholder = $("#"+placeholder);
	var size = data.length;

	var now = new Date().getTime();
	var d = [];
	var e = [];
	var json =[];

	for (let i=0 ; i<size ; i++){
		var time =  new Date(data[i].timestamp_evt).getTime();
		var carro = data[i].idcarro;
		var error = data[i].errorcode;
		var evt_json = {time: time, idcarro: carro, erro: error};
		var evt = [time, 1];

		json.push(evt_json);
		d.push(evt);
	}

	function keysrt(key,desc) {
	  return function(a,b){
	   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
	  }
	}

	var ranking = json.sort(keysrt('time')).reverse();
	var max=0;
	var h =[];
	for(let i =0; i<ranking.length; i++){
		if(ranking[i].erro == "EI002"){  ///////////////////////////////////////////////////CONFIGURAR PARA EVENTO DE LIGAR O CARRO///////
			var hora = ranking[i].time;
			var hora = new Date(hora).getHours();
			
			if($.inArray(hora, h) == -1){max++;}
			
			h.push(hora)
			var u = {data: [[hora, 1]], color: colors[1], label: 'Carro '+ranking[i].idcarro };
			e.push(u);
			
		}
	}

	switch (type){
		case "dia": 
			var now = new Date(now).getHours();
			var xformat = {
				min: (now - 24),
				max: now,
				tickFormatter: function (n) {
					if(n>0){ return (n); }
					else if(n ==0){ return 0;}
					else{ return (24+n); }
				},
				ticks: 24,
				tickLength:0
			};
			break;
		case "semana": 
			var xformat = {
				min: (now - (24)),
				max: now
			};
			break;
		case "mes": 
			var xformat = {
				mode: "time",
				min: (now - intervalo),
				max: now,
				timezone: "browser",
				timeformat: "%d"
			};
			break;
		case "ano": 
			var intervalo = (1000 * 60 * 60 * 24 * 30 * 12);
			var xformat = {
				mode: "time",
				min: (now - intervalo),
				max: now,
				timezone: "browser"
			};
	}


	 $.plot(placeholder, e, {
		bars: { 
			show: true,
			align: "center", 
			barWidth: 0.9, 
			fill: 0.9,
			lineWidth: 0
		},
		xaxis: xformat,
		yaxis: {
			ticks: max,
			min: 0,
			max: max
		},
		grid: { 
			borderWidth: 0,
			hoverable: true
		},
		legend: {
			show: false
		},
		series:{
			stack: 0
		}
		
	});


	function toolTip(f, h, label) {
	    $('<div id="tooltip">'+label+'</div>').css({
	        position: 'absolute',
	        display: 'none',
	        'font-size': '0.9em',
	        'font-weight': 900, 
	        top: h,
	        left: f + 10,
	        padding: '0 4px',
	        'background-color': "white",
	        opacity: 0.8,
	        'border-radius':'25px',
	        border: '2px solid '+mobilisblue,
	        color: mobilisblue
	    }).appendTo("body").fadeIn(200)
	}

	var b = null;

	placeholder.bind('plothover', function (i, k, h) {
	    if (h) {
	        if (b != h.datapoint) {
			    b = h.datapoint;
	        	$('#tooltip').remove();
	        	var label = h.series.label;
	        	toolTip(h.pageX, h.pageY,label);
	        }
	    } else {
	        $("#tooltip").remove();
	        b = null;
	   	}
	});



}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function typeEvt(data, placeholder, type){

	var placeholder = $("#"+placeholder);
	var size = data.length;

	var now = new Date().getTime();
	var d = [];
	var e = [];
	var json =[];

	for (let i=0 ; i<size ; i++){
		var time =  new Date(data[i].timestamp_evt).getTime();
		var carro = data[i].idcarro;
		var error = data[i].errorcode;
		var evt_json = {time: time, idcarro: carro, erro: error};
		var evt = [time, 1];

		json.push(evt_json);
		d.push(evt);
	}

	function keysrt(key,desc) {
	  return function(a,b){
	   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
	  }
	}

	var ranking = json.sort(keysrt('time')).reverse();
	var max1=0;
	var max2=0;
	var max3=0;
	var maxglobal=0;
	var h =[];
	for(let i =0; i<ranking.length; i++){

		if( (now - (1000 * 60 * 60 * 24)) < ranking[i].time && ranking[i].time< now){
				
			var hora = ranking[i].time;
			var hora = new Date(hora).getHours();

			if($.inArray(ranking[i].erro, arr_danger) > -1){
				
				if($.inArray(hora, h) == -1){max1++;}
				
				h.push(hora)
				var u = {data: [[hora, 1]], color: '#e74c3c', label: 'Carro '+ranking[i].idcarro };
				e.push(u);
				
			}
			else if($.inArray(ranking[i].erro, arr_warning) > -1){ 
				
				if($.inArray(hora, h) == -1){max2++;}
				
				h.push(hora)
				var u = {data: [[hora, 1]], color: '#f1c40f', label: 'Carro '+ranking[i].idcarro };
				e.push(u);
				
			}
			else{
				
				if($.inArray(hora, h) == -1){max3++;}
				
				h.push(hora)
				var u = {data: [[hora, 1]], color: colors[1], label: 'Carro '+ranking[i].idcarro };
				e.push(u);
			}
		}
	}

	var value = [max1, max2, max3];
	maxglobal = Math.max.apply( Math, value );

	//console.log(maxglobal);

	switch (type){
		case "dia": 
			var now = new Date(now).getHours();
			var xformat = {
				min: (now - 24),
				max: now,
				tickFormatter: function (n) {
					if(n>0){ return (n); }
					else if(n ==0){ return 0;}
					else{ return (24+n); }
				},
				ticks: 24,
				tickLength:0
			};
			break;
	}


	 $.plot(placeholder, e, {
		bars: { 
			show: true,
			align: "center", 
			barWidth: 0.9, 
			fill: 0.9,
			lineWidth: 0
		},
		xaxis: xformat,
		yaxis: {
			min: 0
		},
		grid: { 
			borderWidth: 0,
			hoverable: true
		},
		legend: {
			show: false
		},
		series:{
			stack: 0
		}
		
	});


	function toolTip(f, h, label) {
	    $('<div id="tooltip">'+label+'</div>').css({
	        position: 'absolute',
	        display: 'none',
	        'font-size': '0.9em',
	        'font-weight': 900, 
	        top: h,
	        left: f + 10,
	        padding: '0 4px',
	        'background-color': "white",
	        opacity: 0.8,
	        'border-radius':'25px',
	        border: '2px solid '+mobilisblue,
	        color: mobilisblue
	    }).appendTo("body").fadeIn(200)
	}

	var b = null;

	placeholder.bind('plothover', function (i, k, h) {
	    if (h) {
	        if (b != h.datapoint) {
			    b = h.datapoint;
	        	$('#tooltip').remove();
	        	var label = h.series.label;
	        	toolTip(h.pageX, h.pageY,label);
	        }
	    } else {
	        $("#tooltip").remove();
	        b = null;
	   	}
	});



}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
		tmp[x] = { label: d2[x].label, data:[ [x, 0]], color: colors[1] };

		ticks.push([x, d2[x].label]);
	}

	max = Math.max.apply( Math, value );

	var plot = $.plot(placeholder, tmp, {
		bars: { 
			show: true,
			align: "center", 
			barWidth: 0.5, 
			fill: 0.8,
			lineWidth:0
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
	        		tmp[i] = { label: d2[i].label, data:[ [i, loop]], color: colors[1]};
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
	        'font-size': '0.8em',
	        'font-weight': 900, 
	        top: h - 20,
	        left: f,
	        padding: '0 4px',
	        'background-color': "white",
	        opacity: 0.9,
	        'border-radius':'25px',
	        border: '2px solid '+mobilisblue,
	        color: mobilisblue
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
