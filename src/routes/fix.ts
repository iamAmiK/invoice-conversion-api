import { Router } from 'express';
import { fixController } from '../controllers/fixController';

export const fixRouter = Router();

fixRouter.post('/analyse', fixController.analyse);
fixRouter.post('/apply', fixController.apply);

