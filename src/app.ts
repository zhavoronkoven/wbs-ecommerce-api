import express from 'express';
import routes from './routes/index.ts';

import { connect } from './db/index.ts';

const app = express();

app.use(express.json());
app.use('/api', routes);
// app.use(errorHandler);

await connect();

app.listen(process.env.PORT || 3000);

console.log('E-Commerce API started on port', process.env.PORT);

export default app;
