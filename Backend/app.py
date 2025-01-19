from crypt import methods

import requests
from flask import Flask, request, jsonify
from datetime import datetime
import pytz
import os
from connect import connect
from fun import extract_data
from langflow import run_flow, ENDPOINT, APPLICATION_TOKEN, TWEAKS
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

db = connect()

CORS(app)


@app.route("/",methods=["GET"])
def hi():
    return jsonify({"message": "hi"}),200


@app.route("/fetch", methods=["GET"])
def fetch_data():
    try:
        limit = request.args.get('limit', default=5, type=int)
        collection = db["social_media"]
        documents = collection.find().limit(limit)
        users = []
        for doc in documents:
                users.append(doc)
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

from flask import request, jsonify
import requests
import os

@app.route("/kundali", methods=["POST"])
def kundali():
    try:
        data = request.get_json()
        print(data)
        # Extract parameters from the request body
        datetime = data.get("datetime", "")
        lat = data.get("lat", "")
        lng = data.get("lng", "")
        name = data.get("name", "")

        if not datetime or not lat or not lng or not name:
            return jsonify({"error": "Missing required parameters"}), 400

        # Split the name into first, middle, and last name
        name_parts = name.split()
        first_name = name_parts[0] if len(name_parts) > 0 else ""
        middle_name = name_parts[1] if len(name_parts) > 1 else ""
        last_name = name_parts[-1] if len(name_parts) > 2 else ""

        # Construct the API URL
        kundali_url = f"https://api.prokerala.com/v2/astrology/kundli/advanced"
        lpn_url = "https://api.prokerala.com/v2/numerology/life-path-number"
        des_url = "https://api.prokerala.com/v2/numerology/destiny-number"

        kundali_params = {
            "ayanamsa": 1,
            "coordinates": f"{lat},{lng}",
            "datetime": datetime
        }

        des_params = {
            "first_name": first_name,
            "middle_name": middle_name,
            "last_name": last_name
        }


        lpn_params = {
            "datetime": datetime
        }

        headers = {"Authorization": f"Bearer {os.getenv('ACCESS_TOKEN')}"}

        # Fetch Kundali data
        kundali_response = requests.get(kundali_url, headers=headers, params=kundali_params)
        if kundali_response.status_code != 200:
            return jsonify({"error": f"Kundali API error: {kundali_response.text}"}), kundali_response.status_code

        # Fetch Life Path Number (LPN) data
        lpn_response = requests.get(lpn_url, headers=headers, params=lpn_params)
        if lpn_response.status_code != 200:
            return jsonify({"error": f"LPN API error: {lpn_response.text}"}), lpn_response.status_code

        # Fetch Destiny Number data
        des_response = requests.get(des_url, headers=headers, params=des_params)
        if des_response.status_code != 200:
            return jsonify({"error": f"Destiny Number API error: {des_response.text}"}), des_response.status_code

        # Combine all responses and send them back
        combined_response = {
            "kundali": kundali_response.json(),
            "life_path_number": lpn_response.json(),
            "destiny_number": des_response.json()
        }
        row = extract_data(kundali_response.json())
        print(kundali_response.json())
        collection = db["kundli"]
        collection.insert_one(row)
        print("added")
        return jsonify(combined_response), 200

    except Exception as e:
        print(e.with_traceback())
        return jsonify({"error": str(e)}), 500


@app.route("/chart",methods=["POST"])
def chart():
    try:
        url = "https://astrologer.p.rapidapi.com/api/v4/birth-chart"
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing request body"}), 400

        subject = data.get("subject")
        if not subject:
            return jsonify({"error": "Missing 'subject' field in request body"}), 400

        # Prepare headers for the external API call
        headers = {
            "x-rapidapi-key": os.getenv("API_KEY"),
            "Content-Type": "application/json"
        }

        # Send request to the external API
        response = requests.post(url, json=subject, headers=headers)
        print(response)
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"error": f"Error from external API: {response.text}"}), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/daily", methods=["GET"])
def daily_pred():
    try:
        zodiac_sign = request.args.get("zodiac_sign", "")
        if not zodiac_sign:
            return jsonify({"error": "Zodiac sign is required"}), 400

        # Prepare the request to the external API
        headers = {"Authorization": f"Bearer {os.getenv('ACCESS_TOKEN')}"}
        daily_url = "https://api.prokerala.com/v2/horoscope/daily"

        # Get current datetime in UTC and format it
        now_utc = datetime.now(pytz.utc)
        formatted_datetime = now_utc.strftime('%Y-%m-%dT%H:%M:%S%z')

        # Ensure the timezone is in the correct format: +00:00 (without URL encoding)
        formatted_datetime = formatted_datetime[:-2] + ":" + formatted_datetime[-2:]

        daily_params = {
            "datetime": formatted_datetime,
            "sign": zodiac_sign
        }

        # Make the API call to the horoscope service
        response = requests.get(daily_url, headers=headers, params=daily_params)
        if response.status_code != 200:
            return jsonify({"error": f"API error: {response.text}"}), response.status_code

        return jsonify(response.json()), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/analyze", methods=["POST"])
def execute_flow():
    data = request.json
    print(data)
    message = data.get("message", "")
    tweaks = data.get("tweaks", TWEAKS)
    output_type = data.get("output_type", "chat")
    input_type = data.get("input_type", "chat")
    application_token = data.get("application_token", APPLICATION_TOKEN)

    try:
        response = run_flow(message, output_type, input_type, tweaks, application_token)
        print(response)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat_flow():
    data = request.json
    message = data.get("message", "")
    tweaks = data.get("tweaks", TWEAKS)
    output_type = data.get("output_type", "chat")
    input_type = data.get("input_type", "chat")
    application_token = data.get("application_token", APPLICATION_TOKEN)
    message = (
        f"Behave as a highly spiritual person who guides about spirituality. Take references from database. The message is {message}"
    )
    try:
        response = run_flow(message, output_type, input_type, tweaks, application_token)
        print(response)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
