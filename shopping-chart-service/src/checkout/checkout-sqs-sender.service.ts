import AWS from 'aws-sdk';

/**
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
 */
export class CheckoutSqsSenderService {

  public async sendMessage(message: string, payload: any) {
    const params = {
      DelaySeconds: 10,
      MessageAttributes: payload,
      MessageBody: message,
      QueueUrl: 'https://sqs.us-east-2.amazonaws.com/252842722782/checkout-in-queue',
    };

    try {
      return await (new AWS.SQS({ apiVersion: '2012-11-05' }).sendMessage(params).promise());
    } catch (err) {
      return Promise.reject(err);
    }
  }

}