$(document).ready(function(){
    var apiData = $("#my-data").data()['last'].replace(/'/g, '"');
    apiData = JSON.parse(apiData);
    console.log(apiData);
    var latestTime = apiData['created_at'];
    latestTime = moment(latestTime).format('YYYY-MM-DD h:mm a');
    $("#current_time").text(moment().format('YYYY-MM-DD h:mm a'));
    var field1 = {value: Number(apiData['field1']), dom: '#field1'}; 
    var field2 = {value: Number(apiData['field2']), dom: '#field2'};
    var field3 = {value: Number(apiData['field3']), dom: '#field3'};
    var field4 = {value: Number(apiData['field4']), dom: '#field4'};
    var field5 = {value: Number(apiData['field5']), dom: '#field5'};
    var field6 = {value: Number(apiData['field6']), dom: '#field6'};
    var field7 = {value: Number(apiData['field7']), dom: '#field7'};
    var field8 = {value: Number(apiData['field8']), dom: '#field8'};
    
// highcharts setup    
    Highcharts.chart('temp_bar_figure', {
        chart: {
            type: 'bar'
        },
        exporting: {
        enabled: false
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
            data: [field1['value'], field3['value'], field5['value'], field7['value']],
            color: '#7fbbff'
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
            data: [field2['value'], field4['value'], field6['value'], field8['value']],
            color: '#ffc27d'
        }]
    }); 
    
// compare data so as to color the floor plan
    function compareData(arr) {
        arr.sort(function(a,b){
            return a['value'] - b['value'];
        });
        console.log(arr);
        $(arr[0]['dom']).css('fill', '#00d4ff');
        $(arr[arr.length-1]['dom']).css('fill', '#ff7800');
        var rest = arr.slice(1, arr.length-1);
        rest.forEach(function (item) {
            $(item['dom']).css('fill', '#8aff00');
        });
    }
    compareData([field1, field3, field5, field7]);
    compareData([field2, field4, field6, field8]);
})