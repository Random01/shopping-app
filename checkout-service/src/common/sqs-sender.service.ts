import { SQS } from 'aws-sdk';

/**
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
 */
export class SqsSenderService<T = any> {

  constructor(protected queueUrl: string) { }

  public async sendMessage(payload: T) {
    const params: SQS.Types.SendMessageRequest = {
      DelaySeconds: 10,
      MessageBody: JSON.stringify(payload),
      QueueUrl: this.queueUrl,
    };

    try {
      const sqs = new SQS({ apiVersion: '2012-11-05' });
      return await sqs.sendMessage(params).promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

}