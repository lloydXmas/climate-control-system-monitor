#!/usr/bin/env python3

import queries
import requests

# Request last update to feeds
payload = {'api_key': 'XXXXXXXXXXXXX', 'timezone': 'America/Chicago'}
r = requests.get('https://api.thingspeak.com/channels/484266/feeds/last.json', params=payload)
data = r.json()

creation = data['created_at']
bedroom_temp = data['field1']
bedroom_humidity = data['field2']
livingroom_temp = data['field3']
livingroom_humidity = data['field4']
kitchen_temp = data['field5']
kitchen_humidity = data['field6']
office_temp = data['field7']
office_humidity = data['field8']

session = queries.Session("postgresql://postgres@localhost:5432/home_mon")

results = session.query(
    'INSERT INTO home_mon VALUES (DEFAULT, %(creation)s, %(bedroom_temp)s, %(bedroom_humidity)s, %(livingroom_temp)s, %(livingroom_humidity)s, %(kitchen_temp)s, %(kitchen_humidity)s, %(office_temp)s, %(office_humidity)s)',
    {
        'creation': creation,
        'bedroom_temp': bedroom_temp,
        'bedroom_humidity': bedroom_humidity,
        'livingroom_temp': livingroom_temp,
        'livingroom_humidity': livingroom_humidity,
        'kitchen_temp': kitchen_temp,
        'kitchen_humidity': kitchen_humidity,
        'office_temp': office_temp,
        'office_humidity': office_humidity
    })

