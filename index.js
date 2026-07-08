const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config();
const app = express();

const sendEmail = async (nombre, correo, telefono, observaciones, servicio) => {
  const configMail = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
  };

  const transport = nodemailer.createTransport(configMail);

  const mensaje = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_TO,
    subject: `Nuevo cliente interesado: ${nombre}`,
    text: `
       Nuevo cliente\n\n

        ${nombre} está interesado en nuestros servicios de [tipo de servicio requerido]. Nos han solicitado [breve descripción de la solicitud]
  
        <strong>Nombre: ${nombre}\n
        <strong>Correo: ${correo}\n
        <strong>Telefono: ${telefono}\n
        Mensaje: ${observaciones}\n
     `,
    html: `
    <html>
      <h1 style="color: #007327;">Nuevo cliente</h1>
      <p>
        ${nombre} está interesado en nuestros servicios de 
        ${servicio}. Nos han solicitado 
        ${observaciones}
      </p>
      <p>
        <strong>Nombre:</strong> ${nombre}<br />
        <strong>Correo:</strong> ${correo}<br />
        <strong>Telefono:</strong> ${telefono}<br />
        <strong>Mensaje:</strong> ${observaciones}<br />
      </p>
    </html>`,
  };

  const info = await transport.sendMail(mensaje);
  console.log(info);
};

const corsOptions = {
  origin: ["https://bcssascol.com",
    "https://www.bcssascol.com/"],
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
        `INSERT INTO contactos(nombre, apellido, email, telefono, tipo_establecimiento, tipo_servicio, mensaje,fecha) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          nombre,
          apellido,
          correo,
          telefono,
          tipo_establecimiento,
          tipo_servicio,
          mensaje,
          new Date(),
        ]
      );

      await sendEmail(
        `${nombre} ${apellido}`,
        correo,
        telefono,
        mensaje,
        tipo_servicio
      );

      res.status(200).json({ data: "guardado correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:"Error interno"
      });
    }
  };

  saveInfoClient();
});

app.listen(PORT, () => {
  console.log("puerto escuchando en puerto 5000");
});
