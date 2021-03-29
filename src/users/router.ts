import { Router } from 'express';
import * as authController from './controllers/auth.controller';

export const router = Router();

router.post('/jibun/api/auth', authController.register);
