import time
from flask import Flask, request, jsonify

import firebase_admin
from firebase_admin import credentials, db, storage, firestore
import os
from werkzeug.utils import secure_filename
import uuid


app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'wav'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
firebase_storage = storage.bucket("duality-uottahack.appspot.com") 

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@app.route('/time')
def get_current_time():
    return {'time': time.time()}


# Get senders voice recording from database
@app.route('/messages/recording/<id>')
def get_senders_recording(id):

    return #return the .wav file from fire base


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Upload the file to Firebase Storage
        blob = firebase_storage.blob(filename)
        with open(filepath, 'rb') as f:
            blob.upload_from_file(f)
        
        # Get the download URL of the uploaded file
        download_url = blob.generate_signed_url(expires_in=600)  # Example URL expiration time
        
        # Store the download URL in the Firebase Realtime Database or Firestore
        ref = db.reference('/uploaded_files')
        ref.push(download_url)

        return 'File uploaded successfully and download URL stored in Firebase'
    else:
        return 'Invalid file format'


@app.route('/upload_message', methods=['POST'])
def upload_message():
    try:
        # Extract "message" from request data
        data = request.json
        message = data.get('message')
        receiver = data.get('receiver')
        sender = data.get('sender')
        timestamp = data.get('timestamp')

        if not message:
            return jsonify({'error': 'Message not provided'}), 400

        # Generate a random document ID
        #document_id = str(uuid.uuid4())

        # Store all fields in Firestore
        doc_ref = db.collection('messages').add({
            'message': message,
            'receiver': receiver,
            'sender': sender,
            'timestamp': timestamp
        })

        # Get the ID of the newly created document
        document_id = doc_ref[1].id

        return jsonify({'message_id': document_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return