import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (request: Request, response: Response): Promise<Response> => {
    const { email, pwd } = request.body;

    if (!email) {
        return response.status(400).send({ ok: false, error: 'No email provided.', res: null });
    }

    if (!pwd) {
        return response.status(400).send({ ok: false, error: 'No password provided.', res: null });
    }

    try {
        const res = await AuthService.register(email, pwd);
        return response.send({ ok: true, error: null, result: res });
    } catch (error) {
        console.log('CAUGHT ERROR:', error);
        return response.status(400).send({ ok: false, error, result: null });
    }
}
