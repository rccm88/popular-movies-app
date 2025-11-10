import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Get the database path
const dbPath = path.join(process.cwd(), "data", "favorites.db");

// Ensure the data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database connection
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) {
    return db;
  }

  db = new Database(dbPath);

  // Create favorites table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movie_id INTEGER UNIQUE NOT NULL,
      title TEXT NOT NULL,
      poster_path TEXT,
      release_date TEXT,
      vote_average REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

// Close database connection (useful for cleanup)
export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}
