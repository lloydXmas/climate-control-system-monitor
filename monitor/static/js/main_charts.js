$(document).ready(function(){
    var apiData = $("#my-data").data()['last'].replace(/'/g, '"');
    apiData = JSON.parse(apiData);
    console.log(apiData);
    var latestTime = apiData['created_at'];
    latestTime = moment(latestTime).format('YYYY-MM-DD h:mm a');
    $("#current_time").text(moment().format('YYYY-MM-DD h:mm a'));
    var field1 = Number(apiData['field1']); 
    var field2 = Number(apiData['field2']);
    var field3 = Number(apiData['field3']);
    var field4 = Number(apiData['field4']);
    var field5 = Number(apiData['field5']);
    var field6 = Number(apiData['field6']);
    var field7 = Number(apiData['field7']);
    var field8 = Number(apiData['field8']);
    
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
            max: 85,
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
            },
            series: {
            borderColor: '#303030'
        }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: `Latest Update: ${latestTime}`,
            data: [field1, field3, field5, field7],
            color: '#3d76d3'
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
            min: 35,
            max: 70,
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
            },
            series: {
            borderColor: '#303030'
        }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: `Latest Update: ${latestTime}`,
            data: [field2, field4, field6, field8],
            color: '#79dd5a'
        }]
    }); 
    
    
})