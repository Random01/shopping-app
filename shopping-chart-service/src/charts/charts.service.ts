import { v4 as uuidv4 } from 'uuid';

import { DbAccessService } from '../db';

import { Chart } from '../models';

/**
 * https://www.w3schools.com/sql/sql_where.asp
 * https://node-postgres.com/features/queries
 */
/**
 * A shopping cart service is created that uses RDS DB (PostgreSQL):
 * - Should service getCartByID (containing all products in a cart). 
 * - If no cart – create a new one and store in DB. 
 * - Delete cart by ID. 
 * - Put a product to a cart.
 */
export class ChartsService extends DbAccessService {

  public async getChartById(id: string): Promise<Chart> {
    const query = {
      text: 'SELECT chart_id, processed FROM charts WHERE chart_id=$1',
      values: [id],
    };

    const { rows } = await this.runQuery(query);
    return {
      id: rows[0].chart_id,
      processed: rows[0].processed,
      positions: [],
    };
  }

  public async getChartPositions(id: string) {
    const query = {
      text: 'SELECT chart_id, product_id, quantity FROM chart_positions WHERE chart_id=$1',
      values: [id],
    };

    const { rows } = await this.runQuery(query);
    return rows;
  }

  public async deleteChartById(id: string): Promise<void> {
    await this.runQuery({
      text: 'DELETE FROM chart_positions WHERE chart_id=$1',
      values: [id],
    });
    await this.runQuery({
      text: 'DELETE FROM charts WHERE chart_id=$1',
      values: [id],
    });
  }

  public async putProduct(chartId: string, productId: string, quantity = 0): Promise<void> {
    if (!chartId) {
      throw new Error('chartId should be provided');
    }
    if (!productId) {
      throw new Error('product should be provided');
    }

    const query = {
      text: 'INSERT INTO chart_positions (chart_id, product_id, quantity) VALUES ($1, $2, $3)',
      values: [chartId, productId, quantity],
    };

    await this.runQuery(query);
  }

  public async getAllCharts(): Promise<Chart[]> {
    const { rows } = await this.runQuery('SELECT chart_id, processed FROM charts');
    return (rows || []).map(row => ({
      id: row.chart_id,
      processed: row.processed,
      positions: [],
    }));
  }

  public async addChart(): Promise<string> {
    const id = uuidv4();
    const query = {
      text: 'INSERT INTO charts (chart_id, processed) VALUES ($1, FALSE)',
      values: [id],
    };
    await this.runQuery(query);
    return id;
  }

  public async updateState(chartId: string, processed: boolean) {
    if (!chartId) {
      throw new Error('chartId should be provided');
    }

    const query = {
      text: 'UPDATE charts SET processed=$2 WHERE chart_id=$1',
      values: [chartId, processed ? 'TRUE' : 'FALSE'],
    };

    await this.runQuery(query);
    return Promise.resolve();
  }

}
