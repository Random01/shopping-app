import { ChartsService } from '../charts/charts.service';
import { CheckoutSqsLongPollingListenerService, OrderProcessDetails } from './checkout-sqs-long-poling-listener.service';
import { CheckoutSqsSenderService } from './checkout-sqs-sender.service';

/**
 * This service calls Order (Checkout) Service through AWS SQS.
 */
export class CheckoutService {

  private timeout: NodeJS.Timeout;
  private readonly waitTimeSeconds = 20000;

  constructor(
    private readonly checkoutSqsSender = new CheckoutSqsSenderService(),
    private readonly checkoutSqsListener = new CheckoutSqsLongPollingListenerService(),
    private readonly chartsService = new ChartsService(),
  ) { }

  public async checkout(chartId: string): Promise<void> {
    const chart = await this.chartsService.getChartById(chartId);
    await this.checkoutSqsSender.checkoutChart(chart);
  }

  public start() {
    this.timeout = setInterval(() => {
      this.checkoutSqsListener.receiveMessage(this.processResponse.bind(this));
    }, this.waitTimeSeconds);
  }

  public stop() {
    this.timeout != null && clearInterval(this.timeout);
  }

  private processResponse({ chartId, success }: OrderProcessDetails) {
    return this.chartsService.updateState(chartId, success);
  }

}
