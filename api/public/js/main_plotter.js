//var token = checktoken();

$.ajax({
	type: "GET",
	url: "http://mobilis.web1649.kinghost.net/api/public/plotter",
	dataType: 'json',

	error: function(data, status) {
		console.log("erro ajax");
		console.log(data);
		console.log(data.responseText)
		//redirect("timeout");
	},
	success: function(data, status) {
		console.log("sucesso ajax");
		//console.log(data);
		var dec_data = atob(data.data[0].dados);
		//console.log(dec_data);
		processPoints(dec_data);	
	}
});


$(function() {
	$("html, body").animate({ scrollTop: 0 }, "slow");
	$('select').material_select();

});

//console.time('processPoints');
//console.timeEnd('processPoints');


var	max_vel = 0;
var	max_acel = 0;
var	max_freio = 0;
var	max_torque = 0;
var	max_rotacao = 0;
var	max_tensao_bat = 0;
var	max_tensao_motor = 0;
var	max_corrente_pack = 0;
var	max_corrente_motor = 0;
var	max_potencia = 0;

var	max_vel_time = 0;
var	max_torque_time = 0;
var max_rotacao_time = 0;
var	max_tensao_bat_time = 0;
var	max_tensao_motor_time = 0;
var	max_corrente_pack_time = 0;
var	max_corrente_motor_time = 0;
var	max_potencia_time = 0;

var	avg_vel = 0;
var	avg_acel = 0;
var	avg_freio = 0;
var	avg_torque = 0;
var	avg_rotacao = 0;
var	avg_tensao_bat = 0;
var	avg_tensao_motor = 0;
var	avg_corrente_pack = 0;
var	avg_corrente_motor = 0;
var	avg_potencia = 0;


