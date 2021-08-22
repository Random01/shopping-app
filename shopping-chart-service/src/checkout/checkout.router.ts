import express from 'express';
import * as core from 'express-serve-static-core';

import { CheckoutService } from './checkout.service';

export class CheckoutRouter {

  constructor(
    app: core.Express,
    private readonly checkoutService = new CheckoutService(),
  ) {
    const router = express.Router();

    router.post('/:id', this.checkout.bind(this));

    app.use('/api/checkout', router);
  }

  private checkout(req: core.Request, res: core.Response) {
    this.checkoutService.checkout(req.params.id).then(
      () => res.send('In progress...'),
      error => this.handleError(res, error),
    );
  }

  private handleError(res: core.Response, error: Error) {
    res.status(500).send(error.message || 'Service unavailable');
  }

}