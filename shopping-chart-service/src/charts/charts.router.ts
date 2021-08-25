import express from 'express';
import * as core from 'express-serve-static-core';

import { ChartsService } from './charts.service';

export class ChartsRouter {

  constructor(
    app: core.Express,
    private readonly chartsService = new ChartsService(),
  ) {
    const router = express.Router();

    router.get('/', this.getCharts.bind(this));
    router.post('/', this.addChart.bind(this));

    router.get('/:id', this.getChart.bind(this));
    router.get('/:id/positions', this.getChartPostions.bind(this));
    router.post('/:id/positions', this.addPositionIntoChart.bind(this));

    router.delete('/:id', this.deleteChart.bind(this));
    router.post('/:id/state', this.updateState.bind(this));

    app.use('/api/charts', router);
  }

  private addChart(_: core.Request, res: core.Response) {
    this.chartsService.addChart().then(
      result => res.status(200).send(result),
      error => this.handleError(res, error),
    );
  }

  private getCharts(_: core.Request, res: core.Response) {
    this.chartsService.getAllCharts().then(
      result => res.status(200).send(result),
      error => this.handleError(res, error),
    );
  }

  private getChart(req: core.Request, res: core.Response) {
    this.chartsService.getChartById(req.params.id).then(
      product => res.send(product),
      error => this.handleError(res, error),
    );
  }

  private getChartPostions(req: core.Request, res: core.Response) {
    this.chartsService.getChartPositions(req.params.id).then(
      positions => res.send(positions),
      error => this.handleError(res, error),
    );
  }

  private deleteChart(req: core.Request, res: core.Response) {
    this.chartsService.deleteChartById(req.params.id).then(
      () => res.status(200).send(`Chart with Id ${req.params.id} has been deleted`),
      error => this.handleError(res, error),
    );
  }

  private updateState(req: core.Request, res: core.Response) {
    this.chartsService.updateState(req.params.id, true).then(
      () => res.status(200).send(`Chart with Id ${req.params.id} has been udated`),
      error => this.handleError(res, error),
    );
  }

  private addPositionIntoChart(req: core.Request, res: core.Response) {
    this.chartsService.putProduct(req.params.id, req.body.productId, req.body.quantity).then(
      () => res.status(200).send(`Product with Id ${req.body.productId} has been added to Chart ${req.params.id}`),
      error => this.handleError(res, error),
    );
  }

  private handleError(res: core.Response, error: Error) {
    res.status(500).send(error.message || 'Service unavailable');
  }

}
