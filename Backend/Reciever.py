from flask import *
from SignUpForm import *
from cv2 import imshow,imwrite,VideoCapture,imread
from flask_pymongo import PyMongo
from gridfs import GridFS
from io import BytesIO
import cv2
import urllib.parse
from flask_cors import CORS,cross_origin
from flask_bcrypt import Bcrypt

app=Flask(__name__)
CORS(app)
bcrypt=Bcrypt(app)
app.config['SECRET_KEY']='87c725f6be51b16e19446e14b59149e7'
username = urllib.parse.quote_plus('shettyaadi9')
password = urllib.parse.quote_plus('aadi@2004')
app.config['MONGO_URI'] = f'mongodb+srv://{username}:{password}@cluster0.v2ff3xl.mongodb.net/Login_details?connectTimeoutMS=30000'
mongo = PyMongo(app)
fs = GridFS(mongo.db)
db = mongo.db.Login_details

@app.route('/', methods=['POST'])
def submit_form():
    data = request.json
    #print(data)
    result=data.get('msg')
    #print(result)
    db.insert_one({
        "username":result.get('username'),
        "password":bcrypt.generate_password_hash(result.get('password')).decode('utf-8'),
        "email":result.get('email')
    })
    return jsonify({"message": "Data inserted successfully"}),200


if(__name__=='__main__'):
    app.run(debug=True,port=5000)
