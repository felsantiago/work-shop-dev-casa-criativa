import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();

const db = new sqlite.Database('./workshopdev.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `);

  // db.run(`DELETE FROM ideas WHERE id = ?`, 9, (err) => {
  //   if (err) return false;
  //   return true;
  // });
});

export default db;
