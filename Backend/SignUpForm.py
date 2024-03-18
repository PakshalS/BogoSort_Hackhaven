from wtforms import *
from wtforms.validators import *
from flask_wtf import *
from flask_wtf.file import *

class SignUpForm(FlaskForm):
    Username=StringField('Username',validators=[DataRequired(),length(min=5,max=20)])
    Password=PasswordField('Password',validators=[DataRequired(),length(min=5,max=20)])
    ConfirmPassword=PasswordField('Confirm Password',validators=[DataRequired(),length(min=5,max=20),EqualTo('Password')])
    ProfilePicture=FileField('Profile Picture',validators=[DataRequired(),FileAllowed(['png','jpg'],'Please Upload a .jpg or a .png file')])
    submit=SubmitField('Sign Up')

class LoginForm(FlaskForm):
    Username=StringField('Username',validators=[DataRequired(),length(min=5,max=20)])
    Password=PasswordField('Password',validators=[DataRequired(),length(min=5,max=20)])
    submit=SubmitField('Log In')