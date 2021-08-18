import { DbAccessService } from '../db';

import { Chart } from './chart.model';
import { Product } from './product.model';

/**
 * A shopping cart service is created that uses RDS DB (PostgreSQL):
 * - Should service getCartByID (containing all products in a cart). 
 * - If no cart – create a new one and store in DB. 
 * - Delete cart by ID. 
 * - Put a product to a cart.
 */
export class ShoppingChartService extends DbAccessService {

  public async getChartById(id: string): Promise<Chart> {
    return await this.runQuery('SELECT NOW()') as any;
  }

  public deleteChartById(id: string): Promise<void> {
    return Promise.resolve();
  }

  public putProduct(id: string, product: Product): Promise<void> {
    return Promise.resolve();
  }

}
