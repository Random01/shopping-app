import { SecretsManager } from 'aws-sdk';

import { ClientConfig } from 'pg';

export class SecretManagerService {

  public getConfig(): Promise<ClientConfig> {
    const secretName = 'shopping-chart-service/postgres';
    const client = new SecretsManager();

    return new Promise((success, fail) => {
      client.getSecretValue({ SecretId: secretName }, (err, data) => {
        if (err) {
          if (err.code === 'DecryptionFailureException')
            // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            // Deal with the exception here, and/or rethrow at your discretion.
            fail(err);
          else if (err.code === 'InternalServiceErrorException')
            // An error occurred on the server side.
            // Deal with the exception here, and/or rethrow at your discretion.
            fail(err);
          else if (err.code === 'InvalidParameterException')
            // You provided an invalid value for a parameter.
            // Deal with the exception here, and/or rethrow at your discretion.
            fail(err);
          else if (err.code === 'InvalidRequestException')
            // You provided a parameter value that is not valid for the current state of the resource.
            // Deal with the exception here, and/or rethrow at your discretion.
            fail(err);
          else if (err.code === 'ResourceNotFoundException')
            // We can't find the resource that you asked for.
            // Deal with the exception here, and/or rethrow at your discretion.
            fail(err);
        }
        else {
          // Decrypts secret using the associated KMS CMK.
          // Depending on whether the secret is a string or binary, one of these fields will be populated.
          if ('SecretString' in data) {
            success(this.parse(data.SecretString));
          } else {
            const buff = Buffer.from(data.SecretBinary as any, 'base64');
            success(this.parse(buff.toString('ascii')));
          }
        }
      });
    });
  }

  private parse(secretKey: string): ClientConfig {
    const { username: user, password, host, port } = JSON.parse(secretKey);
    return {
      user,
      password,
      host,
      port,
    };
  }

}
