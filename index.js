const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: "https://www.tmesoluciones.co", // Cambia esto al origen de tu aplicación cliente
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permite el envío de cookies y encabezados de autenticación
  optionsSuccessStatus: 204, // Devuelve un código de estado 204 si la opción Preflight es exitosa
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/prueba", (req, res) => {
  res.json({ data: "api funciona correctamente" });
});

app.post("/saveInfoClient", (req, res) => {
  const {
    nombre,
    apellido,
    correo,
    telefono,
    tipo_establecimiento,
    tipo_servicio,
    mensaje,
  } = req.body;

  const saveInfoClient = async () => {
    try {
      const { pool } = require("./db");

      await pool.query(
        `INSERT INTO contactos (nombre, apellido, email, telefono, tipo_establecimiento, tipo_servicio, mensaje) 
        VALUES($1,$2,$3,$4,$5,$6,$7)`,
        [
          nombre,
          apellido,
          correo,
          telefono,
          tipo_establecimiento,
          tipo_servicio,
          mensaje,
        ]
      );

      res.status(200).json({ data: "guardado correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  saveInfoClient();
});

app.listen(PORT, () => {
  console.log("puerto escuchando en puerto 5000");
});
