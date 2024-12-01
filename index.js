const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const estudiantesModule = require('./estudiantes'); // Importar módulo de estudiantes

const app = express();
app.use(express.json());

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
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./index.js'], // Nombre correcto del archivo
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
 *         - matricula
 *         - semestreIngreso
 *         - creditosCursados
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del estudiante
 *         nombre:
 *           type: string
 *           description: Nombre completo del estudiante
 *         matricula:
 *           type: integer
 *           description: Matrícula del estudiante
 *         semestreIngreso:
 *           type: string
 *           description: Semestre de ingreso del estudiante
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
app.get('/estudiantes', (req, res) => {
  const estudiantes = estudiantesModule.findAll();
  res.json(estudiantes);
});

/**
 * @swagger
 * /estudiantes/{id}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
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
app.get('/estudiantes/:id', (req, res) => {
  const estudiante = estudiantesModule.findById(parseInt(req.params.id));
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
app.post('/estudiantes', (req, res) => {
  const nuevoEstudiante = req.body;
  const estudiante = estudiantesModule.add(nuevoEstudiante);
  res.status(201).json(estudiante);
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
 *           type: integer
 *         description: ID del estudiante
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
app.put('/estudiantes/:id', (req, res) => {
  const actualizado = estudiantesModule.save(parseInt(req.params.id), req.body);
  if (actualizado) {
    res.json(actualizado);
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
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       204:
 *         description: Estudiante eliminado
 *       404:
 *         description: Estudiante no encontrado
 */
/*app.delete('/estudiantes/:id', (req, res) => {
  const index = estudiantesModule.findById(parseInt(req.params.id));
  if (index) {
    estudiantesModule.estudiantes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Estudiante no encontrado');
  }
});*/

app.delete('/estudiantes/:id', (req,res) => {
  res.end('Borrando los datos del estudiante ' + req.params.id);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
  console.log('Documentación de Swagger en http://localhost:3000/api-docs');
});
