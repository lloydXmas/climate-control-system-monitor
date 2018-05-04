$(document).ready(function() {
	Highcharts.setOptions({
		chart: {
			type: 'line',
			marginBottom: 100,
			zoomType: 'x'
		}
	});

	var temp_line_chart = {
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
			buttons: [{
					type: 'hour',
					count: 12,
					text: '12hrs'
				},
				{
					type: 'day',
					count: 1,
					text: 'day'
				},
				{
					type: 'day',
					count: 7,
					text: 'week'
				},
				{
					type: 'all',
					text: 'All',
				}
			],
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
			min: 70,
			max: 84,
			endOnTick: false,
			maxPadding: 5,
			tickInterval: 5,
			endOnTick: false,
			showLastLabel: true,
			alignTicks: false,
			labels: {
				format: '{value}°F',
				style: {
					color: '#666666'
				}
			},
			title: {
				text: 'Temperature',
				style: {
					color: '#666666',
					fontSize: '15px'
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
		}],
		legend: {
			enabled: true,
			layout: 'horizontal',
			align: 'center'
		}
	};

	var humidity_line_chart = {
		chart: {
			renderTo: 'humidity_line_chart',
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
			buttons: [{
					type: 'hour',
					count: 12,
					text: '12hrs'
				},
				{
					type: 'day',
					count: 1,
					text: 'day'
				},
				{
					type: 'day',
					count: 7,
					text: 'week'
				},
				{
					type: 'all',
					text: 'All',
				}
			],
		},
		navigator: {
			enabled: false
		},
		scrollbar: {
			enabled: false
		},
		exporting: {
			enabled: true
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
			min: 0,
			max: 100,
			endOnTick: false,
			maxPadding: 5,
			tickInterval: 20,
			endOnTick: false,
			showLastLabel: true,
			alignTicks: false,
			labels: {
				format: '{value}%',
				style: {
					color: '#666666'
				}
			},
			title: {
				text: 'Humidity',
				style: {
					color: '#666666',
					fontSize: '15px'
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
				valueSuffix: ' %'
			}
		}, {
			name: 'Livingroom',
			type: 'line',
			data: [],
			marker: {
				enabled: true
			},
			tooltip: {
				valueSuffix: ' %'
			}
		}, {
			name: 'Kitchen',
			type: 'line',
			data: [],
			marker: {
				enabled: true
			},
			tooltip: {
				valueSuffix: ' %'
			}
		}, {
			name: 'Office',
			type: 'line',
			data: [],
			marker: {
				enabled: true
			},
			tooltip: {
				valueSuffix: ' %'
			}
		}],
		legend: {
			enabled: true,
			layout: 'horizontal',
			align: 'center'
		}
	};

	$.getJSON('/static/json/api_data.json', function(data) {
		var bedroom_temp = [],
			bedroom_humidity = [],
			livingroom_temp = [],
			livingroom_humidity = [],
			kitchen_temp = [],
			kitchen_humidity = [],
			office_temp = [],
			office_humidity = [];
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
		temp_line_chart.series[0].data = bedroom_temp;
		temp_line_chart.series[1].data = livingroom_temp;
		temp_line_chart.series[2].data = kitchen_temp;
		temp_line_chart.series[3].data = office_temp;
		temp_line_chart = new Highcharts.StockChart(temp_line_chart);
		humidity_line_chart.series[0].data = bedroom_humidity;
		humidity_line_chart.series[1].data = livingroom_humidity;
		humidity_line_chart.series[2].data = kitchen_humidity;
		humidity_line_chart.series[3].data = office_humidity;
		humidity_line_chart = new Highcharts.StockChart(humidity_line_chart);
	});
});
