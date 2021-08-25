import { SQS } from 'aws-sdk';

export class ExternalCheckoutSqsSenderService {

  /**
   * Sends a message to the "EXTERNAL-OUT" topic.
   */
  public async runExternalCheckout(oderDetails: any) {
    const params: SQS.Types.SendMessageRequest = {
      DelaySeconds: 10,
      MessageBody: JSON.stringify(oderDetails),
      QueueUrl: 'https://sqs.us-east-2.amazonaws.com/252842722782/external-checkout-in-queue',
    };

    try {
      const sqs = new SQS({ apiVersion: '2012-11-05' });
      return await sqs.sendMessage(params).promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

}
