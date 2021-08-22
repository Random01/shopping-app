import { CheckoutSqsLongPollingListenerService } from './checkout-sqs-long-polling-listener.service';
import { ExternalCheckoutSqsSenderService } from './external-checkout';

/**
 * - Order service should be created
 * - The checkout API should be triggered from Shopping cart service via message in AWS SQS
 * - Result of check out should be put in “out” topic and processed by Shopping Cart service
 */
export class CheckoutService {

  private timeout: NodeJS.Timeout;
  private readonly waitTimeSeconds = 20000;

  constructor(
    private readonly checkoutSqsListener = new CheckoutSqsLongPollingListenerService(),
    private readonly externalCheckoutService = new ExternalCheckoutSqsSenderService(),
  ) { }

  /**
   * The checkout API should be triggered from the Shopping cart service via message in AWS SQS.
   */
  public start() {
    this.timeout = setInterval(() => {
      this.checkoutSqsListener.receiveMessage(this.processOrder.bind(this));
    }, this.waitTimeSeconds);
  }

  public stop() {
    this.timeout != null && clearInterval(this.timeout);
  }

  private async processOrder(chartId: string): Promise<void> {
    await this.externalCheckoutService.runExternalCheckout(chartId);
  }

}