const Database = require('better-sqlite3');
const db = new Database('markets.db');

// create table in markets database
db.prepare(`
    CREATE TABLE IF NOT EXISTS candles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        time INTEGER,
        open REAL,
        high REAL,
        low REAL,
        close REAL
    )
`).run();

module.exports = db;
