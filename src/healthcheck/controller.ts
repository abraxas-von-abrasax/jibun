import { Request, Response } from 'express';

export const healthCheck = (_request: Request, response: Response) => {
    return response.send({ ok: true });
};
