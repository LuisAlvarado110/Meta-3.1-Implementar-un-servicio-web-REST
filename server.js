const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

let estudiantes = [];

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Estudiantes',
      version: '1.0.0',
      description: 'API para la gestión de estudiantes',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./index.js'], // Archivo donde están documentados los endpoints
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - semestreIngreso
 *         - creditosCursados
 *       properties:
 *         id:
 *           type: string
 *           description: Matrícula del estudiante
 *         nombre:
 *           type: string
 *           description: Nombre completo del estudiante
 *         semestreIngreso:
 *           type: integer
 *           description: Año del semestre de ingreso
 *         creditosCursados:
 *           type: integer
 *           description: Créditos cursados por el estudiante
 */

/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudiante'
 */
app.get('/estudiante', (req, res) => {
  res.json(estudiantes);
});

/**
 * @swagger
 * /estudiantes/{id}:
 *   get:
 *     summary: Obtener un estudiante por matrícula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Matrícula del estudiante
 *     responses:
 *       200:
 *         description: Datos del estudiante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       404:
 *         description: Estudiante no encontrado
 */
app.get('/estudiante/:id', (req, res) => {
  const estudiante = estudiantes.find(e => e.id === req.params.id);
  if (estudiante) {
    res.json(estudiante);
  } else {
    res.status(404).send('Estudiante no encontrado');
  }
});

/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       201:
 *         description: Estudiante creado
 */
app.post('/estudiante', (req, res) => {
  const nuevoEstudiante = req.body;
  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});

/**
 * @swagger
 * /estudiantes/{id}:
 *   put:
 *     summary: Actualizar datos de un estudiante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Matrícula del estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       200:
 *         description: Estudiante actualizado
 *       404:
 *         description: Estudiante no encontrado
 */
app.put('/estudiante/:id', (req, res) => {
  const index = estudiantes.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    estudiantes[index] = req.body;
    res.json(estudiantes[index]);
  } else {
    res.status(404).send('Estudiante no encontrado');
  }
});

/**
 * @swagger
 * /estudiantes/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Matrícula del estudiante
 *     responses:
 *       204:
 *         description: Estudiante eliminado
 *       404:
 *         description: Estudiante no encontrado
 */
app.delete('/estudiante/:id', (req, res) => {
  const index = estudiantes.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    estudiantes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Estudiante no encontrado');
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
