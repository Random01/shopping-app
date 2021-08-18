import { CheckoutSqsListenerService } from './checkout-sqs-listener.service';

/**
 * - Order service should be created
 * - The checkout API should be triggered from Shopping cart service via message in AWS SQS
 * - Result of check out should be put in “out” topic and processed by Shopping Cart service
 */
export class CheckoutService {

  constructor(
    private readonly checkoutSqsListener = new CheckoutSqsListenerService(),
  ) { }

  /**
   * The checkout API should be triggered from the Shopping cart service via message in AWS SQS.
   */
  public start() {
    setInterval(() => {
      this.checkoutSqsListener.receiveMessage();
    }, 5000);
  }

}