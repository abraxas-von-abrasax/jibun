import { Request, Response } from 'express';
import { AuthService } from '../services';

export const register = async (request: Request, response: Response): Promise<Response> => {
    const { email, pwd } = request.body;

    if (!email) {
        return response.status(400).send({ ok: false, error: 'No email provided.', res: null });
    }

    if (!pwd) {
        return response.status(400).send({ ok: false, error: 'No password provided.', res: null });
    }

    try {
        const result = await AuthService.register(email, pwd);
        return response.send({ ok: true, error: null, result });
    } catch (error) {
        return response.status(400).send({ ok: false, error, result: null });
    }
}

export const signIn = async (request: Request, response: Response): Promise<Response> => {
    const { jwt } = request.body;

    if (!jwt) {
        return response.status(400).send({ ok: false, error: 'No JWT provided.', result: null });
    }

    try {
        const result = AuthService.signIn(jwt);
        return response.send({ ok: true, error: null, result });
    } catch (error) {
        return response.status(400).send({ ok: false, error, result: null });
    }
};
