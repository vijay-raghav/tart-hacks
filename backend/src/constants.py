# This is written for PYTHON 3
# Don't forget to install requests package

import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('NESSIE_API_KEY')   
url = f'http://api.nessieisreal.com/customers?key={api_key}'

response = requests.get( 
    url,
    headers={'content-type':'application/json'},
)

print(response.text)

data = json.loads(response.text)

for customer in data:
    customerId = customer["_id"]

    print(customer)

    if response.status_code == 201:
        print('account created')