function processPoints(dec_data){

	var tempo = [];
	var vel = [];
	var acel = [];
	var torque = [];
	var freio = [];
	var rotacao = [];
	var tensao_bat = [];
	var tensao_motor = [];
	var corrente_pack= [];
	var corrente_motor = [];
	var potencia = [];

	var points_vel_tempo = [];
	var points_acel_tempo = [];
	var points_freio_tempo = [];
	var points_torque_tempo = [];
	var points_torque_rotacao = [];
	var points_tensao_bat_tempo = [];
	var points_tensao_motor_tempo = [];
	var points_corrente_pack_tempo = [];
	var points_corrente_motor_tempo = [];
	var points_potencia_tempo = [];
	var points_potencia_rotacao = [];
	var points_rotacao_tempo = [];

	var linhas = dec_data.split("\n");
	linhas.pop();
	var colunas = linhas[0].split(";");

	var column_tempo = $.inArray("Tempo Decorrido", colunas);
	var column_vel = $.inArray(" Velocidade", colunas);
	var column_acel = $.inArray(" Acelerador", colunas);
	var column_torque = $.inArray(" Torque Motor", colunas);
	var column_freio = $.inArray(" Freio", colunas);
	var column_rotacao = $.inArray(" Rotacao", colunas);
	var column_tensao_bat = $.inArray(" Tensao Bat", colunas);
	var column_tensao_motor = $.inArray(" Tensao Motor", colunas);
	var column_corrente_pack = $.inArray(" Corrente Pack", colunas);
	var column_corrente_motor = $.inArray(" Corrente Motor", colunas);

	for(let i=1; i < linhas.length ; i++){
		var content = linhas[i];

		var itens = content.split(";");
		itens.pop();

		if(itens[column_tempo]){
			
			pointFilter(tempo, parseFloat(itens[column_tempo].replace(",", ".")))
			pointFilter(vel, parseInt(itens[column_vel])/10);
			pointFilter(acel, parseInt(itens[column_acel])/100);
			pointFilter(freio, parseInt(itens[column_freio])/100);
			pointFilter(rotacao, parseInt(itens[column_rotacao]));
			pointFilter(tensao_bat, parseInt(itens[column_tensao_bat])/10);
			pointFilter(tensao_motor, parseInt(itens[column_tensao_motor])/10);
			pointFilter(corrente_pack, parseInt(itens[column_corrente_pack])/10);
			pointFilter(corrente_motor, parseInt(itens[column_corrente_motor])/10);
			pointFilter(torque, parseInt(itens[column_torque])/10);
			pointFilter(potencia, (rotacao[i-1]*(Math.PI)/30)*(torque[i-1]*25.3/1000))

			function pointFilter(param, item){
				if(parseInt(item) > param[i-2]+1000){
					param[i-1] = param[i-2];
				}else{
					param[i-1] = item;
				}
			}

			checkMaxValue("velocidade", vel[i-1], tempo[i-1]);
			checkMaxValue("acelerador", acel[i-1]);
			checkMaxValue("freio", freio[i-1]);
			checkMaxValue("torque", torque[i-1], tempo[i-1]);
			checkMaxValue("rotacao", rotacao[i-1], tempo[i-1]);
			checkMaxValue("tensao-bat", tensao_bat[i-1], tempo[i-1]);
			checkMaxValue("tensao-motor", tensao_motor[i-1], tempo[i-1]);
			checkMaxValue("corrente-pack", corrente_pack[i-1], tempo[i-1]);
			checkMaxValue("corrente-motor", corrente_motor[i-1], tempo[i-1]);
			checkMaxValue("potencia", potencia[i-1], tempo[i-1]); 

			points_vel_tempo[i-1] =  [ tempo[i-1] , vel[i-1] ];
			points_acel_tempo[i-1] =  [ tempo[i-1] , acel[i-1] ];
			points_freio_tempo[i-1] = [ tempo[i-1] , freio[i-1] ];
			points_torque_tempo[i-1] =  [ tempo[i-1] , torque[i-1] ];
			points_torque_rotacao[i-1] = [ rotacao[i-1], torque[i-1] ];
			points_tensao_bat_tempo[i-1] = [ tempo[i-1], tensao_bat[i-1] ];
			points_tensao_motor_tempo[i-1] = [ tempo[i-1], tensao_motor[i-1] ];
			points_corrente_pack_tempo[i-1] = [ tempo[i-1], corrente_pack[i-1] ];
			points_corrente_motor_tempo[i-1] = [ tempo[i-1], corrente_motor[i-1] ];
			points_potencia_tempo[i-1] = [ tempo[i-1], potencia[i-1] ];
			points_rotacao_tempo[i-1] = [ tempo[i-1], rotacao[i-1] ];
			points_potencia_rotacao[i-1] = [ rotacao[i-1], potencia[i-1] ];

		}
		else{
			break;
		}
	}

	avg_vel = checkAvgValue(vel);
	avg_acel = checkAvgValue(acel);
	avg_freio = checkAvgValue(freio);
	avg_torque = checkAvgValue(torque);
	avg_rotacao = checkAvgValue(rotacao);
	avg_tensao_bat = checkAvgValue(tensao_bat);
	avg_tensao_motor = checkAvgValue(tensao_motor);
	avg_corrente_pack = checkAvgValue(corrente_pack);
	avg_corrente_motor = checkAvgValue(corrente_motor);
	avg_potencia = checkAvgValue(potencia);

	setCalculatedValues();

	/*console.log("tempo vel max: ", max_vel_time);
	console.log("max vel", max_vel);
	console.log("max acel", max_acel);
	console.log("max freio", max_freio);
	console.log("max torque", max_torque);
	console.log("max rot", max_rotacao);
	console.log("max tensao_bat", max_tensao_bat);
	console.log("max tensao_motor", max_tensao_motor);
	console.log("max corrente_pack", max_corrente_pack);
	console.log("max corrente_motor", max_corrente_motor);
	console.log("max potencia", max_potencia);

	console.log("avg vel", avg_vel);
	console.log("avg acel", avg_acel);
	console.log("avg freio", avg_freio);
	console.log("avg torque", avg_torque);
	console.log("avg rot", avg_rotacao);
	console.log("avg tensao_bat", avg_tensao_bat);
	console.log("avg tensao_motor", avg_tensao_motor);
	console.log("avg corrente_pack", avg_corrente_pack);
	console.log("avg corrente_motor", avg_corrente_motor);
	console.log("avg potencia", avg_potencia);*/

	var datasets1 = {
			"acelerador": {
				label: "Acelerador",
				data: points_acel_tempo
			},
			"freio": {
				label: "Freio",
				data: points_freio_tempo
			},
		};

	var datasets2 = {
			"tensao_bat": {
				label: "Tensao Bateria",
				data: points_tensao_bat_tempo
			},
			"tensao_motor": {
				label: "Tensao Motor",
				data: points_tensao_motor_tempo
			},
			"corrente_pack": {
				label: "Corrente Pack",
				data: points_corrente_pack_tempo
			},
			"corrente_motor": {
				label: "Corrente Motor",
				data: points_corrente_motor_tempo
			}
		};

	var datasets3 = {
			"potencia": {
				label: "Potência",
				data: points_potencia_tempo
			},
			"rotacao": {
				label: "Rotação",
				data: points_rotacao_tempo
			},
		};

	var dataset_misc ={
			"velocidade_all": {
				label: "Velocidade",
				data: points_vel_tempo
			},
			"acelerador_all": {
				label: "Acelerador",
				data: points_acel_tempo
			},
			"freio_all": {
				label: "Freio",
				data: points_freio_tempo
			},
			"torque_all": {
				label: "Torque",
				data: points_torque_tempo
			},
			"tensao_bat_all": {
				label: "Tensao Bateria",
				data: points_tensao_bat_tempo
			},
			"tensao_motor_all": {
				label: "Tensao Motor",
				data: points_tensao_motor_tempo
			},
			"corrente_pack_all": {
				label: "Corrente Pack",
				data: points_corrente_pack_tempo
			},
			"corrente_motor_all": {
				label: "Corrente Motor",
				data: points_corrente_motor_tempo
			},
			"potencia_all": {
				label: "Potência",
				data: points_potencia_tempo
			},
			"rotacao_all": {
				label: "Rotação",
				data: points_rotacao_tempo
			}
	}

	///////////////////// Plots ///////////////////////////////
	navigate(points_vel_tempo, "placeholder_vel", "overview_vel");	
	navigate(points_torque_tempo, "placeholder_torque", "overview_torque");
	navigate(points_torque_rotacao, "placeholder_torque_rotacao");
	navigate(points_potencia_rotacao, "placeholder_pot_rotacao")

	multiplePlot(datasets1, "placeholder_choices1", "choices1", "overview_choices1");
	multiplePlot(datasets2, "placeholder_choices2", "choices2", "overview_choices2");
	multiplePlot(datasets3, "placeholder_pot_tempo", "choices3", "overview_choices3" );

	multiplePlot(dataset_misc, "placeholder_all", "choices_all", "overview_all");



	$("#btnplot").click(function(){
		var name_x = $("#eixo-x").val();
		var name_y = $("#eixo-y").val();
		var x=[];
		var y=[];
		var points_misc=[];

		switch (name_x){
			case "tempo": x = tempo; break;
			case "vel": x = vel; break;
			case "acel": x = acel; break;
			case "torque": x = torque; break;
			case "freio": x = freio; break;
			case "rotacao": x = rotacao; break;
			case "tensao_bat": x = tensao_bat; break;
			case "tensao_motor": x = tensao_motor; break;
			case "corrente_pack": x = corrente_pack; break;
			case "corrente_motor": x = corrente_motor; break;
			case "potencia": x = potencia;
		}

		switch (name_y){
			case "tempo": y = tempo; break;
			case "vel": y = vel; break;
			case "acel": y = acel; break;
			case "torque": y = torque; break;
			case "freio": y = freio; break;
			case "rotacao": y = rotacao; break;
			case "tensao_bat": y = tensao_bat; break;
			case "tensao_motor": y = tensao_motor; break;
			case "corrente_pack": y = corrente_pack; break;
			case "corrente_motor": y = corrente_motor; break;
			case "potencia": y = potencia;
		}

		for(let i=1; i < linhas.length ; i++){
			var content = linhas[i];
			var itens = content.split(";");
			itens.pop();

			points_misc[i-1] =  [ x[i-1] , y[i-1] ];
		}

		navigate(points_misc, "placeholder_misc", "overview_misc");

	});
	/////////////////////////////////////////////////////////////
	//$(".overview").find($(".legend")).hide();
}

