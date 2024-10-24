const { Pool } = require("pg");
const format = require("pg-format");

/* En la terminal
CREATE DATABASE gestion_de_usuarios;
\c gestion_de_usuarios;
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INT NOT NULL,
    pais VARCHAR(50) NOT NULL);
*/

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "mo76492250",
  database: "gestion_de_usuarios",
  allowExitOnIdle: true,
});

const agregarUsuario = async (nombre, apellido, edad, pais) => {
  const consulta =
    "INSERT INTO usuarios (nombre, apellido, edad, pais) VALUES ($1, $2, $3, $4)";

  const values = [nombre, apellido, edad, pais];
  const result = await pool.query(consulta, values);

  console.log("Usuario agregado", result.rowCount);
};

const obtenerUsuario = async ({ limit = 5, order_by = "id_ASC" }) => {
  //const consulta = "SELECT * FROM usuarios LIMIT $1;";
  const [nombre, orden] = order_by.split("_");

  const formattedQuery = format(
    "SELECT * FROM usuarios ORDER BY %s %s LIMIT %s",
    nombre,
    orden,
    limit
  );

  const { rows: clientes } = await pool.query(formattedQuery);
  console.log(orden);
  //console.log(clientes);
  return clientes;
};

const usuariosMayores = async () => {
  const result = await pool.query("SELECT * FROM usuarios WHERE edad >= 18");

  console.log(result.rows);
  return result.rows;
};

const usuariosPais = async (pais) => {
  const consulta = "SELECT * FROM usuarios WHERE pais = $1";

  const values = [pais];

  const result = await pool.query(consulta, values);
  console.log(result.rows);
  console.log(values);
  return result.rows;
};

const modificarUsuario = async (nombre, id) => {
  const consulta = "UPDATE usuarios SET nombre = $1 WHERE id = $2 RETURNING *";
  const values = [nombre, id];

  const result = await pool.query(consulta, values);

  return result.rows;
};

const eliminarUsuario = async (id) => {
  const consulta = "DELETE FROM usuarios WHERE id = $1";
  const values = [id];

  await pool.query(consulta, values);
};

module.exports = {
  agregarUsuario,
  obtenerUsuario,
  usuariosMayores,
  usuariosPais,
  modificarUsuario,
  eliminarUsuario,
};
