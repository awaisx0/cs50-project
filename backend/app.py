from flask import Flask, g, request, jsonify
import sqlite3
from flask_cors import CORS
import datetime

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
    """
    get-progress route
    """ 
    # get date
    date = request.args.get("date", "")
    if not date:
        return jsonify([])
    
    # handle date validation 
    try:
        dateObj = datetime.datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        return jsonify([])
    
    db = get_db()
    cursor = db.cursor()
    # get work_fields
    result = cursor.execute("SELECT * FROM work WHERE date_id = (SELECT id FROM dates WHERE date = ?)", (date,)).fetchall()
    work_fields = [dict(row) for row in result]
    # get day_text
    result = cursor.execute("SELECT * FROM day_text WHERE date_id = (SELECT id FROM dates WHERE date = ?)", (date,)).fetchone()
    if result is not None:
        day_text = dict(result)
        day_text = day_text["raw_text"]
    else:
        day_text = ""

    # return both as json
    return jsonify({
        "work_fields": work_fields,
        "day_text": day_text
    })


@app.route("/api/save-progress", methods=["POST"])
def save_progress():
    request_body = request.get_json()
    date = request_body.get("date")
    work_fields = request_body.get("work_fields")
    day_text = request_body.get("day_text", "")
    db = get_db()
    cursor = db.cursor()
    # find date_id
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
            cursor.execute("INSERT INTO work (date_id, hours, mins, category, work_text) VALUES(?, ?, ?, ?, ?)", (date_id, field.get("hours"), field.get("mins"), field.get("category"), field.get("work_text")))
            db.commit()
        
        # insert day_text
        cursor.execute("INSERT INTO day_text (date_id, raw_text) VALUES(?, ?)", (date_id, day_text))
        db.commit()
        return "success"
    else:
        date_id = dict(date_id).get("id")
        # deleting previous which have same date_id
        cursor.execute("DELETE FROM work WHERE date_id = ?", (date_id, ))
        db.commit()
        cursor.execute("DELETE FROM day_text WHERE date_id = ?", (date_id, ))
        db.commit()

        # inserting updated content
        for field in work_fields:
            cursor.execute("INSERT INTO work (date_id, hours, mins, category, work_text) VALUES(?, ?, ?, ?, ?)", (date_id, field.get("hours"), field.get("mins"), field.get("category"), field.get("work_text")))
            db.commit()
        
        # insert day_text
        cursor.execute("INSERT INTO day_text (date_id, raw_text) VALUES(?, ?)", (date_id, day_text))
        db.commit()



    return "success 2"


@app.route("/api/get-month-progress")
def get_month_progress():
    month = request.args.get("month")
    year = request.args.get("year")
    db = get_db()
    cursor = db.cursor()
    # get month progress fields
    month_progress = cursor.execute("SELECT * FROM work JOIN dates ON work.date_id  = dates.id WHERE date_id IN (SELECT id FROM dates WHERE date LIKE ?) ORDER BY date", (f"{year}-{month}-%",))
    return jsonify([dict(row) for row in month_progress])


@app.route("/api/get-categories")
def get_categories():
    db = get_db()
    cursor = db.cursor()
    rows = cursor.execute("SELECT * FROM categories")
    categories = [dict(row) for row in rows]
    # making list of values out of a list of dicts
    categories_list = list(map(lambda x: x["category"], categories))
    return jsonify(categories_list)



    




# chatgpt help
@app.teardown_appcontext
def close_db(exception):
    db = g.pop("db", None)
    if db is not None:
        db.close()

