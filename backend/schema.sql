-- created seperate schema file on chatgpt suggestion
CREATE TABLE IF NOT EXISTS dates (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS work (
    date_id INTEGER NOT NULL,
    hours INTEGER NOT NULL,
    mins INTEGER, 
    category TEXT,
    work_text TEXT,
    FOREIGN KEY (date_id) REFERENCES dates(id)
);

CREATE TABLE IF NOT EXISTS day_text (
    date_id INTEGER NOT NULL,
    raw_text TEXT, 
    FOREIGN KEY (date_id) REFERENCES dates(id)
);


CREATE TABLE IF NOT EXISTS categories (
    category TEXT PRIMARY KEY
);

