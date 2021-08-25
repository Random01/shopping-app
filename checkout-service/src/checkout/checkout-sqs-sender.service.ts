import { SqsSenderService } from '../common';

export type OrderProcessDetails = {
  chartId: string;
  success: boolean;
};

/**
* Sends messages to the "OUT" topic.
*/
export class CheckoutSqsSenderService extends SqsSenderService<OrderProcessDetails> {

  constructor() {
    super('https://sqs.us-east-2.amazonaws.com/252842722782/checkout-out-queue');
  }

}
