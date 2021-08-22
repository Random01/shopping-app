import { Client, QueryConfig, QueryResult } from 'pg';

import { DefaultPostgressConfig } from './default-postgres-config';

export class DbAccessService {

  constructor(protected readonly config = DefaultPostgressConfig) { }

  protected async getConnection(): Promise<Client> {
    const client = new Client(this.config);
    await client.connect();
    return client;
  }

  protected async runQuery<T = any>(query: string | QueryConfig): Promise<QueryResult<T>> {
    const client = await this.getConnection()
    const res = await client.query(query);
    await client.end();
    return res;
  }

}
