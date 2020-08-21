import requests
import os
import time
import logging
from random import randint


logging.basicConfig(level=logging.WARNING)


URL = 'http://' + os.environ.get("DJANGO_BACKEND", "127.0.0.1") + ':' +  os.environ.get("DJANGO_BACKEND_PORT", "8000") + '/api/'


def get_workers_count(max_wokerrs_count):
    return randint(0, max_wokerrs_count)


while True:
    all_areas = requests.get(URL + 'drone/areas/').json()

    if len(all_areas) == 0:
        logging.error('Create areas, because areas now does not exists.')
        break

    for area in all_areas:

        update_area_status = {
            'working_now': get_workers_count(area['workers_count'])
        }

        logging.warning(f' In area with id: {area["id"]} now working {update_area_status["working_now"]} workers.')

        area_url = URL + 'drone/areas/' + str(area['id']) + '/'
        requests.put(area_url, update_area_status)

        time.sleep(2)

    time.sleep(2)
