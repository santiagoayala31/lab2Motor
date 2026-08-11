# Catálogo de Videojuegos - Node.js + Express + EJS + SQLite

Base de datos relacional SQLite usando el driver sqlite3.

Tablas: desarrolladores y videojuegos.
Foreign key: videojuegos.desarrollador_id -> desarrolladores.id.
Los datos se consultan mediante INNER JOIN y se muestran con EJS.

Ejecutar:
npm install
npm start

URL: http://localhost:3000/juegos
