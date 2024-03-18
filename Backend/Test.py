from flask import *
from SignUpForm import *
from cv2 import imshow,imwrite,VideoCapture,imread
from flask_pymongo import PyMongo
from gridfs import GridFS
from io import BytesIO
import cv2
import urllib.parse
#aaa
#aa
app=Flask(__name__)
app.config['SECRET_KEY']='87c725f6be51b16e19446e14b59149e7'
username = urllib.parse.quote_plus('shettyaadi9')
password = urllib.parse.quote_plus('aadi@2004')
app.config['MONGO_URI'] = f'mongodb+srv://{username}:{password}@cluster0.v2ff3xl.mongodb.net/Login_details?connectTimeoutMS=30000'

mongo = PyMongo(app)
fs = GridFS(mongo.db)
cam_port=0
cam=VideoCapture(cam_port)

db = mongo.db.Login_details
@app.route("/signup",methods=['GET','POST'])
def signIn():
    form=SignUpForm()
    if form.validate_on_submit():
        print("SUCCESS")
        db.insert_one({
            "username":form.Username.data,
            "password":form.ConfirmPassword.data,
        }) 
    else:
        print("NOOO")
    return render_template("Regirock.html",form=form)

@app.route("/login",methods=['POST','GET'])
def login():
    form=LoginForm()
    if form.validate_on_submit():
       
        print("YAY")
        return redirect(url_for('Validation'))
    else:
        print(":(")
    return render_template("Login.html",form=form)

@app.route("/validate",methods=['GET','POST'])
def Validation():
    result,image=cam.read()
    if result:
        cam.release()
        result,img_bytes = cv2.imencode('.jpg',image)
        
        if result:
            db.insert_one({ 
            "Profile_Pic":img_bytes.tobytes()})
            print("Image successfully inserted")
        return redirect(url_for('signIn'))
    else:
        cam.release()
        return "TERI MAA"
    return render_template("Validation.html")

@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    # Process form data
    print(data)
    return 'Form submitted successfully!'

def finder(str):
    result=db.find({"username":str})
    document=[doc for doc in result]
    return document
    
    

print(finder("seema1234"))
if(__name__=='__main__'):
    app.run(debug=True)