const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const videojuegos = [
  {
    id: 1,
    nombre: "The Legend of Zelda: Tears of the Kingdom",
    genero: "Aventura",
    precio: 249900,
    existencias: 8,
    imagen: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80",
    desarrollador: {
      nombre: "Nintendo",
      pais: "Japón"
    },
    descripcion: "Una aventura de mundo abierto llena de exploración, desafíos y misterios."
  },
  {
    id: 2,
    nombre: "EA Sports FC 26",
    genero: "Deportes",
    precio: 299900,
    existencias: 0,
    imagen: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=900&q=80",
    desarrollador: {
      nombre: "EA Sports",
      pais: "Estados Unidos"
    },
    descripcion: "Disfruta del fútbol con equipos, competiciones y modos de juego actualizados."
  },
  {
    id: 3,
    nombre: "Minecraft",
    genero: "Supervivencia",
    precio: 119900,
    existencias: 15,
    imagen: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=900&q=80",
    desarrollador: {
      nombre: "Mojang Studios",
      pais: "Suecia"
    },
    descripcion: "Construye, explora y sobrevive en un mundo generado con bloques."
  },
  {
    id: 4,
    nombre: "Forza Horizon 5",
    genero: "Carreras",
    precio: 219900,
    existencias: 3,
    imagen: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
    desarrollador: {
      nombre: "Playground Games",
      pais: "Reino Unido"
    },
    descripcion: "Recorre paisajes increíbles mientras compites con una gran variedad de vehículos."
  }
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/juegos");
});

app.get("/juegos", (req, res) => {
  res.render("index", { videojuegos });
});

app.get("/juegos/:id", (req, res) => {
  const id = Number(req.params.id);
  const videojuego = videojuegos.find((juego) => juego.id === id);

  if (!videojuego) {
    return res.status(404).render("404");
  }

  res.render("detalle", { videojuego });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});