import { Router } from 'express';
import { authController } from './controllers';

export const router = Router();

router.post('/jibun/api/auth', authController.register);
router.post('/jibun/api/sign-in', authController.signIn);
