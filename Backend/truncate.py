from flask import *
from flask_pymongo import PyMongo
import urllib.parse

app=Flask(__name__)
username = urllib.parse.quote_plus('shettyaadi9')
password = urllib.parse.quote_plus('aadi@2004')
app.config['MONGO_URI'] = f'mongodb+srv://{username}:{password}@cluster0.v2ff3xl.mongodb.net/Login_details?connectTimeoutMS=30000'

mongo = PyMongo(app)

db = mongo.db.Login_details
db.delete_many({})

