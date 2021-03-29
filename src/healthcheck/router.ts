import { Router } from 'express';
import * as healthCheckController from './controller';

export const router = Router();

router.get('/jibun/api/healthcheck', healthCheckController.healthCheck);
