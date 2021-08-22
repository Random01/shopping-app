export class Product {

  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly price: number;

  constructor(params?: Partial<Product>) {
    params && Object.assign(this, params);
  }

}
