import os
import tornado.ioloop
import tornado.web
import tornado.log
import time
import requests

from jinja2 import \
    Environment, PackageLoader, select_autoescape

ENV = Environment(
    loader=PackageLoader('myapp', 'templates'),
    autoescape=select_autoescape(['html', 'xml']))
    
class TemplateHandler(tornado.web.RequestHandler):
    def render_template(self, tpl, context):
        template = ENV.get_template(tpl)
        self.write(template.render(**context))
        
    def get(self):
        self.set_header('Cache-Control',
      'no-store, no-cache, must-revalidate, max-age=0')
        
class MainHandler(TemplateHandler):
    def get(self):
        super().get()
        ts = time.localtime()
        fmt = '%Y-%m-%d %H:%M'
        current_time = time.strftime(fmt, ts)
# api request setup
        url = "https://api.thingspeak.com/channels/484266/feeds/last.json"
        api_key = "***REMOVED***"
        timezone = "America%2FChicago"
        payload = {'api_key': api_key, 'timezone': timezone}
        r = requests.get(url, params=payload)
        self.render_template("main.html", {'current_time': current_time, 'response': r.json()})
        
class DetailHandler(TemplateHandler):
    def get(self):
        super().get()
        self.render_template("detail_template.html", {})

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/detail", DetailHandler),
        (r"/static/(.*)", tornado.web.StaticFileHandler,
        {'path': 'myapp/static'})
        ],
        autoreload=True)

if __name__ == "__main__":
    tornado.log.enable_pretty_logging()
    app = make_app()
    PORT = int(os.environ.get('PORT', '2000'))
    app.listen(PORT)
    print('starting...')
    tornado.ioloop.IOLoop.current().start()