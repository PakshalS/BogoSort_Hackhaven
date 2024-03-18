from flask import *
from SignUpForm import *
from cv2 import imshow,imwrite,VideoCapture,imread

app=Flask(__name__)
app.config['SECRET_KEY']='87c725f6be51b16e19446e14b59149e7'

cam_port=0
cam=VideoCapture(cam_port)

@app.route("/signup",methods=['GET','POST'])
def signIn():
    form=SignUpForm()
    if form.validate_on_submit():
        print("SUCCESS")
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




if(__name__=='__main__'):
    app.run(debug=True)