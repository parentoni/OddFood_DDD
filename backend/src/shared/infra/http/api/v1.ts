import express from "express";
import { paymentsRouter } from "../../../../modules/payments/infra/routes/Payments";
import { authRouter } from "../../../../modules/user/domain/routes/auth";


const v1Router = express.Router();

v1Router.use('/payments', paymentsRouter)
v1Router.use('/auth', authRouter)


export { v1Router };
