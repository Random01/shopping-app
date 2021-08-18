import AWS from 'aws-sdk';

import express from 'express';

import { pid } from 'process';

import { ShoppingChartService } from './src/shopping';
import { CheckoutService } from './src/checkout';

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

const checkoutService = new CheckoutService();
app.get('/test-checkout', (_, res) => {
  checkoutService.runCheckout().then(() => {
    res.status(200).send('Ok');
  }, err => {
    res.status(500).send(err.message);
  });
});

const shoppingChartService = new ShoppingChartService();
app.get('/test-chart', (_, res) => {
  shoppingChartService.getChartById('1111-2222').then(result => {
    res.status(200).send(result);
  }, err => {
    res.status(500).send(err.message);
  });
});

app.listen(PORT, () => {
  console.log(`Shopping Chart Service is listening on port ${PORT}!`);
});
