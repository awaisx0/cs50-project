from flask import Flask, g, request, jsonify
import sqlite3
from flask_cors import CORS

# chatgpt help
def get_db():
    if "db" not in g:
        g.db = sqlite3.connect("progress.db")
        g.db.row_factory = sqlite3.Row
    return g.db

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    """
    Docstring for index
    """
    return "hello world"


@app.route("/api/get-progress")
def get_progress():
    date = request.args.get("date")
    db = get_db()
    cursor = db.cursor()
    result = cursor.execute("SELECT * FROM work WHERE date_id = (SELECT id FROM dates WHERE date = ?)", (date,)).fetchall()
    return jsonify([dict(row) for row in result])




# chatgpt help
@app.teardown_appcontext
def close_db(exception):
    db = g.pop("db", None)
    if db is not None:
        db.close()
