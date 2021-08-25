import { SQS } from 'aws-sdk';

import { Chart } from '../models';

/**
 * This service sends a message to "IN" SQS queue.
 * 
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
 */
export class CheckoutSqsSenderService {

  public async checkoutChart(chart: Chart) {
    const params: SQS.Types.SendMessageRequest = {
      DelaySeconds: 10,
      MessageBody: JSON.stringify({ chart }),
      QueueUrl: 'https://sqs.us-east-2.amazonaws.com/252842722782/checkout-in-queue',
    };

    try {
      const sqs = new SQS({ apiVersion: '2012-11-05' });
      return await sqs.sendMessage(params).promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

}