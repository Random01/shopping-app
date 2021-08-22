import AWS from 'aws-sdk';

export class ExternalCheckoutSqsSenderService {

  /**
   * Sends a message to the "EXTERNAL-OUT" topic.
   */
  public async runExternalCheckout(chartId: string) {
    const params = {
      DelaySeconds: 10,
      MessageAttributes: {},
      MessageBody: chartId,
      QueueUrl: 'https://sqs.us-east-2.amazonaws.com/252842722782/external-checkout-in-queue',
    };

    try {
      return await (new AWS.SQS({ apiVersion: '2012-11-05' }).sendMessage(params).promise());
    } catch (err) {
      return Promise.reject(err);
    }
  }

}
