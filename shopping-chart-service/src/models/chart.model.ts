import { Product } from './product.model';

export class Chart {

  public readonly id: string;
  public readonly processed: boolean;
  public readonly positions: { product: Product, quantity: number }[];

  constructor(params?: Partial<Chart>) {
    params && Object.assign(this, params);
  }

}
