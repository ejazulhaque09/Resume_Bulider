from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["cv_database"]
templates_collection = db["templates"]
data_collection = db["user_data"]

@app.route("/api/templates", methods=["GET"])
def get_templates():
    templates = list(templates_collection.find({}, {"_id": 0}))
    return jsonify(templates)

@app.route("/api/save-data", methods=["POST"])
def save_data():
    data = request.json
    data_collection.insert_one(data)
    return jsonify({"message": "Data saved successfully!"})

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
