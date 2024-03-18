from flask import *
from SignUpForm import *

app=Flask(__name__)
app.config['SECRET_KEY']='87c725f6be51b16e19446e14b59149e7'

@app.route("/",methods=['GET','POST'])
def signIn():
    form=SignUpForm()
    if form.validate_on_submit():
        print("SUCCESS")
    else:
        print("NOOO")
    return render_template("Regirock.html",form=form)

if(__name__=='__main__'):
    app.run(debug=True)