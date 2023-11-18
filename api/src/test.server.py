import requests
from datetime import date, time 
import uuid 
# import logging

# logger = logging.getLogger(__name__)
# logger.setLevel(logging.INFO)

# handler = logging.StreamHandler()
# formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# handler.setFormatter(formatter)
# logger.addHandler(handler)

# logger.info('This is an info message.')
# logger.warning('This is a warning message.')
# logger.error('This is an error message.')


print("***Getting a user:***")

getUser = requests.get("http://127.0.0.1:8000/users/me")

print(getUser)
print(getUser.text)
print(getUser.status_code)


print("***Getting a bout:***")

getBout = requests.get("http://127.0.0.1:8000/bouts/fake_bout")

print(getBout)
print(getBout.text)
print(getBout.status_code)


print("***Adding a bout:***")


postBout =  requests.post(
    "http://127.0.0.1:8000/events/bout", 
    json={
        "event_id": str(uuid.uuid4()), 
        "address": "Las Vegas NV",
        "time": time(17, 15).strftime("%H:%M"), 
        "date": date(2024, 7, 11).isoformat(), 
        "theme": "Rollercon Party", 
        "level": "AA", 
        "jersey_colors": "teal and orange",
        "ruleset": "WFTDA",
        "co_ed": True,
        "opposing_team": "random"
        }
    )

print(postBout)
print(postBout.text)
print(postBout.status_code)

print("***Adding a mixer:***")


postMixer =  requests.post(
    "http://127.0.0.1:8000/events/mixer", 
    json={
        "event_id": str(uuid.uuid4()), 
        "address": "455 Main St, Kansas City, MO",
        "time": time(17, 15).strftime("%H:%M"), 
        "date": date(2024, 7, 11).isoformat(), 
        "theme": "Balloons and Daggers", 
        "level": "B/C", 
        "jersey_colors": "pink and purple",
        "ruleset": "USARS",
        "co_ed": True,
        "signup_link": "https://www.signupHere.com/"
        }
    )

print(postMixer)
print(postMixer.text)
print(postMixer.status_code)

print("***Getting all Events:***")

getEvents = requests.get("http://127.0.0.1:8000/events/")

print(getEvents)
print(getEvents.text)
print(getEvents.status_code)

