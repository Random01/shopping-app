import { SqsSenderService } from '../common';

/**
* Sends a message to the "EXTERNAL-IN" topic.
*/
export class ExternalCheckoutSqsSenderService extends SqsSenderService {

  constructor() {
    super('https://sqs.us-east-2.amazonaws.com/252842722782/external-checkout-in-queue');
  }

}
