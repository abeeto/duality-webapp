from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase app
cred = credentials.Certificate("path/to/firebase_credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Define Flask route to fetch data from Firestore
@app.route("/data", methods=["GET"])
def get_data():
    data = []
    docs = db.collection("your_collection").get()
    for doc in docs:
        data.append(doc.to_dict())
    return jsonify(data)

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)