import AWS from 'aws-sdk';

/**
 * This service sends a message to "IN" SQS queue.
 * 
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
 */
export class CheckoutSqsSenderService {

  public async sendMessage(message: string) {
    const params: AWS.SQS.Types.SendMessageRequest = {
      DelaySeconds: 10,
      MessageBody: message,
      QueueUrl: 'https://sqs.us-east-2.amazonaws.com/252842722782/checkout-in-queue',
    };

    try {
      const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
      return await sqs.sendMessage(params).promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

}