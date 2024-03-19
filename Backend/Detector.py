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
    data = request.json
    result = data.get('msg')

    # decode base64 to image
    image_data = base64.b64decode(list(result.values())[0])

    # Generate a unique filename for the image
    filename = f"{uuid.uuid4()}.png"

    # Save the image to GridFS
    with fs.new_file() as f:
        f.write(image_data)

    # Insert the username and GridFS file ID into the database
    db.users.insert_one({
        "username": result.get('username'),
        "image_id": str(f.id)
    })

    # Retrieve the image data from GridFS
    with fs.get(db.users.find_one({"username": result.get('username')})["image_id"]) as f:
        image_data = f.read()

    # Send the image data to the API
    files = {'media': ('image.jpg', image_data, 'image/jpeg')}
    r = requests.post('https://api.sightengine.com/1.0/check.json', files=files, data=params)
    op = r.json()

    if (op.get("weapon") > 0.5 or op.get("nudity").get("suggestive") > 0.5 or op.get("nudity").get("sexual_activity") > 0.5 or op.get("alcohol") > 0.5 or op.get("offensive").get("middle_finger") > 0.5):
        return jsonify({"message": "Profanity Detected!!!"}), 200
    else:
        return jsonify({"message": "No Profanity Detected"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5025) 