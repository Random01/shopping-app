import { ChartsService } from '../charts/charts.service';
import { CheckoutSqsSenderService } from './checkout-sqs-sender.service';

/**
 * This services sends a message to SQS queue.
 */
export class CheckoutService {

  constructor(
    private readonly checkoutSqsSender = new CheckoutSqsSenderService(),
    private readonly chartsService = new ChartsService(),
  ) { }

  public async checkout(chartId: string): Promise<void> {
    const chart = await this.chartsService.getChartById(chartId);

    await this.checkoutSqsSender.sendMessage('Run Checkout for chart ' + chart.id, {});
  }

}
