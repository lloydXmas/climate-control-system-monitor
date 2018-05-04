$(document).ready(function() {
    var figure_id = $("#detail-data").data()['slug'] + '_detail';
    var detail_temps = $("#detail-data").data()['temp'];
    var detail_humis = $("#detail-data").data()['humi'];
    console.log(detail_temps);
    console.log(detail_humis);
    
    function drawChart(id, temp, humidity) {
        Highcharts.chart(id, {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Daily Room Climate'
            },
            subtitle: {
                text: 'Source: <a href="https://thingspeak.com/channels/484266/shared_view">ThingSpeak Channel</a>'
            },
            exporting: {
            enabled: false
            },
            xAxis: [{
                categories: ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'],
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                min: 65,
                max: 80,
                labels: {
                    format: '{value}°F',
                    style: {
                        color: '#3d76d3'
                    }
                },
                title: {
                    text: 'Temperature',
                    style: {
                        color: '#3d76d3'
                    }
                },

            }, { // Secondary yAxis
                min: 35,
                max: 70,
                gridLineWidth: 0,
                title: {
                    text: 'Humidity',
                    style: {
                        color: '#79dd5a'
                    }
                },
                opposite: true,
                labels: {
                    format: '{value} %',
                    style: {
                        color: '#79dd5a'
                    }
                }

            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                x: -50,
                verticalAlign: 'bottom',
                y: -50,
                floating: true,
                backgroundColor: 'rgba(255,255,255,0.5)'
            },
            series: [{
                name: 'Temperature',
                type: 'spline',
                
                data: temp,
                tooltip: {
                    valueSuffix: ' °F'
                },
                color: '#3d76d3'

            }, {
                name: 'Humidity',
                type: 'spline',
                yAxis: 1,
                data: humidity,
                tooltip: {
                    valueSuffix: ' %'
                },
                color: '#79dd5a'
            }]
        });
    }

    drawChart(figure_id, detail_temps, detail_humis);

// if it's the last day with data, prev button is disabled; if it's already today, next button is disabled
    
    var today = $("#detail-data").data()['date'];
    console.log(today);
    console.log(moment().format('YYYY-MM-DD'));
    if (today == moment().format('YYYY-MM-DD')) {
            $('#next').css('visibility', "hidden");

    }
    else if (today == '2018-04-30') {
            $('#previous').css('visibility', "hidden");
    }
// add hover effect for control buttons    
    $(".button-control").hover(function(){
        $(this).find("h6").css("text-shadow", "1px 1px 1px orange");
    },
        function() {
            $(this).find("h6").css("text-shadow", "0 0 0 white");
        }
    );
});
