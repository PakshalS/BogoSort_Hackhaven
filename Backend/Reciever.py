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



def finder(str):
    result=db.find({"email":str})
    document=[doc for doc in result]
    print(document[1])
    return document

@app.route('/', methods=['POST','GET'])
def submit_form():
    data = request.json
    #print(data)
    result=data.get('msg')
    #print(result)
    if result.get('username')!="":
        db.insert_one({
            "username":result.get('username'),
            "password":bcrypt.generate_password_hash(result.get('password')).decode('utf-8'),
            "email":result.get('email')
        })
        db.create_index([("username", 1)], unique=True)
        return jsonify({"redirect_url": "http://localhost:3000"}), 200
    else:
        user=result.get('email')
        print("YAY")
        doc=finder(user)
        if bcrypt.check_password_hash(doc[0].get('password'), result.get('password')):
            print("CORRECT PASSWORD")
            return jsonify({"redirect_url": "http://localhost:3000/dashboard"}), 200

        else:
            print("WRONG PASSWORD")
            return jsonify({"redirect_url": "http://localhost:3000"}), 400




if(__name__=='__main__'):
    app.run(debug=True,port=5000)