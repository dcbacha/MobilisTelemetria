var token = checktoken();

$("#btnmaintenance").parent().addClass("active");
$("#btnmaintenance").addClass("active");
$("#btnmaintenance").parent().siblings().removeClass("active");

var mobilisblue = "#2A1856";
var mobilislightblue = "#4Ec1E0";
var mobilisred = "#E6354D";
var orange = "#e06d4e";
var colors = ["#4ec1e0", "#4e78e0", "#4ee0b6"];



$(function(){

	begin();

	req_logperm();
	req_evt();
	
	
});

function change(text){
	console.log("faz: ", text);
}


function processEvt(data){
	console.log(data);

	var user = [];
	var size = data.length;

	for(let i = 0 ; i < size ; i++){
		var nome = data[0].nome;
		user.push(nome);
		console.log(user);

		var html = "<li class='collection-item'><div>"+nome+"</div></li>";
		$("#user-rank").append(html);
	}


}

function begin(){
	sessions(token);

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

	$("#dropdown1 li").click(function(){

		var text = $(this).text();
		$("#btnDropdown1").text(text);
		change(text);
	})
}

function processLogPerm(data){
	stacking(data);
	prog(data, "placeholder10", "soh")
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

function prog(data, placeholder, param){

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
		top: "50%",//"-"+a/2+"px",
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


function labelFormatter(label, series) {
	return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
}
