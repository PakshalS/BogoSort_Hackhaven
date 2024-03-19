from flask import *
# from SignUpForm import *
from cv2 import imshow,imwrite,VideoCapture,imread
from flask_pymongo import PyMongo
from gridfs import GridFS
import cv2
import urllib.parse
from flask_cors import CORS,cross_origin
from flask_bcrypt import Bcrypt
import requests
import json
import uuid
import base64
from bson import ObjectId

app=Flask(__name__)
app.config['SECRET_KEY']='87c725f6be51b16e19446e14b59149e7'
CORS(app)
bcrypt=Bcrypt(app)
username = urllib.parse.quote_plus('shettyaadi9')
password = urllib.parse.quote_plus('aadi@2004')
app.config['MONGO_URI'] = f'mongodb+srv://{username}:{password}@cluster0.v2ff3xl.mongodb.net/Login_details?connectTimeoutMS=30000'
mongo = PyMongo(app)
fs = GridFS(mongo.db)
db = mongo.db.Login_details

params = {
    'models': 'nudity-2.0,wad,offensive',
    'api_user': '492589490',
    'api_secret': 'amKiry7wLtbAcv8x6hoFPuiURqbKoWP4'
}

@app.route('/', methods=['POST'])
def submit_form():
    data = request.get_json()
    result = data.get('msg')

    if not result or 'image' not in result or not result['image']:
        return jsonify({'error': 'No image provided'}), 400

    # Decode base64 to image
    image_data = base64.b64decode(result['image'])

    # Generate a unique filename for the image
    filename = f"{uuid.uuid4()}.png"

    # Save the image to GridFS
    with fs.new_file(filename) as f:
        f.write(image_data)

    # Insert the username and GridFS file ID into the database
    user_data = {"username": result.get('username')}
    user_data["image_id"] = str(f.id)
    db.users.insert_one(user_data)

    print("Image saved and user data inserted")

    # Retrieve the image data from GridFS
    image_id = ObjectId(user_data["image_id"])
    with fs.get(image_id) as f:
        image_data = f.read()

    return jsonify({'image_data': image_data.decode('utf-8')})

if __name__ == "__main__":
    app.run(debug=True)