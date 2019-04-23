

CREATE TABLE IF NOT EXISTS tracker (
    id SERIAL PRIMARY KEY,
    datecreated DATE NOT NULL DEFAULT CURRENT_DATE,
    salary INTEGER,
    rent_rec INTEGER,
    misc_income INTEGER,
    rent_pay INTEGER,
    tax INTEGER,
    utilities INTEGER,
    dining INTEGER,
    Grocery INTEGER,
    travel INTEGER,
    shopping INTEGER,
    misc_exp INTEGER,
    invest INTEGER,
    user_id INTEGER REFERENCES users (id)

);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);



CREATE VIEW total_exp AS SELECT SUM(salary) FROM tracker GROUP BY user_id