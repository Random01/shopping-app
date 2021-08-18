import AWS from 'aws-sdk';

import express from 'express';

import { CheckoutService, ExternalCheckoutService } from './src';

import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3002;
const appUuid = uuidv4();

AWS.config.update({ region: 'us-east-2' });

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

const externalCheckoutService = new ExternalCheckoutService();
app.get('/test-external-checkout', (_, res) => {
  externalCheckoutService.runExternalCheckout(uuidv4())
    .then(
      data => res.status(200).send(data),
      err => res.status(500).send({ message: err.message }),
    );
});

const checkoutService = new CheckoutService();
checkoutService.start();

app.listen(PORT, () => {
  console.log(`Checkout Service is listening on port ${PORT}!`);
});
