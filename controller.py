import os
import tornado.ioloop
import tornado.web
import tornado.log
import time
from datetime import datetime, date, timedelta
import requests
import queries

from jinja2 import \
    Environment, PackageLoader, select_autoescape

ENV = Environment(
    loader=PackageLoader('monitor', 'templates'),
    autoescape=select_autoescape(['html', 'xml']))
    
class TemplateHandler(tornado.web.RequestHandler):
    def render_template(self, tpl, context):
        template = ENV.get_template(tpl)
        self.write(template.render(**context))
        
    def get(self):
        self.set_header('Cache-Control',
      'no-store, no-cache, must-revalidate, max-age=0')
      
    def initialize(self):
        self.session = queries.Session(
        'postgresql://postgres@localhost:5432/home_mon')  
        
class MainHandler(TemplateHandler):
    def get(self):
        super().get()
# api request setup
        url = "https://api.thingspeak.com/channels/484266/feeds/last.json"
        api_key = os.environ.get('ThingSpeak_API_KEY')
        timezone = "America/Chicago"
        payload = {'api_key': api_key, 'timezone': timezone}
        r = requests.get(url, params=payload)
        
        appid = os.environ.get('OpenWeather_APPID')
        weather_url = 'http://api.openweathermap.org/data/2.5/weather'
        weather_payload = {'q': 'Houston', 'appid': appid, 'units': 'imperial'}
        r_weather = requests.get(weather_url, params=weather_payload)
       
        local_weather = r_weather.json()['main']['temp']
        self.render_template("main.html", {'response': r.json(), 'local_weather': local_weather})

# after searching online, I've found dynamic SQL query is risky and a bad practice, so not use here
class DetailHandler(TemplateHandler):
    def get(self, slug, date):
        super().get()
        fieldTemp = "{}_temp".format(slug)
        fieldHumi = "{}_humidity".format(slug)
        fmt = '%Y-%m-%d'       
        ts = time.strptime(date, fmt)
        dt = datetime.fromtimestamp(time.mktime(ts))
        yesterday = (dt - timedelta(1)).strftime(fmt)
        tomorrow = (dt + timedelta(1)).strftime(fmt)
        if slug == 'bedroom':
            details = self.session.query('''SELECT created::time, bedroom_temp, bedroom_humidity FROM home_mon WHERE created::date = %(date)s ORDER BY created ASC ''', {'date': date})
        elif slug == 'livingroom':
            details = self.session.query('''SELECT created::time, livingroom_temp, livingroom_humidity FROM home_mon WHERE created::date = %(date)s ORDER BY created ASC ''', {'date': date})
        elif slug == 'office':
            details = self.session.query('''SELECT created::time, office_temp, office_humidity FROM home_mon WHERE created::date = %(date)s ORDER BY created ASC ''', {'date': date})
        elif slug == 'kitchen':
            details = self.session.query('''SELECT created::time, kitchen_temp, kitchen_humidity FROM home_mon WHERE created::date = %(date)s ORDER BY created ASC ''', {'date': date})
        details.free()
        temps = []
        humis = []
        for detail in details:
            temps.append(float(detail[fieldTemp]))
            humis.append(float(detail[fieldHumi]))
        self.render_template("detail_template.html", {'slug': slug, 'temps': temps, 'humis': humis, 'date': date, 'yesterday': yesterday, 'tomorrow': tomorrow})
    

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/detail/(.*?)/(.*)", DetailHandler),
        (r"/static/(.*)", tornado.web.StaticFileHandler,
        {'path': 'monitor/static'})
        ],
        autoreload=True)

if __name__ == "__main__":
    tornado.log.enable_pretty_logging()
    app = make_app()
    PORT = int(os.environ.get('PORT', '2000'))
    app.listen(PORT)
    print('starting...')
    tornado.ioloop.IOLoop.current().start()
