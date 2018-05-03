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
payload = {'api_key': 'XXXXXXXXXX', 'timezone': 'America/Chicago'}
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

def decToStr(o):
    d = str(decimal.Decimal(o))
    return d

if os.path.exists(filename):
    results = session.query('SELECT created, bedroom_temp, bedroom_humidity, livingroom_temp, livingroom_humidity, kitchen_temp, kitchen_humidity, office_temp, office_humidity FROM home_mon ORDER BY created DESC LIMIT 1').items()
    mode = 'a'
    for row in results:
        tmpDatetime = row['created']
        tmpDatetime = tmpDatetime.replace(tzinfo=None).isoformat()
        rdata = {
        'created': tmpDatetime,
        'bedroom_temp': decToStr(row['bedroom_temp']),
        'bedroom_humidity': decToStr(row['bedroom_humidity']),
        'livingroom_temp': decToStr(row['livingroom_temp']),
        'livingroom_humidity': decToStr(row['livingroom_humidity']),
        'kitchen_temp': decToStr(row['kitchen_temp']),
        'kitchen_humidity': decToStr(row['kitchen_humidity']),
        'office_temp': decToStr(row['office_temp']),
        'office_humidity': decToStr(row['office_humidity'])
        }
        jdata.append(rdata)
else:
    results = session.query('SELECT created, bedroom_temp, bedroom_humidity, livingroom_temp, livingroom_humidity, kitchen_temp, kitchen_humidity, office_temp, office_humidity FROM home_mon ORDER BY created DESC').items()
    mode = 'w'
    for row in results:
        tmpDatetime = row['created']
        tmpDatetime = tmpDatetime.replace(tzinfo=None).isoformat()
        rdata = {
        'created': tmpDatetime,
        'bedroom_temp': decToStr(row['bedroom_temp']),
        'bedroom_humidity': decToStr(row['bedroom_humidity']),
        'livingroom_temp': decToStr(row['livingroom_temp']),
        'livingroom_humidity': decToStr(row['livingroom_humidity']),
        'kitchen_temp': decToStr(row['kitchen_temp']),
        'kitchen_humidity': decToStr(row['kitchen_humidity']),
        'office_temp': decToStr(row['office_temp']),
        'office_humidity': decToStr(row['office_humidity'])
        }
        jdata.append(rdata)

output = json.dumps(jdata)
file_handle = open('api_data.json', mode)
file_handle.write(output)
file_handle.close()
