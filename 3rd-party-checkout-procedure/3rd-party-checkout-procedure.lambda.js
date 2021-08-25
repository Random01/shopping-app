// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-subscribing-unubscribing-topics.html
const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const params = {
    Subject: 'Successful Checkout!',
    Message: JSON.stringify(event, null, 2),
    TopicArn: 'arn:aws:sns:us-east-2:252842722782:3rd-party-checkout-procedure-topic',
  };

  try {
    const { MessageId } = await new AWS.SNS({ apiVersion: '2010-03-31' })
      .publish(params)
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'MessageID is ' + MessageId }),
    };
  }
  catch (err){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};