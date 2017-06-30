var token = checktoken();

$("#btnmaintenance").parent().addClass("active");
$("#btnmaintenance").addClass("active");
$("#btnmaintenance").parent().siblings().removeClass("active");


var mobilisblue = "#2A1856";
var mobilislightblue = "#4Ec1E0";
var mobilisred = "#E6354D";
var mobilisgreen = "#4ee0b6";
var orange = "#e06d4e";
var colors = ["#4ec1e0", "#4e78e0", "#4ee0b6"];

$(function(){

	sessions(token);
	
	req_evt();
	req_logperm();
	req_fleet();
	begin();

	$("#reload").click(function(){
		$(".collection").empty();
		$(".drop").empty();
		req_evt();
		req_logperm();
		req_fleet();
		begin();
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

	$(".fechar").click(function(){
		$(this).parent().parent().slideUp(400);
		var id = $(this).parent().parent().attr('id');
		var link = $("#dropdown-select li a[value="+id+"]");
		link.children().text('visibility_off');
	});
	
});

function begin(){
	$('select').material_select();
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

function processLogPerm(data){
	dataLogPerm = data;
	stacking(dataLogPerm, "placeholder-carga");
	
	media(dataLogPerm, "placeholder-soh", "soh", "média");
	media(dataLogPerm, "placeholder-efi", "efi", "média");
	
	ranking(dataLogPerm, "placeholder-autrank", "aut");
	ranking(dataLogPerm, "placeholder-sohrank", "soh");
	ranking(dataLogPerm, "placeholder-efirank", "efi");

	plotPie(dataLogPerm, "placeholder", 'hor');
	plotPie(dataLogPerm, "placeholder9", 'odo')
}

function processEvt(data){
	dataEvt = data;
	rankErro(dataEvt);
}

function processFleet(data){
	dataFleet = data;
	update_dropdown(dataFleet);

	$("#dropdown-efi li").click(function(){
		var text = $(this).text();
		$("#btnDropdownEfi").text(text);		
		media(dataLogPerm, "placeholder-efi", "efi", text);
	});

	$("#dropdown-soh li a").click(function(){
		var text = $(this).text();
		$("#btnDropdown-soh").text(text);
		media(dataLogPerm, "placeholder-soh", "soh", text);
	});

}

function update_dropdown(data){
	for(let i = 0 ; i < data.length ; i++){
		var html = "<li><a href='#!'>Carro "+data[i].idcarro+"</a></li>";
		$(".drop").append(html);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function stacking(data, placeholder){
		var placeholder = $("#"+placeholder);
		var containerlegenda = placeholder.parent().next();
		containerlegenda.empty();

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

			porc_carga0[i] = Math.floor(int_carga0*100);
			porc_carga1[i] = Math.floor(int_carga1*100);
			porc_carga2[i] = Math.round(int_carga2*100);

			d1[i] = [i, 33];
			d2[i] = [i, 33];
			d3[i] = [i, 33];

			value.push(porc_carga0[i].toFixed(2));
			value.push(porc_carga1[i].toFixed(2));
			value.push(porc_carga2[i].toFixed(2));

			ticks.push([(i), "Carro "+ idcarro ]);

		}

		
		var max = (Math.max.apply( Math, value ));

		var tmp = [ {data: d1, label: "Carga 0", color: mobilislightblue},
					{data: d2, label: "Carga 1", color: mobilisblue}, 
					{data: d3, label: "Carga 2", color: mobilisred} ];
		//console.log('tmp: ', tmp);
		

		var plot = $.plot(placeholder, tmp , {
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
					container: containerlegenda,
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
	        	
	        	/*if(porc_carga0[i] < 33 && d1[i][1] != porc_carga0[i]){d1[i] = 0; d1[i] = [i, (33-loop)];}
	        	else if (porc_carga0[i] > 33 && d1[i][1] != porc_carga0[i]){d1[i]=0;d1[i] = [i, 33+loop];}

				if(porc_carga1[i] < 33 && d2[i][1] != porc_carga1[i]){d2[i] = 0; d2[i] = [i, (33-loop)];}
	        	else if (porc_carga1[i] > 33 && d2[i][1] != porc_carga1[i]){d2[i]=0;d2[i] = [i, 33+loop];}

	        	if(porc_carga2[i] < 33 && d3[i][1] != porc_carga2[i]){d3[i] = 0; d3[i] = [i, (100-loop)];}
	        	else if (porc_carga2[i] > 33 && d3[i][1] != porc_carga2[i]){d3[i]=0;d3[i] = [i, 66+loop];}*/

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
	          	//console.log(h);
	          var porcent = h.datapoint[1] - h.datapoint[2] ;
	         // console.log($(this).position());
	          toolTip(h.pageX, h.pageY, x,y, porcent);
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

function rankErro(data){
	var user = [];
	var json = [];
	var size = data.length;

	for(let i = 0 ; i < size ; i++){
		var nome = data[i].nome;
		var erro = data[i].errorcode;

		if($.inArray(erro, arr_danger) > -1 || $.inArray(erro, arr_warning) > -1){
		
			if($.inArray(nome, user) == -1){
				user.push(nome);
				json.push({nome: nome, qnt: 1}); 
			}
			else{
				for(let x = 0 ; x < json.length ; x++ ){
					if (json[x].nome == nome){
						json[x].qnt ++;
					}
				}
			}
		}
	}

	function keysrt(key,desc) {
	  return function(a,b){
	   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
	  }
	}

	//console.log("json: ", json);

	var ranking = json.sort(keysrt('qnt')).reverse();
	
	for(let i = 0 ; i < ranking.length ; i++){
		var nome = ranking[i].nome;
		var qnt = ranking[i].qnt;

		var html = "<li class='collection-item'><strong>"+(i+1)+"º</strong> "+nome+"<span class='badge'>"+qnt+"</span></li>";
		$("#user-rank").append(html);
	}

	$('#user-rank').slideDown();
}
