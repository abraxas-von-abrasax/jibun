import { json } from 'body-parser';
import config from 'config';
import express from 'express';
import { router as healthcheckRouter } from './healthcheck';
import { router as usersRouter } from './users';

const app = express();
const port = config.get('server.port');

app.use(json());
app.use(healthcheckRouter, usersRouter);

app.listen(port, () => {
    console.log(`Jibun Server listening on port ${port}.`);
});
