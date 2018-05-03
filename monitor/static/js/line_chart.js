var chart;
$(document).ready(function() {
	var options = {
		chart: {
			renderTo: 'temp_line_chart',
			type: 'line',
			marginBottom: 100,
			zoomType: 'x'
		},
		rangeSelector: {
    	allButtonsEnabled: false,
    	inputEnabled: false,
    	selected: 1,
    	buttonTheme: {
    		fill: 'none',
    		stroke: 'none',
    		width: 41,
    		'stroke-width': 0,
    		r: 8,
    		style: {
    			color: '#ccc',
    			fontWeight: 'bold'
    		}
    	},
    	buttons: [{ type: 'hour', count: 12, text: '12hrs' },
    	{ type: 'day', count: 1, text: 'day' }, 
    	{ type: 'day', count: 7, text: 'week' }, 
    	{ type: 'all', text: 'All', }],
        },
        navigator: {
            enabled: false
        },
        scrollbar: {
            enabled: false
        },
        exporting: {
        enabled: false
        },
		xAxis: {
			type: 'datetime',
			title: {
				text: 'Time/Date'
			},
			dateTimeLabelFormats: {
				hour: '%l:%M %p',
				minute: '%l:%M %p'
			}
		},
		yAxis: [{
			gridLineWidth: 1,
            opposite: false,
			type: 'line',
			min: 68,
			max: 83,
			endOnTick: false,
			maxPadding: 5,
			tickInterval: 5,
			endOnTick: false,
			showLastLabel: true,
			alignTicks: false,
			labels: {
				format: '{value}°F',
				style: {
					color: Highcharts.getOptions().colors[0]
				}
			},
			title: {
				text: 'Temperature',
				style: {
					color: Highcharts.getOptions().colors[0],
					fontSize: '15px',
					fontWeight: 'bold'
				},
				
			}
		}],
		series: [{
			name: 'Bedroom',
			type: 'line',
			data: [],
			marker: {
				enabled: true
			},
			tooltip: {
				valueSuffix: ' °F'
			}
		}, {
			name: 'Livingroom',
			type: 'line',
			data: [],
			marker: {
				enabled: true
			},
			tooltip: {
				valueSuffix: ' °F'
			}
		}, {
			name: 'Kitchen',
			type: 'line',
			data: [],
			marker: {
				enabled: true
			},
			tooltip: {
				valueSuffix: ' °F'
			}
		}, {
			name: 'Office',
			type: 'line',
			data: [],
			marker: {
				enabled: true
			},
			tooltip: {
				valueSuffix: ' °F'
			}
		}]
	};
	$.getJSON('/static/js/api_data.json', function(data) {
		var bedroom_temp = [], bedroom_humidity = [],
			livingroom_temp = [], livingroom_humidity = [],
			kitchen_temp = [], kitchen_humidity = [],
			office_temp = [], office_humidity = [];
		for (i = 0; i < data.length; i++) { 
			bedroom_temp.push([Date.parse(data[i].created), data[i].bedroom_temp]);
			bedroom_humidity.push([Date.parse(data[i].created), data[i].bedroom_humidity]);
			livingroom_temp.push([Date.parse(data[i].created), data[i].livingroom_temp]);
			livingroom_humidity.push([Date.parse(data[i].created), data[i].livingroom_humidity]);
			kitchen_temp.push([Date.parse(data[i].created), data[i].kitchen_temp]);
			kitchen_humidity.push([Date.parse(data[i].created), data[i].kitchen_humidity]);
			office_temp.push([Date.parse(data[i].created), data[i].office_temp]);
		    office_humidity.push([Date.parse(data[i].created), data[i].office_humidity]);
		}
		options.series[0].data = bedroom_temp;
		options.series[1].data = livingroom_temp;
		options.series[2].data = kitchen_temp;
		options.series[3].data = office_temp;
		chart = new Highcharts.StockChart(options);

	});
});
