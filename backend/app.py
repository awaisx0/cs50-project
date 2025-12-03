from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    """
    Docstring for index
    """
    return "hello world"