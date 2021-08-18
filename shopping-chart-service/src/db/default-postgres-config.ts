import { ClientConfig } from 'pg';

export const DefaultPostgressConfig: ClientConfig = {
  user: 'postgres',
  host: 'localhost',
  password: 'docker',
  port: 5432,
};
