import express from 'express';

import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3002;
const appUuid = uuidv4();

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

app.listen(PORT, () => {
  console.log(`Checkout Service is listening on port ${PORT}!`);
});
