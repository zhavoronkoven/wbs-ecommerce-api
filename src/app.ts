import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import routes from './routes/index.ts';
import { connect } from './db/index.ts';
import { errors } from './middleware/errors.ts';

import openapiDocument from '../docs/openapi.json' with { type: 'json' };

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
app.use('/api', routes);

app.use((_req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use(errors);

await connect();

app.listen(port);

console.log('E-Commerce API started on port', port);
console.log('SwaggerUI API documentation is available at /api-docs');

export default app;
