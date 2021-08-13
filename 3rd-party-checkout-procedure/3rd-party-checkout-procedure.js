// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-subscribing-unubscribing-topics.html
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-2',
});

const params = {
  Message: 'Successful Checkout!',
  /* required */
  TopicArn: 'arn:aws:sns:us-east-2:252842722782:3rd-party-heckout-service-topic',
};

const publishTextPromise = new AWS.SNS({
  apiVersion: '2010-03-31',
}).publish(params).promise();

publishTextPromise
  .then(data => {
    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    console.log('MessageID is ' + data.MessageId);
  })
  .catch(err => {
    console.error(err, err.stack);
  });