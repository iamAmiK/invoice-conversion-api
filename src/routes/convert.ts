import { Router } from 'express';
import { convertController } from '../controllers/convertController';
import { validateConvertRequest } from '../middleware/validateRequest';

export const convertRouter = Router();

convertRouter.post('/', validateConvertRequest, convertController.convert);
