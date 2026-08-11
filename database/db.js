const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "catalogo.sqlite"));

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");

  db.run(`CREATE TABLE IF NOT EXISTS desarrolladores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    pais TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS videojuegos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    genero TEXT NOT NULL,
    precio REAL NOT NULL,
    existencias INTEGER NOT NULL,
    imagen TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    desarrollador_id INTEGER NOT NULL,
    FOREIGN KEY (desarrollador_id) REFERENCES desarrolladores(id)
  )`);

  db.get("SELECT COUNT(*) AS total FROM desarrolladores", (err, row) => {
    if (err) throw err;
    if (row.total === 0) {
      const stmt = db.prepare("INSERT INTO desarrolladores (nombre, pais) VALUES (?, ?)");
      [
        ["Nintendo", "Japón"],
        ["EA Sports", "Estados Unidos"],
        ["Mojang Studios", "Suecia"],
        ["Playground Games", "Reino Unido"]
      ].forEach(d => stmt.run(d[0], d[1]));
      stmt.finalize();
    }
  });

  db.get("SELECT COUNT(*) AS total FROM videojuegos", (err, row) => {
    if (err) throw err;
    if (row.total === 0) {
      const stmt = db.prepare(`INSERT INTO videojuegos
        (nombre, genero, precio, existencias, imagen, descripcion, desarrollador_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`);

      const juegos = [
        ["The Legend of Zelda: Tears of the Kingdom","Aventura",249900,8,"https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80","Una aventura de mundo abierto llena de exploración, desafíos y misterios.",1],
        ["EA Sports FC 26","Deportes",299900,0,"https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=900&q=80","Disfruta del fútbol con equipos, competiciones y modos de juego actualizados.",2],
        ["Minecraft","Supervivencia",119900,15,"https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=900&q=80","Construye, explora y sobrevive en un mundo generado con bloques.",3],
        ["Forza Horizon 5","Carreras",219900,3,"https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80","Recorre paisajes increíbles mientras compites con una gran variedad de vehículos.",4]
      ];
      juegos.forEach(j => stmt.run(...j));
      stmt.finalize();
    }
  });
});

function getAllVideojuegos() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT v.*, d.nombre AS desarrollador_nombre, d.pais AS desarrollador_pais
            FROM videojuegos v
            INNER JOIN desarrolladores d ON v.desarrollador_id = d.id
            ORDER BY v.id`, [], (err, rows) => err ? reject(err) : resolve(rows));
  });
}

function getVideojuegoById(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT v.*, d.nombre AS desarrollador_nombre, d.pais AS desarrollador_pais
            FROM videojuegos v
            INNER JOIN desarrolladores d ON v.desarrollador_id = d.id
            WHERE v.id = ?`, [id], (err, row) => err ? reject(err) : resolve(row));
  });
}

module.exports = { getAllVideojuegos, getVideojuegoById };
