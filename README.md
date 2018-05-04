# Home Climate Control Monitor

<p align="center">
<img src="https://github.com/lloydXmas/climate-control-system-monitor/blob/master/readme-img/logo.png" width=300 />
</p>


_Do you feel like a certain rooms in your home are always much warmer/cooler than the rest of the house?_<br />
_Want to know how effective your HVAC system is at maintaining a specific temperature in the summer or winter?_

Home CC Monitor is a real-time IoT monitoring application for home climates that addresses these questions. It retrieves data from sensor nodes throughout a house over a RESTful API and stores the data in a database. The front-end allows one to easily analyze the temperature variations per room via historical data visualization, as well as monitor live temperature and humidity status of each sensor node. The project will ultimately provide a low-cost solution to evaluating the efficiency of one's HVAC system.

-----
## Minimum Viable Product
- [X] Maintain a database of organized temperature data from an API feed which is displayed on the front-end.
- [X] Visualization of current temperature data per room.
- [ ] Visualization of historical temperature data.

The project consists of minimal hardware and full stack deployment of Python/Javascript/jQuery/PostgreSQL.

## Stretch Goals
- [ ] Compare overall data to local weather conditions using a local weather API.
- [ ] Create customizable alerts for rooms that exceed or fall below set values.
  - [ ] Integrate alerts with IFTTT Service
- [ ] Make the application scalable using unique ID’s and passwords for multiple users.
- [ ] Create a mobile friendly front-end.
- [ ] Create more complex Javascript functions to analyze historical temperatures logs and predict home climate or further quantify temperature deviations.

## Installation
The project uses [Pipenv](https://github.com/pypa/pipenv) to manage following Python libraries in a virtualenv:
```
$  pipenv install requests tornado queries jinja2 arrow
```
We chose to use [ThingSpeak's](https://thingspeak.com) REST API service to publish and retrieve data. An API Key is needed to make GET and POST requests to a private channel. Documentation can be found [here](https://www.mathworks.com/help/thingspeak/rest-api.html).

An SQL database needs to be setup with columns for datetime and each additional field of sensor data. For example:
```
CREATE TABLE home_monitor (
  id SERIAL NOT NULL PRIMARY KEY,
  created TIMESTAMP WITH TIME ZONE,
  bedroom_temp NUMERIC,
  bedroom_humidity NUMERIC,
  livingroom_temp NUMERIC,
  livingroom_humidity NUMERIC
);
```

The Python script at `cron_jobs/get_latest.py` is run every 30 minutes by adding the following job to crontab:
```
*/30 * * * * cd /home/username/climate-control-system-monitor && /path/to/pipenv run python3 cron_jobs/get_latest.py
```
where `get_latest.py` and `pipenv` are full paths. The script retrieves updated data from ThingSpeak's API, inserts it into the database, and generates a JSON file in the `monitor/static/json/ directory` 


## Built With
![bootstrap icon](readme-img/bootstrap.png) Bootstrap &nbsp;|&nbsp; ![css3 icon](readme-img/css3.png) CSS3 &nbsp;|&nbsp; ![heroku icon](readme-img/heroku.png) Heroku &nbsp;|&nbsp; ![matlab icon](readme-img/matlab.png) ThingSpeak

![html5 icon](readme-img/html5.png) HTML5 &nbsp;|&nbsp;  ![javascript icon](readme-img/javascript.png) JavaScript &nbsp;|&nbsp; ![jinja icon](readme-img/jinja.png) Jinja2 &nbsp;|&nbsp; ![jquery icon](readme-img/jquery.png) jQuery

![Highcharts icon](readme-img/Highcharts.png) Highcharts &nbsp;|&nbsp; ![postgresql icon](readme-img/postgresql.png) PostgreSQL &nbsp;|&nbsp; ![python icon](readme-img/python.png) Python 3 &nbsp;|&nbsp; ![tornado icon](readme-img/tornado.png) Tornado

-----

### Hardware:
- [Adafruit ESP8266](https://learn.adafruit.com/adafruit-feather-huzzah-esp8266?view=all)
- [SHT31 sensor](https://learn.adafruit.com/adafruit-sht31-d-temperature-and-humidity-sensor-breakout?view=all)
- [Raspberry Pi 2](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/)

