from flask import Flask, request, jsonify

from connect import connect
from langflow import run_flow, ENDPOINT, APPLICATION_TOKEN, TWEAKS
from flask_cors import CORS

app = Flask(__name__)

db = connect()

CORS(app)
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


@app.route("/analyze", methods=["POST"])
def execute_flow():
    data = request.json
    message = data.get("message", "")
    tweaks = data.get("tweaks", TWEAKS)
    output_type = data.get("output_type", "chat")
    input_type = data.get("input_type", "chat")
    application_token = data.get("application_token", APPLICATION_TOKEN)

    try:
        response = run_flow(message, output_type, input_type, tweaks, application_token)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat_flow():
    data = request.json
    message = data.get("message", "")
    user_name = data.get("user_name")
    tweaks = data.get("tweaks", TWEAKS)
    output_type = data.get("output_type", "chat")
    input_type = data.get("input_type", "chat")
    application_token = data.get("application_token", APPLICATION_TOKEN)
    message = (f"By analyzing posts of user of username = {user_name} do this task: {message}."
               f"If some chart is asked then generate it as image and provide the link in strictly in markdown format and in no other format.")
    try:
        response = run_flow(message, output_type, input_type, tweaks, application_token)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