function navigate(plot_points, placeholder_id, overview){

		var data = [ plot_points ],
			placeholder = $("#"+placeholder_id),
			overview_id = $("#"+overview);

		var plot = $.plot(placeholder, data, {
				series: {
					lines: {
						show: true
					},
					shadowSize: 0
				},
				
				zoom: {
					interactive: true
				},
				pan: {
					interactive: true
				},
				grid: {
			        hoverable: true,
			        color: '#000',
			        borderWidth: 1,
			        borderColor: "#000",
			        aboveData: false
	      		}
			});

		var overview = $.plot(overview_id, data, {
			series: {
				lines: {
					show: true,
					lineWidth: 1
				},
				shadowSize: 0
			},
			xaxis: {
				ticks: [],
			},
			yaxis: {
				ticks: [],
				min: 0,
				autoscaleMargin: 0.1
			},
			selection: {
				mode: "x"
			}
		});

		placeholder.bind("plotselected", function (event, ranges) {

			// do the zooming
			$.each(plot.getXAxes(), function(_, axis) {
				var opts = axis.options;
				opts.min = ranges.xaxis.from;
				opts.max = ranges.xaxis.to;
			});
			plot.setupGrid();
			plot.draw();
			plot.clearSelection();

			// don't fire event on the overview to prevent eternal loop

			overview.setSelection(ranges, true);
		});

		$(overview_id).bind("plotselected", function (event, ranges) {
			plot.setSelection(ranges);
		});



		function toolTip(f, h, x,y) {
	      $('<div id="tooltip">x: '+x+'</br>y: '+y+'</div>').css({
	        position: 'absolute',
	        display: 'none',
	        'font-size': '11px', 
	        top: h + 5,
	        left: f + 15,
	        padding: '0 4px',
	        'background-color': "#FFFFFF",
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

		placeholder.bind("plotpan", function (event, plot) {
			var axes = plot.getAxes();
			$(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2)
			+ " &ndash; " + axes.xaxis.max.toFixed(2)
			+ " and y: " + axes.yaxis.min.toFixed(2)
			+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		placeholder.bind("plotzoom", function (event, plot) {
			var axes = plot.getAxes();
			$(".message").html("Zooming to x: "  + axes.xaxis.min.toFixed(2)
			+ " &ndash; " + axes.xaxis.max.toFixed(2)
			+ " and y: " + axes.yaxis.min.toFixed(2)
			+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		$("<div class='button' style='right:20px;top:20px'>zoom out</div>")
			.appendTo(placeholder)
			.click(function (event) {
				event.preventDefault();
				plot.zoomOut();
			});

		function addArrow(dir, right, top, offset) {
			$("<img class='button' src='img/arrow-" + dir + ".gif' style='right:" + right + "px;top:" + top + "px'>")
				.appendTo(placeholder)
				.click(function (e) {
					e.preventDefault();
					plot.pan(offset);
				});
		}

		addArrow("left", 55, 60, { left: -100 });
		addArrow("right", 25, 60, { left: 100 });
		addArrow("up", 40, 45, { top: -100 });
		addArrow("down", 40, 75, { top: 100 });
}

function multiplePlot(datasets, placeholder_id, choices_id, overview_id){

		var i = 0;
		$.each(datasets, function(key, val) {
			val.color = i;
			++i;
		});

		// insert checkboxes 
		var choiceContainer = $("#"+choices_id);

		choiceContainer.empty();
		
		$.each(datasets, function(key, val) {
			choiceContainer.append("<br/><input type='checkbox' class='filled-in' name='" + key +
				"' checked='checked' id='filled-in-box" + key + "'></input>" +
				"<label for='filled-in-box" + key + "'>"
				+ val.label + "</label>");
		});

		//var choices = $(".choices");
		var top = choiceContainer.parent().position().top;

		var styles = {
	      position : "absolute",
	      right: "5%",
	      top: top
	    }

		choiceContainer.css(styles);
		choiceContainer.find("input").click(plotAccordingToChoices);

		function plotAccordingToChoices() {

			var data = [];

			choiceContainer.find("input:checked").each(function () {
				var key = $(this).attr("name");
				if (key && datasets[key]) {
					data.push(datasets[key]);
				}
			});

			if (data.length >= 0) {
			  var plot = $.plot("#"+placeholder_id, data, {
					yaxis: {
						min: 0
					},
					xaxis: {
						tickDecimals: 0
					},
					zoom: {
						interactive: true
					},
					pan: {
						interactive: true
					},
					grid: {
				        hoverable: true,
				        color: '#000',
				        borderWidth: 1,
				        borderColor: "#000",
				        aboveData: false
				     }
				});

				var overview = $.plot("#"+overview_id, data, {
					series: {
						lines: {
							show: true,
							lineWidth: 1
						},
						shadowSize: 0
					},
					xaxis: {
						ticks: [],
					},
					yaxis: {
						ticks: [],
						min: 0,
						autoscaleMargin: 0.1
					},
					selection: {
						mode: "x"
					}
				});
			}

			function toolTip(f, h, x,y) {
			      $('<div id="tooltip">x: '+x+'</br>y: '+y+'</div>').css({
			        position: 'absolute',
			        display: 'none',
			        'font-size': '11px', 
			        top: h + 5,
			        left: f + 15,
			        padding: '0 4px',
			        'background-color': "#FFFFFF",
			        opacity: 0.8
			      }).appendTo("body").fadeIn(200)
			    }

		    var b = null;

		    $("#"+placeholder_id).bind('plothover', function (i, k, h) {
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


			$("#"+placeholder_id).bind("plotselected", function (event, ranges) {

				// do the zooming
				$.each(plot.getXAxes(), function(_, axis) {
					var opts = axis.options;
					opts.min = ranges.xaxis.from;
					opts.max = ranges.xaxis.to;
				});
				plot.setupGrid();
				plot.draw();
				plot.clearSelection();

				// don't fire event on the overview to prevent eternal loop

				overview.setSelection(ranges, true);
			});

			$("#"+overview_id).bind("plotselected", function (event, ranges) {
				plot.setSelection(ranges);
			});

			$(".overview").find($(".legend")).hide();
		}

		plotAccordingToChoices();
}

function checkMaxValue(param, value, time){

	switch (param){
		case "velocidade":
			if (value > max_vel){ max_vel = value; max_vel_time = time;} break;
		case "freio":
			if (value > max_freio){ max_freio = value;} break;
		case "acelerador":
			if (value > max_acel){ max_acel = value;} break;
		case "torque":
			if (value > max_torque){ max_torque = value; max_torque_time = time;} break;
		case "rotacao":
			if (value > max_rotacao){ max_rotacao = value; max_rotacao_time = time;} break;
		case "tensao-bat":
			if (value > max_tensao_bat){ max_tensao_bat = value; max_tensao_bat_time = time;} break;
		case "tensao-motor":
			if (value > max_tensao_motor){ max_tensao_motor = value; max_tensao_motor_time = time;} break;
		case "corrente-pack":
			if (value > max_corrente_pack){ max_corrente_pack = value; max_corrente_pack_time = time;} break;
		case "corrente-motor":
			if (value > max_corrente_motor){ max_corrente_motor = value; max_corrente_motor_time = time;} break;
		case "potencia":
			if (value > max_potencia){ max_potencia = value; max_potencia_time = time;}
	}
}

function checkAvgValue(data) {
	var sum =0;
	var size = data.length;

	for( var i = 0; i < size; i++ ){
    	sum += parseInt( data[i]); //don't forget to add the base
	}

	var avg = sum/size;
	return avg.toFixed(2);
}

function setCalculatedValues(){
	
	var cabecalho = "<thead><tr><th></th>"+
					    "<th>Máxima</th>"+
					    "<th>Médio</th>"+
				    "</tr></thead><tbody>";

	var html1= "<tr>"+
					"<td>Velocidade</td>"+
					"<td>"+max_vel+"  ("+max_vel_time+"s)</td>"+
					"<td>"+avg_vel+"</td>"+
				"</tr>";
	
	var html2 = "<tr>"+
					"<td>Aceledador</td>"+
					"<td>"+max_acel+"</td>"+
					"<td>"+avg_acel+"</td>"+
				"</tr>"+
				"<tr>"+
					"<td>Freio</td>"+
					"<td>"+max_freio+"</td>"+
					"<td>"+avg_freio+"</td>"+
				"</tr>";


	var html3 = "<tr>"+
					"<td>Torque</td>"+
					"<td>"+max_torque+"  ("+max_torque_time+"s)</td>"+
					"<td>"+avg_torque+"</td>"+
				"</tr>"+
				"<tr>"+
					"<td>Rotação</td>"+
					"<td>"+max_rotacao+"  ("+max_rotacao_time+"s)</td>"+
					"<td>"+avg_rotacao+"</td>"+
				"</tr>";

	var html_torque = "<tr>"+
						"<td>Torque</td>"+
						"<td>"+max_torque+"  ("+max_torque_time+"s)</td>"+
						"<td>"+avg_torque+"</td>"+
					"</tr>";

	var html4 = "<tr>"+
					"<td>Tensão Bateria</td>"+
					"<td>"+max_tensao_bat+"  ("+max_tensao_bat_time+"s)</td>"+
					"<td>"+avg_tensao_bat+"</td>"+
				"</tr>"+
				"<tr>"+
					"<td>Tensão Motor</td>"+
					"<td>"+max_tensao_motor+"  ("+max_tensao_motor_time+"s)</td>"+
					"<td>"+avg_tensao_motor+"</td>"+
				"</tr>"+
				"<tr>"+
					"<td>Corrente Pack</td>"+
					"<td>"+max_corrente_pack+"  ("+max_corrente_pack_time+"s)</td>"+
					"<td>"+avg_corrente_pack+"</td>"+
				"</tr>"+
				"<tr>"+
					"<td>Corrente Motor</td>"+
					"<td>"+max_corrente_motor+"  ("+max_corrente_motor_time+"s)</td>"+
					"<td>"+avg_corrente_motor+"</td>"+
				"</tr>";

	var html5 = "<tr>"+
					"<td>Potência</td>"+
					"<td>"+max_potencia.toFixed(2)+"  ("+max_potencia_time+"s)</td>"+
					"<td>"+avg_potencia+"</td>"+
				"</tr>"+
				"<tr>"+
					"<td>Rotação</td>"+
					"<td>"+max_rotacao+"   ("+max_rotacao_time+"s)</td>"+
					"<td>"+avg_rotacao+"</td>"+
				"</tr>";

	$("#table_vel").empty().append(cabecalho+ html1+"</tbody>");
	$("#table_acel").empty().append(cabecalho+html2+"</tbody>");
	$("#table_torque").empty().append(cabecalho+html3+"</tbody>");
	$("#table_corrente").empty().append(cabecalho+html4+"</tbody>");
	$("#table_potencia").empty().append(cabecalho+html5+"</tbody>");
	$("#table_all").empty().append(cabecalho+html1+html2+html_torque+html4+html5+"</tbody>");
}
