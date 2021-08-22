import AWS from 'aws-sdk';

/**
 * Listens for messages from Shopping Chart Service
 */
export class CheckoutSqsListenerService {

  /**
   * Listens to "IN" messages.
   */
  public receiveMessage() {
    const queueURL = 'https://sqs.us-east-2.amazonaws.com/252842722782/checkout-in-queue';

    const params = {
      AttributeNames: ['SentTimestamp'],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: ['All'],
      QueueUrl: queueURL,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 0
    };

    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    sqs.receiveMessage(params, (err, data) => {
      if (err) {
        console.log('Receive Error', err);
      } else if (data.Messages) {
        const deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: data.Messages[0].ReceiptHandle,
        };

        sqs.deleteMessage(deleteParams, (err, data) => {
          if (err) {
            console.log('Delete Error', err);
          } else {
            console.log('Message Deleted', data);
          }
        });
      }
    });
  }

}
