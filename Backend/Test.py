from flask import *
from SignUpForm import *
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
from gridfs import GridFS

app = Flask(__name__)
app.config["SECRET_KEY"] = "87c725f6be51b16e19446e14b59149e7"
app.config["MONGO_URI"] = "mongodb://localhost:27017/video_conf"
mongo = PyMongo(app)
fs = GridFS(mongo.db)


@app.route("/", methods=["GET", "POST"])
def signIn():
    form = SignUpForm()
    if form.validate_on_submit():
        if form.ProfilePicture.data:
            profile_pic = form.ProfilePicture.data
            filename = secure_filename(profile_pic.filename)
            file_id = fs.put(profile_pic, filename=filename)
        else:
            None

        db = mongo.db.Login_details
        db.insert_one(
            {
                "username": form.Username.data,
                "password": form.ConfirmPassword.data,
                "profilePic": file_id if form.ProfilePicture.data else None,
            }
        )
        print("SUCCESS")
    else:
        print("NOOO")
    return render_template("Regirock.html", form=form)


if __name__ == "__main__":
    app.run(debug=True)
