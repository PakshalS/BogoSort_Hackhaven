from flask import *

# from SignUpForm import *
from cv2 import imshow, imwrite, VideoCapture, imread
from flask_pymongo import PyMongo
from gridfs import GridFS
import cv2
import urllib.parse
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
import requests
import json
import uuid
import base64
from bson import ObjectId
from deepface import DeepFace
import os
from PIL import Image
import io

app = Flask(__name__)
app.config["SECRET_KEY"] = "87c725f6be51b16e19446e14b59149e7"
CORS(app)
bcrypt = Bcrypt(app)
username = urllib.parse.quote_plus("shettyaadi9")
password = urllib.parse.quote_plus("aadi@2004")
app.config["MONGO_URI"] = (
    f"mongodb+srv://{username}:{password}@cluster0.v2ff3xl.mongodb.net/Login_details?connectTimeoutMS=30000"
)
mongo = PyMongo(app)
fs = GridFS(mongo.db)
db = mongo.db.Login_details

params = {
    "models": "nudity-2.0,wad,offensive",
    "api_user": "492589490",
    "api_secret": "amKiry7wLtbAcv8x6hoFPuiURqbKoWP4",
}


@app.route("/", methods=["POST"])
def submit_form():
    data = request.json
    try:
        result = data.get("msg").get("image")
        # print(data)
        result = result[22:]
        # print(result)
        if not data:
            return jsonify({"error": "No image provided"}), 400

        # Decode base64 to image
        image_data = base64.b64decode(result)

        # Generate a unique filename for the image
        filename = f"{uuid.uuid4()}.png"

        # Save the image to GridFS
        with fs.new_file() as f:
            f.filename = filename
            f.write(image_data)
            file_id = f._id

        # Insert the username and GridFS file ID into the database
        user_data = {"image_id": str(file_id)}
        db.users.insert_one(user_data)

        print("Image saved and user data inserted")

        # Retrieve the image data from GridFS
        image_id = ObjectId(user_data["image_id"])
        with fs.get(file_id) as f:
            image_data = f.read()

        print("Bhai bahi")
        image_pil = Image.open(io.BytesIO(image_data))
        if image_pil.mode == 'RGBA':
                 image_pil = image_pil.convert('RGB')

        # Construct the path to save the image
        output_folder = "Backend"  # Specify the folder where you want to save the images
        os.makedirs(output_folder, exist_ok=True)  # Create the output folder if it doesn't exist
        output_path = os.path.join(output_folder, filename.replace('.png', '.jpg'))  # Construct the full output path with .jpg extension

        # Replace backslashes with forward slashes in the file path
        output_path = output_path.replace('\\', '/')

        # Convert the image to PNG format and save it to the output file
        image_pil.save(output_path)
        print("Image saved to:", output_path)
        

        # Send the image data to the API
        files = {"media": ("image.png", image_data, "image/png")}
        r = requests.post(
            "https://api.sightengine.com/1.0/check.json", files=files, data=params
        )
        op = r.json()
        print(op)

        if None in (
            op.get("weapon"),
            op.get("nudity"),
            op.get("alcohol"),
            op.get("offensive"),
        ):
            return jsonify(redirect_url="/meeting"), 200

        elif (
            op.get("weapon") > 0.5
            or op.get("nudity").get("suggestive") > 0.5
            or op.get("nudity").get("sexual_activity") > 0.5
            or op.get("alcohol") > 0.5
            or op.get("offensive").get("middle_finger") > 0.5
        ):
            return jsonify(redirect_url="/"), 200
        else:
            # verify the image dumbass
            print(data.get("msg").get("email"))
            email_id = data.get("msg").get("email")
            email = email_id[:4]
            image_path = f"{email}.jpg"
            print("assets/"+image_path)
            veri = DeepFace.verify(
                img1_path="aadi.jpg", img2_path=output_path
            )
            print(json.dumps(veri, indent=2))
            if veri.get('verified')==True:
                print("forwarding to meeting")
                return jsonify(redirect_url="/meeting"), 200
            else:
                print("NOT VERIFIED")
                return jsonify(redirect_url="/meeting"), 200
    except AttributeError:  # FOR MEETING
        result = data.get("imageData")
        result = result[22:]
        print("ehllo")
        # Decode base64 to image
        image_data = base64.b64decode(result)

        # Generate a unique filename for the image
        filename = f"{uuid.uuid4()}.png"

        # Save the image to GridFS
        with fs.new_file() as f:
            f.filename = filename
            f.write(image_data)
            file_id = f._id

        # Insert the username and GridFS file ID into the database
        user_data = {"email_id": email_id}
        user_data = {"image_id": str(file_id)}
        db.users.insert_one(user_data)

        print("Image saved and user data inserted")

        # Retrieve the image data from GridFS
        image_id = ObjectId(user_data["image_id"])
        with fs.get(file_id) as f:
            image_data = f.read()

        print("1")

        # Send the image data to the API
        files = {"media": ("image.png", image_data, "image/png")}
        r = requests.post(
            "https://api.sightengine.com/1.0/check.json", files=files, data=params
        )
        op = r.json()
        print(op)

        if None in (
            op.get("weapon"),
            op.get("nudity"),
            op.get("alcohol"),
            op.get("offensive"),
        ):
            return jsonify({"message": "No Profanity Detected"}), 200

        if (
            op.get("weapon") > 0.5
            or op.get("nudity").get("suggestive") > 0.5
            or op.get("nudity").get("sexual_activity") > 0.5
            or op.get("alcohol") > 0.5
            or op.get("offensive").get("middle_finger") > 0.5
        ):
            return jsonify({"message": "Profanity Detected!!!"}), 200
        else:

            return jsonify({"message": "No Profanity Detected"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5025)
