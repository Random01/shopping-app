import AWS from 'aws-sdk';

import express from 'express';

import { v4 as uuidv4 } from 'uuid';

import { ChartsRouter } from './src/charts';
import { CheckoutRouter, CheckoutService } from './src/checkout';

const app = express();
const PORT = process.env.PORT || 3001;
const appUuid = uuidv4();

AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-2',
  logger: console,
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/state', (_, res) => {
  res.send({ appUuid });
});

(new ChartsRouter(app));
(new CheckoutRouter(app));

(new CheckoutService()).start();

app.listen(PORT, () => {
  console.log(`Shopping Chart Service is listening on port ${PORT}!`);
});
