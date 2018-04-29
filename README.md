# Home Climate Control Monitor

_Do you feel like a certain rooms in your home are always much warmer/cooler than the rest of the house?_<br />
_Want to know how effective your HVAC system is at maintaining a specific temperature in the summer or winter?_

Home CC Monitor is a real-time IoT monitoring application for home climates that addresses these questions. It retrieves data from sensor nodes throughout a house over a RESTful API and stores the data in a database. The front-end allows one to easily analyze the temperature variations per room via historical data visualization, as well as monitor live temperature and humidity status of each sensor node. The project will ultimately provide a low-cost solution to evaluating the efficiency of one's HVAC system.

-----
## Minimum Viable Product
- [ ] Maintain a database of organized temperature data from an API feed which is displayed on the front-end.
- [ ] Visualization of current temperature data per room.
- [ ] Visualization of historical temperature data.

The project consists of minimal hardware and full stack deployment of Python/Javascript/jQuery/PostgreSQL.

## Stretch Goals
- [ ] Compare overall data to local weather conditions using a local weather API.
- [ ] Create customizable alerts for rooms that exceed or fall below set values.
  - [ ] Integrate alerts with IFTTT Service
- [ ] Make the application scalable using unique ID’s and passwords for multiple users.
- [ ] Create a mobile friendly front-end.
- [ ] Create more complex Javascript functions to analyze historical temperatures logs and predict home climate or further quantify temperature deviations.

## Built With
![bootstrap icon](readme-img/bootstrap.png) Bootstrap &nbsp;|&nbsp; ![css3 icon](readme-img/css3.png) CSS3 &nbsp;|&nbsp; ![github icon](readme-img/github.png) GitHub &nbsp;|&nbsp; ![heroku icon](readme-img/heroku.png) Heroku

![html5 icon](readme-img/html5.png) HTML5 &nbsp;|&nbsp;  ![javascript icon](readme-img/javascript.png) JavaScript &nbsp;|&nbsp; ![jinja icon](readme-img/jinja.png) Jinja2 &nbsp;|&nbsp; ![jquery icon](readme-img/jquery.png) jQuery

![matlab icon](readme-img/matlab.png) ThingSpeak &nbsp;|&nbsp; ![postgresql icon](readme-img/postgresql.png) PostgreSQL &nbsp;|&nbsp; ![python icon](readme-img/python.png) Python 3 &nbsp;|&nbsp; ![tornado icon](readme-img/tornado.png) Tornado

-----

### Hardware:
- [Adafruit ESP8266](https://www.adafruit.com/product/2821)
- [Bosch Sensortec BME280](https://learn.adafruit.com/adafruit-feather-huzzah-esp8266?view=all)

