const express = require("express");
const {
  agregarUsuario,
  obtenerUsuario,
  usuariosMayores,
  usuariosPais,
  modificarUsuario,
  eliminarUsuario,
} = require("./consultas");
const app = express();

app.use(express.json());

app.listen(3002, () => console.log("Servidor levantado en el puerto 3002"));

app.get("/usuarios", async (req, res) => {
  const usuarios = await obtenerUsuario(req.query);
  res.json(usuarios);
});

app.post("/usuarios", async (req, res) => {
  const { nombre, apellido, edad, pais } = req.body;
  await agregarUsuario(nombre, apellido, edad, pais);
  res.send("Usuario agregado con éxito!!!");
});

app.get("/usuarios/mayores", async (req, res) => {
  const usuarios = await usuariosMayores();
  res.json(usuarios);
});

app.get("/usuarios/:pais", async (req, res) => {
  const { pais } = req.params;
  const usuarios = await usuariosPais(pais);
  res.json(usuarios);
});

app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.query;
  await modificarUsuario(nombre, id);
  res.send("Usuario modificado con exito!!");
});

app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  await eliminarUsuario(id);
  res.send("Usuario eliminado con exito!!");
});
