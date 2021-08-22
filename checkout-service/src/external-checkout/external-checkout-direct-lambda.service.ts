import AWS from 'aws-sdk';

/**
 * A lambda function that is triggered by checkout service and imitates 3rd party checkout request.
 * 
 * Lambda is triggered from the Checkout Service.
 */
export class ExternalCheckoutDirectLambdaService {

  public async runExternalCheckout(chartId: string): Promise<any> {
    const params = {
      FunctionName: '3rd-party-checkout-procedure',
      Payload: JSON.stringify({ payload: chartId }),
    };

    try {
      return await (new AWS.Lambda().invoke(params).promise());
    } catch (err) {
      return Promise.reject(err);
    }
  }

}
