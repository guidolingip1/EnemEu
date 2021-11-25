import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 8000;

import dataRoutes from './routes/data.js';

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use('/data', dataRoutes);


//Retorna a data
app.get('/', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {console.log(`Example app listening at http://localhost:${PORT}`)})