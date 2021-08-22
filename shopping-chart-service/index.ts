import AWS from 'aws-sdk';

import express from 'express';

import { pid } from 'process';

import { ChartsRouter } from './src/charts';
import { CheckoutRouter } from './src/checkout';

const app = express();
const PORT = process.env.PORT || 3001;

AWS.config.update({ region: process.env.AWS_REGION || 'us-east-2' });

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/state', (_, res) => {
  res.send(`This process is pid ${pid}`);
});

(new ChartsRouter(app));
(new CheckoutRouter(app));

app.listen(PORT, () => {
  console.log(`Shopping Chart Service is listening on port ${PORT}!`);
});
