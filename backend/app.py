from flask import Flask, g, request, jsonify
import sqlite3
from flask_cors import CORS

# chatgpt help
def get_db():
    if "db" not in g:
        g.db = sqlite3.connect("progress.db")
        g.db.row_factory = sqlite3.Row
    return g.db

def list_dict_null_check(list_dicts):
    for dic in list_dicts:
        if dic:
            return True
    return False

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

@app.route("/api/save-progress", methods=["POST"])
def save_progress():
    date = request.get_json().get("date")
    work_fields = request.get_json().get("work_fields")
    day_text = request.get_json().get("day_text", "j")
    db = get_db()
    cursor = db.cursor()
    date_id = (cursor.execute("SELECT id FROM dates WHERE date = ?", (date, )).fetchone())

    # for creating new date
    if not date_id:
        # insert date
        cursor.execute("INSERT INTO dates (date) VALUES(?)", (date,))
        db.commit()
        date_id_row = dict(cursor.execute("SELECT id FROM dates WHERE date = ?", (date,)).fetchone())
        date_id = date_id_row.get("id")

        # insert work fields
        for field in work_fields:
            cursor.execute("INSERT INTO work (date_id, hours, mins, category, work_text) VALUES(?, ?, ?, ?, ?)", (date_id, field.get("hours"), field.get("mins"), field.get("category"), field.get("text")))
            db.commit()
        
        # insert day_text
        cursor.execute("INSERT INTO day_text (date_id, raw_text) VALUES(?, ?)", (date_id, day_text))
        db.commit()
        return "success"
    return "success 2"

        


    




# chatgpt help
@app.teardown_appcontext
def close_db(exception):
    db = g.pop("db", None)
    if db is not None:
        db.close()

