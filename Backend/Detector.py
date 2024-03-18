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
import requests
import json

app=Flask(__name__)
app.config['SECRET_KEY']='87c725f6be51b16e19446e14b59149e7'

params = {
  'models': 'nudity-2.0,wad,offensive',
  'api_user': '492589490',
  'api_secret': 'amKiry7wLtbAcv8x6hoFPuiURqbKoWP4'
}


@app.route('/', methods=['POST'])
def submit_form():
    data = request.json
    result=data.get('msg')
    #print(result)
    files = {'media': open('yohn.jpg', 'rb')}
    r = requests.post('https://api.sightengine.com/1.0/check.json', files=files, data=params)
    if(op.get("weapon")>0.5 or op.get("nudity").get("suggestive")>0.5 or op.get("nudity").get("sexual_activity")>0.5 or op.get("alcohol")>0.5 or op.get("offensive").get("middle_finger")>0.5):
        print("FLAG")


if(__name__=='__main__'):
    app.run(debug=True,port=5025)