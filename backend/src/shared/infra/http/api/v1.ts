import express from "express";
import { paymentsRouter } from "../../../../modules/payments/infra/routes/Payments";


const v1Router = express.Router();

v1Router.use('/payments', paymentsRouter)


export { v1Router };
