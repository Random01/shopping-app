import { CheckoutSqsSenderService } from './checkout-sqs-sender.service';

export class CheckoutService {

  constructor(
    private readonly checkoutSqsSender = new CheckoutSqsSenderService(),
  ) { }

  public async runCheckout(): Promise<void> {
    await this.checkoutSqsSender.sendMessage('Test Message', {});
  }

}
