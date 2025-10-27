import express, { Application, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import { errorHandler } from './middleware/errorHandler';
import { convertRouter } from './routes/convert';
import { fixRouter } from './routes/fix';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    this.app.use('/api/convert', convertRouter);
    this.app.use('/api/fix', fixRouter);
    
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({ status: 'ok' });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }
}

export default new App().app;
