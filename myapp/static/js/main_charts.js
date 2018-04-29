$(document).ready(function(){
    console.log("OK");

// highcharts setup    
    Highcharts.chart('temp_bar_figure', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Temperature by Room'
        },
        subtitle: {
            text: 'Source: <a href="https://thingspeak.com/channels/484266/shared_view">ThingSpeak Channel</a>'
        },
        xAxis: {
            categories: ['Bedroom', 'Livingroom', 'Kitchen', 'Office'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 60,
            max: 80,
            title: {
                text: 'Temperature (°F)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' °F '
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: "Current",
            data: [78, 76.5, 75, 72.5]
        }]
    });
    
   Highcharts.chart('humidity_bar_figure', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Humidity by Room'
        },
        subtitle: {
            text: 'Source: <a href="https://thingspeak.com/channels/484266/shared_view">ThingSpeak Channel</a>'
        },
        xAxis: {
            categories: ['Bedroom', 'Livingroom', 'Kitchen', 'Office'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Humidity (%)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' % '
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: "Current",
            data: [50, 50.5, 51, 50.5]
        }]
    }); 
    
    Highcharts.chart('pressure_bar_figure', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Air Pressure by Room'
        },
        subtitle: {
            text: 'Source: <a href="https://thingspeak.com/channels/484266/shared_view">ThingSpeak Channel</a>'
        },
        xAxis: {
            categories: ['Bedroom', 'Livingroom', 'Kitchen', 'Office'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 14,
            max: 15,
            title: {
                text: 'Pressure (psi)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' psi '
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: "Current",
            data: [14.7, 14.6, 14.8, 14.7]
        }]
    });
    
})