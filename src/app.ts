import express from 'express';
import routes from './routes/index.ts';

import { connect } from './db/index.ts';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);
// app.use(errorHandler);

await connect();

app.listen(port);

console.log('E-Commerce API started on port', port);

export default app;
