# twilio_client.py
import os
from twilio.rest import Client

# Pull from your environment (make sure .env is loaded in app.py)
TWILIO_SID   = os.getenv('TWILIO_SID')
TWILIO_TOKEN = os.getenv('TWILIO_TOKEN')
TWILIO_PHONE = os.getenv('TWILIO_PHONE')  # e.g. 'whatsapp:+1415xxxxxxx' or your SMS number

client = Client(TWILIO_SID, TWILIO_TOKEN)
