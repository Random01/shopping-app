const { Client } = require('pg');

const query = `
DROP TABLE IF EXISTS chart_positions;
DROP TABLE IF EXISTS charts;
DROP TABLE IF EXISTS products;

CREATE TABLE charts (
  chart_id  uuid PRIMARY KEY
);

CREATE TABLE products (
  product_id  uuid PRIMARY KEY,
  title       text NOT NULL,
  description text NOT NULL,
  price       numeric
);

CREATE TABLE chart_positions (
  chart_id    uuid REFERENCES charts,
  product_id  uuid REFERENCES products,
  quantity    numeric NOT NULL,
  PRIMARY KEY (chart_id, product_id)
);

INSERT INTO charts (chart_id)
  VALUES ('ee5abb10-1f87-4c74-8834-f6491d63c651');
INSERT INTO charts (chart_id)
  VALUES ('5defe7a6-2ea8-4e40-bc87-7bd19921bd9d');

INSERT INTO products (product_id, title, description, price)
  VALUES ('95e5cc8f-a3b0-4930-abbe-3709652c2a78', 'Product 1', '', 1000);
INSERT INTO products (product_id, title, description, price)
  VALUES ('0266af26-cdcf-4284-9da6-c1cb99d4aa7f', 'Product 2', '', 2000);
INSERT INTO products (product_id, title, description, price)
  VALUES ('6ee561b7-044e-4dd2-b8d4-db3097c54d10', 'Product 3', '', 3000);

INSERT INTO chart_positions (chart_id, product_id, quantity)
  VALUES ('ee5abb10-1f87-4c74-8834-f6491d63c651', '95e5cc8f-a3b0-4930-abbe-3709652c2a78', 1);
INSERT INTO chart_positions (chart_id, product_id, quantity)
  VALUES ('ee5abb10-1f87-4c74-8834-f6491d63c651', '0266af26-cdcf-4284-9da6-c1cb99d4aa7f', 1);
INSERT INTO chart_positions (chart_id, product_id, quantity)
  VALUES ('ee5abb10-1f87-4c74-8834-f6491d63c651', '6ee561b7-044e-4dd2-b8d4-db3097c54d10', 1);
`;

const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'docker',
  port: 5432,
};

const client = new Client(config);
client.connect()
  .then(() => client.query(query))
  .then(()=>console.log('DB has been successfully created!'))
  .finally(() => client.end()); 