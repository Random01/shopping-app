import { Client, ClientConfig, QueryConfig, QueryResult } from 'pg';

import { SecretManagerService } from './secret-manager.service';

export class DbAccessService {

  private configPromise: Promise<ClientConfig>;

  constructor(
    protected readonly secretManager = new SecretManagerService(),
  ) { }

  protected async getConnection(): Promise<Client> {
    const config = await this.getConnectionConfig();
    const client = new Client(config);
    await client.connect();
    return client;
  }

  protected async runQuery<T = any>(query: string | QueryConfig): Promise<QueryResult<T>> {
    const client = await this.getConnection()
    const res = await client.query(query);
    await client.end();
    return res;
  }

  private getConnectionConfig() {
    return this.configPromise || (this.configPromise = this.secretManager.getConfig());
  }

}
