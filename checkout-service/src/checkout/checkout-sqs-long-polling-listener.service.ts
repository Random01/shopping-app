import { SQS } from 'aws-sdk';

export type OrderDetails = {
  chart: any;
};

/**
 * Listens for messages in "IN" queue from the Shopping Chart Service
 * https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/working-with-messages.html#setting-up-long-polling
 */
export class CheckoutSqsLongPollingListenerService {

  /**
   * Listens to "IN" queue for messages.
   */
  public receiveMessage(callback: (orderDetails: OrderDetails) => Promise<void>) {
    const queueURL = 'https://sqs.us-east-2.amazonaws.com/252842722782/checkout-in-queue';
    const params: SQS.Types.ReceiveMessageRequest = {
      AttributeNames: ['SentTimestamp'],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: ['All'],
      QueueUrl: queueURL,
      WaitTimeSeconds: 20,
    };

    const sqs = new SQS({ apiVersion: '2012-11-05' });
    sqs.receiveMessage(params, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else if (data.Messages) {
        const { ReceiptHandle, Body } = data.Messages[0];

        callback(this.parseOrderDetails(Body)).then(() => {
          const deleteParams = {
            QueueUrl: queueURL,
            ReceiptHandle,
          };

          sqs.deleteMessage(deleteParams, (err, data) => {
            if (err) {
              console.log('Delete Message Error', err);
            } else {
              console.log('Message Deleted', data);
            }
          });
        }, err => console.log('Order Processing Error', err));
      }
    });
  }

  private parseOrderDetails(body: string): OrderDetails {
    return JSON.parse(body);
  }

}
