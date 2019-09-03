import express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { injectable } from 'inversify';

@injectable()
export class HalMiddleware extends BaseMiddleware {
  handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    res.setHeader('Content-Type', 'application/hal+json');
    next();
  }

}
