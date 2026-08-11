# Catálogo de Videojuegos - Laboratorio

Proyecto realizado con Node.js, Express y EJS.

## Ejecutar

```bash
npm install
npm start
```

Abrir: http://localhost:3000/juegos

## Rutas

- `/juegos` - listado
- `/juegos/1` - detalle dinámico
- `/juegos/2` - detalle dinámico
- `/juegos/3` - detalle dinámico
- `/juegos/4` - detalle dinámico

## Requisitos cubiertos

- Colección de 4 elementos.
- Identificador único.
- Campo anidado: desarrollador.
- Campo numérico: existencias.
- Header y footer reutilizables con EJS partials.
- Listado generado con `forEach`.
- Ruta dinámica `/juegos/:id`.
- Condicional EJS para Disponible/Agotado.
- HTML5 semántico.
- Flexbox en el catálogo y detalle.
