const bodyParser = require('body-parser');
const express = require('express');
const tasksRoute = require('./Routes/TasksRoute');
const http=require('http');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Helfy',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./Routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

let app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({ limit: '1000mb' }));
app.use(express.static('public'));
app.use('/api/tasks', tasksRoute);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const server=http.createServer(app);

server.listen(4000);
