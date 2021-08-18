import { Product } from './product.model';

export class Chart {

  public readonly id: string;
  public readonly products: Product[];

  constructor(params?: Partial<Chart>) {
    params && Object.assign(this, params);
  }

}
