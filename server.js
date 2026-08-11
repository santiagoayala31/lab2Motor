const express = require("express");
const path = require("path");
const { getAllVideojuegos, getVideojuegoById } = require("./database/db");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.redirect("/juegos"));

app.get("/juegos", async (req, res) => {
  try {
    const videojuegos = await getAllVideojuegos();
    res.render("index", { videojuegos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al consultar la base de datos");
  }
});

app.get("/juegos/:id", async (req, res) => {
  try {
    const videojuego = await getVideojuegoById(req.params.id);
    if (!videojuego) return res.status(404).render("404");
    res.render("detalle", { videojuego });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al consultar la base de datos");
  }
});

app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
