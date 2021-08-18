export class Product {

  public readonly id: string;
  public readonly name: string;
  public readonly amount: number;

  constructor(params?: Partial<Product>) {
    params && Object.assign(this, params);
  }

}
