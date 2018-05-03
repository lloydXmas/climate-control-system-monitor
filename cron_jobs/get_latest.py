#!/usr/bin/env python3
import arrow
import json
import decimal
import os
import queries
import requests

session = queries.Session("postgresql://postgres@localhost:5432/home_mon")
results = session.query("SET timezone='America/Chicago'")

# Request last update to feeds
payload = {'api_key': '1Y9G9090EIIX3989', 'timezone': 'America/Chicago'}
r = requests.get('https://api.thingspeak.com/channels/484266/feeds/last.json', params=payload)
data = r.json()

created = data['created_at']
bedroom_temp = data['field1']
bedroom_humidity = data['field2']
livingroom_temp = data['field3']
livingroom_humidity = data['field4']
kitchen_temp = data['field5']
kitchen_humidity = data['field6']
office_temp = data['field7']
office_humidity = data['field8']

results = session.query(
    'INSERT INTO home_mon VALUES (DEFAULT, %(created)s, %(bedroom_temp)s, %(bedroom_humidity)s, %(livingroom_temp)s, %(livingroom_humidity)s, %(kitchen_temp)s, %(kitchen_humidity)s, %(office_temp)s, %(office_humidity)s)',
    {
        'created': created,
        'bedroom_temp': bedroom_temp,
        'bedroom_humidity': bedroom_humidity,
        'livingroom_temp': livingroom_temp,
        'livingroom_humidity': livingroom_humidity,
        'kitchen_temp': kitchen_temp,
        'kitchen_humidity': kitchen_humidity,
        'office_temp': office_temp,
        'office_humidity': office_humidity
    })

# Generate JSON by serializing all data from db
filename = 'api_data.json'
jdata = []

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)

results = session.query('SELECT created, bedroom_temp, bedroom_humidity, livingroom_temp, livingroom_humidity, kitchen_temp, kitchen_humidity, office_temp, office_humidity FROM home_mon ORDER BY created DESC').items()
for row in results:
    tmpDatetime = row['created']
    tmpDatetime = tmpDatetime.replace(tzinfo=None).isoformat()
    rdata = {
    'created': tmpDatetime,
    'bedroom_temp': row['bedroom_temp'],
    'bedroom_humidity': row['bedroom_humidity'],
    'livingroom_temp': row['livingroom_temp'],
    'livingroom_humidity': row['livingroom_humidity'],
    'kitchen_temp': row['kitchen_temp'],
    'kitchen_humidity': row['kitchen_humidity'],
    'office_temp': row['office_temp'],
    'office_humidity': row['office_humidity']
    }
    jdata.append(rdata)

output = json.dumps(jdata, cls=DecimalEncoder)
file_handle = open('../monitor/static/js/api_data.json', 'w', encoding='utf-8')
file_handle.write(output)
file_handle.close()
